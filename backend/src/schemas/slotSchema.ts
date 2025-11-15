import { z } from "zod";

export const createSlotSchema = z
  .object({
    startTime: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "Start time must be a valid ISO 8601 datetime"
      ),
    endTime: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "End time must be a valid ISO 8601 datetime"
      ),
  })
  .refine((data) => new Date(data.endTime) > new Date(data.startTime), {
    message: "End time must be after start time",
    path: ["endTime"],
  });

export const usernameParamSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

export type CreateSlotInput = z.infer<typeof createSlotSchema>;
export type UsernameParam = z.infer<typeof usernameParamSchema>;
