import type { Client, Coach, Organization } from "@prisma/client"

const AUTH_KEY = "jimmy-coach-auth"
const AUTH_COOKIE = "jimmy_coach_auth"
const ORG_COOKIE = "jimmy_coach_orgs"

const sleep = (min = 300, max = 500) =>
  new Promise<void>((resolve) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    setTimeout(() => resolve(), delay)
  })

const createId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }
  return `id_${Math.random().toString(16).slice(2)}`
}

const coaches: Coach[] = [
  {
    id: "coach_1",
    email: "coach@jimmy.com",
    name: "Jimmy Coach",
    createdAt: new Date("2024-01-05T10:00:00.000Z")
  }
]

const organizations: Organization[] = [
  {
    id: "org_1",
    name: "Jimmy Performance",
    slug: "jimmy-performance",
    coachId: "coach_1",
    createdAt: new Date("2024-01-10T10:00:00.000Z")
  }
]

const clients: Client[] = [
  {
    id: "client_1",
    orgId: "org_1",
    name: "Alina Petrova",
    email: "alina@example.com",
    phone: "+380501112233",
    createdAt: new Date("2024-01-12T10:00:00.000Z")
  }
]

const withDelay = async <T>(fn: () => T) => {
  await sleep()
  return fn()
}

export type CreateCoachInput = Pick<Coach, "email" | "name">
export type CreateOrganizationInput = Pick<Organization, "name" | "slug" | "coachId">
export type UpdateOrganizationInput = Partial<Pick<Organization, "name" | "slug">>
export type CreateClientInput = Pick<Client, "orgId" | "name" | "email" | "phone">
export type UpdateClientInput = Partial<Pick<Client, "name" | "email" | "phone">>

export const mockDb = {
  coach: {
    findByEmail: async (email: string) =>
      withDelay(() => coaches.find((coach) => coach.email === email) ?? null),
    create: async (data: CreateCoachInput) =>
      withDelay(() => {
        const existing = coaches.find((coach) => coach.email === data.email)
        if (existing) {
          throw new Error("Coach with this email already exists")
        }
        const coach: Coach = {
          id: createId(),
          email: data.email,
          name: data.name,
          createdAt: new Date()
        }
        coaches.push(coach)
        return coach
      })
  },
  organization: {
    findMany: async (coachId: string) =>
      withDelay(() => organizations.filter((org) => org.coachId === coachId)),
    findBySlug: async (slug: string) =>
      withDelay(() => organizations.find((org) => org.slug === slug) ?? null),
    create: async (data: CreateOrganizationInput) =>
      withDelay(() => {
        const existing = organizations.find((org) => org.slug === data.slug)
        if (existing) {
          throw new Error("Organization slug is already taken")
        }
        const organization: Organization = {
          id: createId(),
          name: data.name,
          slug: data.slug,
          coachId: data.coachId,
          createdAt: new Date()
        }
        organizations.push(organization)
        return organization
      }),
    update: async (orgId: string, data: UpdateOrganizationInput) =>
      withDelay(() => {
        const org = organizations.find((item) => item.id === orgId)
        if (!org) {
          throw new Error("Organization not found")
        }
        if (data.slug && data.slug !== org.slug) {
          const existing = organizations.find((item) => item.slug === data.slug)
          if (existing) {
            throw new Error("Organization slug is already taken")
          }
        }
        Object.assign(org, data)
        return org
      }),
    delete: async (orgId: string) =>
      withDelay(() => {
        const index = organizations.findIndex((item) => item.id === orgId)
        if (index === -1) {
          throw new Error("Organization not found")
        }
        const [removed] = organizations.splice(index, 1)
        for (let i = clients.length - 1; i >= 0; i -= 1) {
          if (clients[i].orgId === orgId) {
            clients.splice(i, 1)
          }
        }
        return removed
      })
  },
  client: {
    findMany: async (orgId: string) =>
      withDelay(() => clients.filter((client) => client.orgId === orgId)),
    create: async (data: CreateClientInput) =>
      withDelay(() => {
        const client: Client = {
          id: createId(),
          orgId: data.orgId,
          name: data.name,
          email: data.email ?? null,
          phone: data.phone ?? null,
          createdAt: new Date()
        }
        clients.push(client)
        return client
      }),
    update: async (clientId: string, data: UpdateClientInput) =>
      withDelay(() => {
        const client = clients.find((item) => item.id === clientId)
        if (!client) {
          throw new Error("Client not found")
        }
        Object.assign(client, data)
        return client
      }),
    delete: async (clientId: string) =>
      withDelay(() => {
        const index = clients.findIndex((client) => client.id === clientId)
        if (index === -1) {
          throw new Error("Client not found")
        }
        const [removed] = clients.splice(index, 1)
        return removed
      })
  }
}

const readAuthStorage = () => {
  if (typeof window === "undefined") {
    return null
  }
  const raw = window.localStorage.getItem(AUTH_KEY)
  if (!raw) {
    return null
  }
  try {
    return JSON.parse(raw) as Coach
  } catch {
    return null
  }
}

const writeAuthCookie = (coach: Coach | null) => {
  if (typeof document === "undefined") {
    return
  }
  if (!coach) {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`
    return
  }
  const payload = encodeURIComponent(JSON.stringify({ id: coach.id }))
  document.cookie = `${AUTH_COOKIE}=${payload}; path=/; max-age=86400`
}

const writeOrgCookie = (count: number | null) => {
  if (typeof document === "undefined") {
    return
  }
  if (count === null) {
    document.cookie = `${ORG_COOKIE}=; path=/; max-age=0`
    return
  }
  document.cookie = `${ORG_COOKIE}=${count}; path=/; max-age=86400`
}

export const mockAuth = {
  getCurrentCoach: () => readAuthStorage(),
  setCoach: (coach: Coach) => {
    if (typeof window === "undefined") {
      return
    }
    window.localStorage.setItem(AUTH_KEY, JSON.stringify(coach))
    writeAuthCookie(coach)
  },
  clearAuth: () => {
    if (typeof window === "undefined") {
      return
    }
    window.localStorage.removeItem(AUTH_KEY)
    writeAuthCookie(null)
    writeOrgCookie(null)
  }
}
