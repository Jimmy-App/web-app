import { OrgList } from "@/features/organizations/components/org-list"

export default function SettingsPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
          Settings
        </p>
        <h1 className="text-3xl font-semibold font-[var(--font-display)]">
          Organization settings
        </h1>
        <p className="text-sm text-[var(--ink-1)]">
          Manage all organizations linked to your coach profile.
        </p>
      </header>

      <OrgList />
    </main>
  )
}
