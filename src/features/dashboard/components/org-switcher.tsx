import { Button } from "@/components/ui/button";
import { setActiveOrgAction } from "@/features/dashboard/actions";

export function OrgSwitcher({
  organizations,
  activeOrgId,
}: {
  organizations: Array<{ id: string; name: string; role: string }>;
  activeOrgId: string | null;
}) {
  if (organizations.length === 0) {
    return <p className="text-sm text-muted-foreground">No organizations found.</p>;
  }

  return (
    <form action={setActiveOrgAction} className="flex flex-wrap gap-2">
      <select
        name="orgId"
        defaultValue={activeOrgId ?? organizations[0]?.id}
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        {organizations.map((org) => (
          <option key={org.id} value={org.id}>
            {org.name} ({org.role})
          </option>
        ))}
      </select>
      <Button type="submit" variant="secondary">
        Switch
      </Button>
    </form>
  );
}
