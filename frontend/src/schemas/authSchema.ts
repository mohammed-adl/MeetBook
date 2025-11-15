import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1, "Name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["CLIENT", "PROVIDER"]),
    hourlyRate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.role === "PROVIDER") {
        if (!data.hourlyRate) return false;
        const num = parseFloat(data.hourlyRate);
        return !isNaN(num) && num > 0;
      }
      return true;
    },
    {
      message:
        "Hourly rate is required for providers and must be a positive number",
      path: ["hourlyRate"],
    }
  );

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
