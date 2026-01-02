import { DashboardCache } from "@/features/dashboard/components/dashboard-cache";
import { requireUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await requireUser();

  return <DashboardCache userId={user.id} />;
}
