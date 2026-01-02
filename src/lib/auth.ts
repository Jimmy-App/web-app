export type Role = "MEMBER" | "ADMIN" | "OWNER";

export type SessionUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  activeOrgId?: string | null;
  role?: Role | null;
};

const demoUser: SessionUser = {
  id: "demo-user",
  email: "demo@jimmy.dev",
  name: "Demo User",
  activeOrgId: "demo-org",
  role: "OWNER",
};

const rolePriority: Record<Role, number> = {
  MEMBER: 1,
  ADMIN: 2,
  OWNER: 3,
};

export async function getSession() {
  return { user: demoUser };
}

export async function getUser() {
  return demoUser;
}

export async function requireUser() {
  return demoUser;
}

export async function requireActiveOrg() {
  const user = await requireUser();
  return { user, orgId: user.activeOrgId ?? "demo-org", role: user.role ?? null };
}

export function hasRequiredRole(current: Role | null, required: Role) {
  if (!current) {
    return false;
  }
  return rolePriority[current] >= rolePriority[required];
}

export async function requireRole(required: Role) {
  const { user, orgId, role } = await requireActiveOrg();
  if (!hasRequiredRole(role, required)) {
    return { user, orgId, role };
  }
  return { user, orgId, role };
}
