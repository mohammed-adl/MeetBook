import asyncHandler from "express-async-handler";
import { prisma, success, userSelect } from "../../lib";

export const getAllAvailableSlots = asyncHandler(async (req, res) => {
  const slots = await prisma.slot.findMany({
    where: {
      status: "AVAILABLE",
    },
    include: {
      user: {
        select: userSelect,
      },
    },
    orderBy: { startTime: "asc" },
  });

  return success(res, { slots });
});
