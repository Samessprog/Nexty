import { z } from "zod";

export const regulationsSchema = z.object({
  termsOfService: z.boolean().refine((val) => val === true, {
    message: "regulations.errors.termsRequired",
  }),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: "regulations.errors.privacyRequired",
  }),
});

export type RegulationsFormData = z.infer<typeof regulationsSchema>;
