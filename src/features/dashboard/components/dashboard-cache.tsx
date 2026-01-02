import { cacheLife, cacheTag } from "next/cache";

import { DashboardView } from "@/features/dashboard/components/dashboard-view";
import { cacheProfiles, dashboardTag } from "@/lib/cache";

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

  const user = {
    id: userId,
    email: "demo@jimmy.dev",
    name: "Demo User",
    activeOrgId: "demo-org",
  };

  const organizations = [
    { id: "demo-org", name: "Jimmy Labs", role: "OWNER" },
    { id: "studio-org", name: "Studio Collective", role: "ADMIN" },
  ];

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
