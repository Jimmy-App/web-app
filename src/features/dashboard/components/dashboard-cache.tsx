import { cacheLife, cacheTag } from "next/cache";

import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { cacheProfiles, dashboardTag } from "@/lib/cache";
import { prisma } from "@/lib/db";

export type DashboardData = {
  user: {
    id: string;
    email: string;
    name: string | null;
    activeOrgId: string | null;
  };
  organizations: Array<{
    id: string;
    name: string;
    role: string;
  }>;
  activeOrganization: {
    id: string;
    name: string;
  } | null;
};

export async function DashboardCache({ userId }: { userId: string }) {
  "use cache";
  cacheTag(dashboardTag(userId));
  cacheLife(cacheProfiles.dashboard);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, activeOrgId: true },
  });

  if (!user) {
    return <DashboardView data={null} />;
  }

  const memberships = await prisma.membership.findMany({
    where: { userId },
    include: { organization: true },
    orderBy: { createdAt: "asc" },
  });

  const organizations = memberships.map((membership) => ({
    id: membership.organization.id,
    name: membership.organization.name,
    role: membership.role,
  }));

  const activeOrganization =
    organizations.find((org) => org.id === user.activeOrgId) ?? organizations[0] ?? null;

  return (
    <DashboardView
      data={{
        user,
        organizations,
        activeOrganization,
      }}
    />
  );
}
