"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { organizationsApi } from "@/features/organizations/api"
import {
  createOrganizationSchema,
  type CreateOrganizationValues
} from "@/features/organizations/schemas"

export function CreateOrgForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateOrganizationValues>({
    resolver: zodResolver(createOrganizationSchema)
  })

  const onSubmit = async (values: CreateOrganizationValues) => {
    setError(null)
    setLoading(true)
    try {
      const org = await organizationsApi.create(values)
      router.push(`/${org.slug}/dashboard`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create organization")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create your organization</CardTitle>
        <CardDescription>Give your coaching workspace a name and slug.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Organization name</Label>
            <Input id="name" placeholder="Jimmy Performance" {...register("name")} />
            {errors.name ? (
              <p className="text-xs text-[#b2411f]">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" placeholder="jimmy-performance" {...register("slug")} />
            {errors.slug ? (
              <p className="text-xs text-[#b2411f]">{errors.slug.message}</p>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create organization"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
