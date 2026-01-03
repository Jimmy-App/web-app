import Link from "next/link"

import { SignupForm } from "@/features/auth/components/signup-form"

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
            Jimmy Coach
          </p>
          <h1 className="text-3xl font-semibold font-[var(--font-display)]">
            Create your account
          </h1>
          <p className="text-sm text-[var(--ink-1)]">
            Already have an account? <Link href="/login" className="underline">Log in</Link>
          </p>
        </div>
        <div className="flex justify-center">
          <SignupForm />
        </div>
      </div>
    </main>
  )
}
