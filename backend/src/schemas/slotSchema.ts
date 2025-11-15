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

export const updateSlotStatusSchema = z.object({
  status: z.enum(["AVAILABLE", "BOOKED"]),
});

export type CreateSlotInput = z.infer<typeof createSlotSchema>;
export type UpdateSlotStatusInput = z.infer<typeof updateSlotStatusSchema>;
