import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "login.errors.emailRequired")
    .email("login.errors.emailInvalid"),
  password: z
    .string()
    .min(1, "login.errors.passwordRequired")
    .min(8, "login.errors.passwordMinLength")
    .regex(/[A-Z]/, "login.errors.passwordUppercase")
    .regex(/[a-z]/, "login.errors.passwordLowercase")
    .regex(/[0-9]/, "login.errors.passwordNumber")
    .regex(/[^A-Za-z0-9]/, "login.errors.passwordSpecial"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
