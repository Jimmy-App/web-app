import Link from "next/link";

import { ModeToggle } from "@/components/layouts/mode-toggle";
import { Button } from "@/components/ui/button";

export function AppShell({
  user,
  children,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    activeOrgId?: string | null;
  };
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <Link href="/app/dashboard" className="text-sm font-semibold">
            Jimmy
          </Link>
          <span className="text-xs text-muted-foreground">
            {user.name ?? user.email ?? "Account"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="outline" size="sm" type="button" disabled>
            Sign out
          </Button>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-6 pb-12">{children}</main>
    </div>
  );
}
