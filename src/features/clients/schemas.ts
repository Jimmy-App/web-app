import { z } from "zod"

export const inviteClientSchema = z.object({
  name: z.string().min(2, "Client name is too short"),
  email: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional().or(z.literal(""))
})

export type InviteClientValues = z.infer<typeof inviteClientSchema>
