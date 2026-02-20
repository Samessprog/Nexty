import { z } from "zod";

export const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "newPassword.errors.required")
      .min(8, "newPassword.errors.minLength")
      .regex(/[A-Z]/, "newPassword.errors.uppercase")
      .regex(/[a-z]/, "newPassword.errors.lowercase")
      .regex(/[0-9]/, "newPassword.errors.number")
      .regex(/[^A-Za-z0-9]/, "newPassword.errors.special"),
    confirmPassword: z.string().min(1, "newPassword.errors.confirmRequired"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "newPassword.errors.mismatch",
    path: ["confirmPassword"],
  });

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;
