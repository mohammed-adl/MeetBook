import asyncHandler from "express-async-handler";
import { prisma, success, fail, userSelect } from "../../lib";

export const getProviderSlots = asyncHandler(async (req: any, res: any) => {
  const username = req.params.username;

  const provider = await prisma.user.findUnique({
    where: { username },
  });

  if (!provider) return fail("Provider not found", 404);
  if (provider.role !== "PROVIDER") return fail("User is not a provider", 400);

  const slots = await prisma.slot.findMany({
    where: { userId: provider.id },
    orderBy: { startTime: "asc" },
  });

  return success(res, { provider, slots });
});

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
