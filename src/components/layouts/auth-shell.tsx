import Link from "next/link";

import { ModeToggle } from "@/components/layouts/mode-toggle";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-sm font-semibold">
          Jimmy
        </Link>
        <ModeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-6 pb-12">
        {children}
      </main>
    </div>
  );
}
