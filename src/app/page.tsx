import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#f2c28e]/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[320px] w-[320px] translate-x-1/3 rounded-full bg-[#f6e4cc] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-16">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
              Jimmy Coach
            </p>
            <h1 className="text-4xl font-semibold font-[var(--font-display)] sm:text-5xl">
              Coach with calm, confident structure.
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Create account</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <p className="text-lg text-[var(--ink-1)]">
              Jimmy Coach keeps your sessions crisp with a clear client roster,
              fast invitations, and a workspace designed for focus.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link href="/signup">Start coaching</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>
          </div>

          <Card className="space-y-6 bg-white/80">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
                Today&#39;s flow
              </p>
              <h2 className="text-2xl font-semibold font-[var(--font-display)]">
                Dashboard, clients, and invites in one motion.
              </h2>
            </div>
            <div className="space-y-3 text-sm text-[var(--ink-1)]">
              <p>1. Log in after signup.</p>
              <p>2. Create your organization in onboarding.</p>
              <p>3. Invite clients and keep sessions in sync.</p>
            </div>
            <div className="rounded-2xl border border-[#e2d6c7] bg-[#fffaf3] px-4 py-3 text-xs text-[var(--ink-1)]">
              Mock data runs entirely in your browser. No backend required.
            </div>
          </Card>
        </section>
      </div>
    </main>
  )
}
