import type { Coach } from "@prisma/client"

import { mockDb } from "@/lib/mock-db"
import type { LoginValues, SignupValues } from "@/features/auth/schemas"

export const authApi = {
  login: async (data: LoginValues): Promise<Coach> => {
    // TODO: Replace with real API
    const coach = await mockDb.coach.findByEmail(data.email)
    if (!coach) {
      throw new Error("Coach not found")
    }
    return coach
  },
  signup: async (data: SignupValues): Promise<Coach> => {
    // TODO: Replace with real API
    return await mockDb.coach.create({
      email: data.email,
      name: data.name
    })
  }
}
