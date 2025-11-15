import asyncHandler from "express-async-handler";

import { prisma, success, fail, userSelect } from "../../lib/index.js";

export const createBooking = asyncHandler(async (req: any, res: any) => {
  const clientId = req.user.id;
  const { slotId } = req.body;

  if (!slotId) {
    return fail("slotId is required", 400);
  }

  const client = await prisma.user.findUnique({
    where: { id: clientId },
  });

  if (!client || client.role !== "CLIENT") {
    return fail("Only clients can book slots", 403);
  }

  const booking = await prisma.$transaction(async (tx) => {
    const slot = await tx.slot.findUnique({
      where: { id: slotId },
      include: {
        user: { select: userSelect },
        booking: true,
      },
    });

    if (!slot) {
      throw new Error("Slot not found");
    }

    if (slot.status === "BOOKED" || slot.booking) {
      throw new Error("This slot is already booked");
    }

    if (slot.userId === clientId) {
      throw new Error("You cannot book your own slot");
    }

    const totalCost = (slot.user.hourlyRate! * slot.duration) / 60;

    const newBooking = await tx.booking.create({
      data: {
        slotId: slot.id,
        clientId: clientId,
        providerId: slot.userId,
        totalCost: totalCost,
      },
      include: {
        slot: {
          include: {
            user: { select: userSelect },
          },
        },
        client: { select: userSelect },
      },
    });

    await tx.slot.update({
      where: { id: slotId },
      data: { status: "BOOKED" },
    });

    return newBooking;
  });

  return success(res, { booking }, 201);
});
