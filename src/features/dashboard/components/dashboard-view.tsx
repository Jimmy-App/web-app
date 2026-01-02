import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrgSwitcher } from "@/features/dashboard/components/org-switcher";
import type { DashboardData } from "@/features/dashboard/components/dashboard-cache";

export function DashboardView({ data }: { data: DashboardData | null }) {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No user data available.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <p className="text-muted-foreground">Signed in as</p>
            <p className="font-medium">{data.user.name ?? data.user.email}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Active organization</p>
            <p className="font-medium">
              {data.activeOrganization ? data.activeOrganization.name : "Not set"}
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Organization access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Manage which organization is active for this session.
          </p>
          <OrgSwitcher
            organizations={data.organizations}
            activeOrgId={data.activeOrganization?.id ?? null}
          />
        </CardContent>
      </Card>
    </div>
  );
}
