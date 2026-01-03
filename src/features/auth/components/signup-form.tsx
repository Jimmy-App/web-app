"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authApi } from "@/features/auth/api"
import { signupSchema, type SignupValues } from "@/features/auth/schemas"

export function SignupForm() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (values: SignupValues) => {
    setError(null)
    setLoading(true)
    try {
      await authApi.signup(values)
      router.push(`/login?email=${encodeURIComponent(values.email)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your coach profile</CardTitle>
        <CardDescription>Start with a name and email. We&#39;ll set up your workspace next.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jimmy Coach" {...register("name")} />
            {errors.name ? (
              <p className="text-xs text-[#b2411f]">{errors.name.message}</p>
            ) : null}
          </div>

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
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
