"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AuthActionState } from "@/features/auth/actions";
import { signInAction, signInWithGoogle } from "@/features/auth/actions";

const initialState: AuthActionState = {};

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center px-4">
      <div className="w-full max-w-[400px] flex-col items-center">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center gap-4 text-center">
          <img
            src="/assets/logo-login.svg"
            alt="Jimmy"
            className="h-16 w-auto"
            loading="lazy"
          />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
              Welcome Back
            </h1>
            <p className="text-sm font-medium text-[#9CA3AF]">
              Your progress is waiting for you.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form action={formAction} className="w-full space-y-6">
          <div className="space-y-4">
            
            {/* Input: Email */}
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="h-[52px] w-full rounded-[14px] border border-transparent bg-[#F3F4F6] px-4 text-base text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:bg-white focus:border-[#7C3AED]"
                required
              />
            </div>

            {/* Input: Password */}
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Password"
                className="h-[52px] w-full rounded-[14px] border border-transparent bg-[#F3F4F6] pl-4 pr-12 text-base text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:bg-white focus:border-[#7C3AED]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#1F2937] focus:outline-none"
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end px-1">
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-[#6B7280] transition-colors hover:text-[#7C3AED]"
              >
                Forgot Password?
              </Link>
            </div>
          </div>

          {state.error ? (
            <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-[#EF4444]">
              {state.error}
            </div>
          ) : null}

          {/* PRIMARY BUTTON */}
          <Button
            className="h-[54px] w-full rounded-full bg-[#7C3AED] text-base font-bold text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)] transition-all hover:bg-[#6D28D9] hover:shadow-[0_6px_16px_rgba(124,58,237,0.4)] active:scale-[0.98] active:opacity-90"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Signing in..." : "Log In"}
          </Button>
        </form>

        {/* SOCIAL BUTTON (Immediately after, just margin top) */}
        <form action={signInWithGoogle} className="mt-4 w-full">
          <Button
            variant="outline"
            type="submit"
            className="h-[54px] w-full gap-3 rounded-full border border-[#E5E7EB] bg-white text-base font-semibold text-[#1F2937] transition-all hover:bg-[#F3F4F6] hover:border-[#D1D5DB] active:scale-[0.98] active:opacity-90"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
        </form>

        {/* Footer Link (Updated Copy) */}
        <div className="mt-8 text-center text-sm">
          <p className="text-[#9CA3AF]">
            No Training Space yet?{" "}
            <Link 
              href="/auth/sign-up" 
              className="font-semibold text-[#1F2937] transition-colors hover:text-black hover:underline"
            >
              Let&apos;s build yours!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}