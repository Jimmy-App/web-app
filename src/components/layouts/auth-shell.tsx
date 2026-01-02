import React from "react";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-white">
      <main className="flex min-h-screen w-full items-center justify-center px-4 sm:px-6">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
