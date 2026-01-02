import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().min(1).max(80),
});

export const orgSwitchSchema = z.object({
  orgId: z.string().uuid(),
});
