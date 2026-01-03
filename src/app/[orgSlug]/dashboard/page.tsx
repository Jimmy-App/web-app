"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { ClientList } from "@/features/clients/components/client-list"
import { mockDb } from "@/lib/mock-db"

export default function DashboardPage() {
  const params = useParams<{ orgSlug: string }>()
  const [orgId, setOrgId] = React.useState<string | null>(null)
  const [orgName, setOrgName] = React.useState<string>("")
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const org = await mockDb.organization.findBySlug(params.orgSlug)
        if (!org) {
          throw new Error("Organization not found")
        }
        if (active) {
          setOrgId(org.id)
          setOrgName(org.name)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load organization")
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      active = false
    }
  }, [params.orgSlug])

  if (loading) {
    return <p className="text-sm text-[var(--ink-1)]">Loading dashboard...</p>
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
        {error}
      </div>
    )
  }

  if (!orgId) {
    return null
  }

  return (
    <main className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold font-[var(--font-display)]">
            {orgName}
          </h1>
        </div>
        <Button asChild>
          <Link href={`/${params.orgSlug}/clients/invite`}>Invite client</Link>
        </Button>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Your clients</h2>
        <ClientList orgId={orgId} />
      </section>
    </main>
  )
}
