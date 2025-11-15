import { ZodSchema } from "zod";

export function validate<T>(schema: ZodSchema<T>, data: any) {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      valid: true,
      errors: {} as Record<string, string>,
    };
  }

  const formatted: Record<string, string> = {};

  result.error.issues.forEach((issue) => {
    const field = issue.path[0];
    if (typeof field === "string") {
      formatted[field] = issue.message;
    }
  });

  return {
    valid: false,
    errors: formatted,
  };
}
