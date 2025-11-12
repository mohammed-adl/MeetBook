import asyncHandler from "express-async-handler";
import { success } from "@lib";
import { authService } from "@services";

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
