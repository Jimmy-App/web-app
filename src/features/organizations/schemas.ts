import { z } from "zod"

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Organization name is too short"),
  slug: z
    .string()
    .min(2, "Slug is too short")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes")
})

export const updateOrganizationSchema = z.object({
  name: z.string().min(2, "Organization name is too short").optional(),
  slug: z
    .string()
    .min(2, "Slug is too short")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and dashes")
    .optional()
})

export type CreateOrganizationValues = z.infer<typeof createOrganizationSchema>
export type UpdateOrganizationValues = z.infer<typeof updateOrganizationSchema>
