import type { Client } from "@prisma/client"

import { mockDb } from "@/lib/mock-db"
import type { InviteClientValues } from "@/features/clients/schemas"

export const clientsApi = {
  getAll: async (orgId: string): Promise<Client[]> => {
    // TODO: Replace with real API
    return await mockDb.client.findMany(orgId)
  },
  create: async (orgId: string, data: InviteClientValues): Promise<Client> => {
    // TODO: Replace with real API
    return await mockDb.client.create({
      orgId,
      name: data.name,
      email: data.email || null,
      phone: data.phone || null
    })
  },
  update: async (
    clientId: string,
    data: Partial<InviteClientValues>
  ): Promise<Client> => {
    // TODO: Replace with real API
    return await mockDb.client.update(clientId, data)
  },
  delete: async (clientId: string): Promise<Client> => {
    // TODO: Replace with real API
    return await mockDb.client.delete(clientId)
  }
}
