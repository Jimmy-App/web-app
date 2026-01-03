"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { organizationsApi } from "@/features/organizations/api"
import { mockAuth } from "@/lib/mock-db"
import { cn } from "@/lib/utils"

export function OrgSwitcher({ currentSlug }: { currentSlug: string }) {
  const router = useRouter()
  const [orgs, setOrgs] = React.useState<{ id: string; name: string; slug: string }[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    const load = async () => {
      try {
        const coach = mockAuth.getCurrentCoach()
        if (!coach) {
          setOrgs([])
          return
        }
        const data = await organizationsApi.getAll()
        if (active) {
          setOrgs(data)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load organizations")
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
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#e2d6c7] bg-white/70 px-4 py-3 text-xs text-[var(--ink-1)]">
        Loading organizations...
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
        {error}
      </div>
    )
  }

  if (orgs.length <= 1) {
    return null
  }

  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ink-1)]">
        Your orgs
      </span>
      <select
        value={currentSlug}
        onChange={(event) => router.push(`/${event.target.value}/dashboard`)}
        className={cn(
          "h-11 w-full rounded-2xl border border-[#e2d6c7] bg-white px-4 text-sm font-medium text-[var(--ink-0)] shadow-[0_12px_30px_-24px_rgba(20,18,16,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
        )}
      >
        {orgs.map((org) => (
          <option key={org.id} value={org.slug}>
            {org.name}
          </option>
        ))}
      </select>
    </div>
  )
}
