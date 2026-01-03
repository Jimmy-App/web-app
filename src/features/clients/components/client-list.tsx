"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { clientsApi } from "@/features/clients/api"

export function ClientList({ orgId }: { orgId: string }) {
  const [clients, setClients] = React.useState<
    { id: string; name: string; email: string | null; phone: string | null }[]
  >([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const loadClients = React.useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      const data = await clientsApi.getAll(orgId)
      setClients(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clients")
    } finally {
      setLoading(false)
    }
  }, [orgId])

  React.useEffect(() => {
    loadClients()
  }, [loadClients])

  const handleDelete = async (clientId: string) => {
    setDeletingId(clientId)
    try {
      await clientsApi.delete(clientId)
      setClients((prev) => prev.filter((client) => client.id !== clientId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to remove client")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <p className="text-sm text-[var(--ink-1)]">Loading clients...</p>
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
        {error}
      </div>
    )
  }

  if (clients.length === 0) {
    return <p className="text-sm text-[var(--ink-1)]">No clients yet.</p>
  }

  return (
    <div className="grid gap-4">
      {clients.map((client) => (
        <Card key={client.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold">{client.name}</p>
              <p className="text-sm text-[var(--ink-1)]">
                {client.email ?? "No email"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(client.id)}
              disabled={deletingId === client.id}
            >
              {deletingId === client.id ? "Removing..." : "Remove"}
            </Button>
          </div>
          {client.phone ? (
            <p className="text-xs text-[var(--ink-1)]">Phone: {client.phone}</p>
          ) : null}
        </Card>
      ))}
    </div>
  )
}
