import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email")
})

export const signupSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email")
})

export type LoginValues = z.infer<typeof loginSchema>
export type SignupValues = z.infer<typeof signupSchema>
