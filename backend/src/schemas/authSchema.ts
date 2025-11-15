import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, "Name is required"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CLIENT", "PROVIDER"], {
    message: "Role must be either CLIENT or PROVIDER",
  }),
  hourlyRate: z.coerce
    .number()
    .int()
    .positive("Hourly rate must be a positive integer"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
