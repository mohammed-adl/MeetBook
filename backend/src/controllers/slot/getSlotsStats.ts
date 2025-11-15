import asyncHandler from "express-async-handler";
import {
  success,
  fail,
  prisma,
  userSelect as providerSelect,
} from "../../lib/index.js";

export const getProviderSlotsStats = asyncHandler(
  async (req: any, res: any) => {
    const providerId = req.user.id;

    const provider = await prisma.user.findUnique({
      where: {
        id: providerId,
        role: "PROVIDER",
      },
      select: providerSelect,
    });

    if (!provider) return fail("Provider not found", 404);

    const [totalSlots, availableSlots, bookedSlots] = await Promise.all([
      prisma.slot.count({
        where: {
          userId: providerId,
        },
      }),
      prisma.slot.count({
        where: {
          userId: providerId,
          status: "AVAILABLE",
        },
      }),
      prisma.slot.count({
        where: {
          userId: providerId,
          status: "BOOKED",
        },
      }),
    ]);

    success(res, {
      provider,
      slots: {
        totalSlots,
        availableSlots,
        bookedSlots,
      },
    });
  }
);
