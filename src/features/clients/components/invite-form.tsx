"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { clientsApi } from "@/features/clients/api"
import { inviteClientSchema, type InviteClientValues } from "@/features/clients/schemas"

export function InviteForm({
  orgId,
  onSuccess
}: {
  orgId: string
  onSuccess?: () => void
}) {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InviteClientValues>({
    resolver: zodResolver(inviteClientSchema)
  })

  const onSubmit = async (values: InviteClientValues) => {
    setError(null)
    setLoading(true)
    try {
      await clientsApi.create(orgId, {
        name: values.name,
        email: values.email?.trim() || "",
        phone: values.phone?.trim() || ""
      })
      reset()
      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to invite client")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Invite a client</CardTitle>
        <CardDescription>Add a new client to your organization.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Client name</Label>
            <Input id="name" placeholder="Alex Rivera" {...register("name")} />
            {errors.name ? (
              <p className="text-xs text-[#b2411f]">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (optional)</Label>
            <Input id="email" type="email" placeholder="alex@example.com" {...register("email")} />
            {errors.email ? (
              <p className="text-xs text-[#b2411f]">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" placeholder="+380501112233" {...register("phone")} />
          </div>

          {error ? (
            <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending invite..." : "Send invite"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
