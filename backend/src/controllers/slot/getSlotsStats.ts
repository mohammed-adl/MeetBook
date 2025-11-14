import asyncHandler from "express-async-handler";

import { success, fail, prisma, userSelect as providerSelect } from "../../lib";

export const getSlotsStats = asyncHandler(async (req: any, res: any) => {
  const providerId = req.user.id;

  const provider = await prisma.user.findUnique({
    where: {
      id: providerId,
      role: "PROVIDER",
    },
    select: providerSelect,
  });

  if (!provider) return fail("Provider not found", 404);

  const totalSlots = await prisma.slot.count({
    where: {
      userId: providerId,
    },
  });

  const availableSlots = await prisma.slot.count({
    where: {
      userId: providerId,
      status: "AVAILABLE",
    },
  });

  const bookedSlots = await prisma.slot.count({
    where: {
      userId: providerId,
      status: "BOOKED",
    },
  });

  success(res, {
    provider,
    slots: {
      totalSlots,
      availableSlots,
      bookedSlots,
    },
  });
});
