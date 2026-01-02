import Link from "next/link";

import { ModeToggle } from "@/components/layouts/mode-toggle";
import { Button } from "@/components/ui/button";

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold">
          Jimmy
        </Link>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 pb-12">
        {children}
      </main>
    </div>
  );
}
