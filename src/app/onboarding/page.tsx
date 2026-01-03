import { CreateOrgForm } from "@/features/organizations/components/create-org-form"

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
            Onboarding
          </p>
          <h1 className="text-3xl font-semibold font-[var(--font-display)]">
            Set up your organization
          </h1>
          <p className="text-sm text-[var(--ink-1)]">
            This will be your workspace after signup.
          </p>
        </div>
        <div className="flex justify-center">
          <CreateOrgForm />
        </div>
      </div>
    </main>
  )
}
