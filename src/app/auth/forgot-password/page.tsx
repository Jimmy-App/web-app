import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9CA3AF]">
          Coming soon
        </p>
        <h1 className="text-2xl font-semibold text-[#1F2937]">Reset password</h1>
        <p className="text-sm text-[#6B7280]">
          Password recovery will be available in the next platform update.
        </p>
      </div>
      <Button
        asChild
        className="h-[50px] rounded-full bg-[#7C3AED] px-6 text-sm font-semibold text-white hover:bg-[#6D28D9]"
      >
        <Link href="/auth/sign-in">Back to sign in</Link>
      </Button>
    </div>
  );
}
