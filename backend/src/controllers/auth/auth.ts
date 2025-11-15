import asyncHandler from "express-async-handler";

import authService from "../../services/authService.js";
import { success, fail } from "../../lib/index.js";

export const login = asyncHandler(async (req: any, res: any) => {
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

export const signup = asyncHandler(async (req: any, res: any) => {
  const { ...formData } = req.body;

  const user = await authService.createUser(formData);

  const accessToken = authService.generateAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = authService.generateRefreshToken({
    id: user.id,
    role: user.role,
  });

  await authService.saveRefreshToken(user.id, refreshToken);

  success(
    res,
    {
      accessToken: accessToken,
      refreshToken,
      user,
    },
    201
  );
});
