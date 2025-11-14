import asyncHandler from "express-async-handler";

import {
  success,
  fail,
  userSelect as providerSelect,
  prisma,
} from "../../lib/index.js";

export const getProvider = asyncHandler(async (req: any, res: any) => {
  const providerUsername = req.params.username;
  const provider = await prisma.user.findUnique({
    where: {
      username: providerUsername,
      role: "PROVIDER",
    },
    select: providerSelect,
  });

  if (!provider) return fail("Provider not found", 404);

  success(res, {
    provider,
  });
});
