"use client"

import * as React from "react"

import { organizationsApi } from "@/features/organizations/api"
import { Card } from "@/components/ui/card"

export function OrgList() {
  const [orgs, setOrgs] = React.useState<
    { id: string; name: string; slug: string }[]
  >([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let active = true
    const load = async () => {
      try {
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
    return <p className="text-sm text-[var(--ink-1)]">Loading organizations...</p>
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
        {error}
      </div>
    )
  }

  if (orgs.length === 0) {
    return <p className="text-sm text-[var(--ink-1)]">No organizations yet.</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {orgs.map((org) => (
        <Card key={org.id} className="space-y-2">
          <h3 className="text-lg font-semibold">{org.name}</h3>
          <p className="text-sm text-[var(--ink-1)]">Slug: {org.slug}</p>
        </Card>
      ))}
    </div>
  )
}
