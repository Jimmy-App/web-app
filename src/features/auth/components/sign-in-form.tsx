"use client";

import Link from "next/link";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthActionState } from "@/features/auth/actions";
import { signInAction, signInWithGoogle } from "@/features/auth/actions";

const initialState: AuthActionState = {};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Sign in</CardTitle>
        <CardDescription>Access your workspace.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {state.error ? (
            <p className="text-sm text-destructive">{state.error}</p>
          ) : null}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div className="space-y-3">
          <form action={signInWithGoogle}>
            <Button variant="outline" type="submit" className="w-full">
              Continue with Google
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/auth/sign-up" className="text-foreground underline">
              Create one
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
