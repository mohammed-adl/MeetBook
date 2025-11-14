import asyncHandler from "express-async-handler";
import { prisma, success, fail } from "../../lib";

export const createSlot = asyncHandler(async (req: any, res: any) => {
  const providerId = req.user.id;
  const { startTime, endTime } = req.body;

  if (!startTime || !endTime) {
    return fail("startTime and endTime are required", 400);
  }

  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  if (start < now) return fail("Start time cannot be in the past", 400);
  if (end <= start) return fail("Invalid time range", 400);

  const provider = await prisma.user.findUnique({
    where: { id: providerId },
  });

  if (!provider || provider.role !== "PROVIDER") {
    return fail("Only providers can create slots", 403);
  }

  const overlap = await prisma.slot.findFirst({
    where: {
      userId: providerId,
      AND: [{ startTime: { lt: end } }, { endTime: { gt: start } }],
    },
  });

  if (overlap) return fail("This time is already taken by another slot", 400);

  const duration = Math.floor((end.getTime() - start.getTime()) / 60000);

  const slot = await prisma.slot.create({
    data: {
      userId: providerId,
      startTime: start,
      endTime: end,
      duration,
      status: "AVAILABLE",
    },
  });

  return success(res, { slot });
});
