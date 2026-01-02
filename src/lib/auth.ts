import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

const rolePriority: Record<Role, number> = {
  MEMBER: 1,
  ADMIN: 2,
  OWNER: 3,
};

export async function getSession() {
  return auth();
}

export async function getUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }
  return user;
}

export async function requireActiveOrg() {
  const user = await requireUser();
  if (!user.activeOrgId) {
    redirect("/app/dashboard");
  }
  return { user, orgId: user.activeOrgId, role: user.role ?? null };
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
    redirect("/app/dashboard");
  }
  return { user, orgId, role };
}
