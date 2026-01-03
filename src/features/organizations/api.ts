import type { Organization } from "@prisma/client"

import { mockAuth, mockDb } from "@/lib/mock-db"
import type {
  CreateOrganizationValues,
  UpdateOrganizationValues
} from "@/features/organizations/schemas"

export const organizationsApi = {
  getAll: async (): Promise<Organization[]> => {
    // TODO: Replace with real API
    const coach = mockAuth.getCurrentCoach()
    if (!coach) {
      throw new Error("Not authenticated")
    }
    const orgs = await mockDb.organization.findMany(coach.id)
    syncOrgCount(orgs.length)
    return orgs
  },
  create: async (data: CreateOrganizationValues): Promise<Organization> => {
    // TODO: Replace with real API
    const coach = mockAuth.getCurrentCoach()
    if (!coach) {
      throw new Error("Not authenticated")
    }
    const org = await mockDb.organization.create({
      name: data.name,
      slug: data.slug,
      coachId: coach.id
    })
    const orgs = await mockDb.organization.findMany(coach.id)
    syncOrgCount(orgs.length)
    return org
  },
  update: async (
    orgId: string,
    data: UpdateOrganizationValues
  ): Promise<Organization> => {
    // TODO: Replace with real API
    return await mockDb.organization.update(orgId, data)
  },
  delete: async (orgId: string): Promise<Organization> => {
    // TODO: Replace with real API
    const removed = await mockDb.organization.delete(orgId)
    const orgs = await mockDb.organization.findMany(removed.coachId)
    syncOrgCount(orgs.length)
    return removed
  }
}

const syncOrgCount = (count: number) => {
  if (typeof document === "undefined") {
    return
  }
  document.cookie = `jimmy_coach_orgs=${count}; path=/; max-age=86400`
}
