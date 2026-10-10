import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail helps")
    .max(4000, "That is a bit long — try trimming it down"),
  // Honeypot: real users never fill this in. Deliberately permissive — the
  // route inspects it and accepts silently, so a bot learns nothing from the
  // response. Rejecting it here would surface a 400 that distinguishes it.
  website: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
