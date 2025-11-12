import asyncHandler from "express-async-handler";

import { authService } from "../../services/index.js";
import { success, fail } from "../../lib/index.js";

export const logIn = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const user = await authService.logIn(email, password);
  if (!user) return fail("Invalid credentials", 401);

  const accessToken = authService.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = authService.generateRefreshToken({
    id: user.id,
    role: user.role,
  });

  await authService.saveRefreshToken(user.id, refreshToken);

  success(res, {
    accessToken: accessToken,
    refreshToken,
    user,
  });
});
