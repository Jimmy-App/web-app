"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authApi } from "@/features/auth/api"
import { loginSchema, type LoginValues } from "@/features/auth/schemas"
import { organizationsApi } from "@/features/organizations/api"
import { mockAuth } from "@/lib/mock-db"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const presetEmail = searchParams.get("email") ?? ""

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: presetEmail }
  })

  const onSubmit = async (values: LoginValues) => {
    setError(null)
    setLoading(true)
    try {
      const coach = await authApi.login(values)
      mockAuth.setCoach(coach)
      const orgs = await organizationsApi.getAll()
      if (orgs.length === 0) {
        router.push("/onboarding")
      } else {
        router.push(`/${orgs[0].slug}/dashboard`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to run today&#39;s coaching flow.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@coach.com" {...register("email")} />
            {errors.email ? (
              <p className="text-xs text-[#b2411f]">{errors.email.message}</p>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-2xl border border-[#e9c1a0] bg-[#fff3e7] px-4 py-3 text-xs text-[#a24b24]">
              {error}
            </div>
          ) : null}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
