"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { OrgSwitcher } from "@/components/layout/org-switcher"
import { mockAuth } from "@/lib/mock-db"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Clients", href: "clients" },
  { label: "Settings", href: "settings" }
]

export function Sidebar() {
  const pathname = usePathname()
  const params = useParams<{ orgSlug: string }>()
  const orgSlug = params?.orgSlug ?? ""

  const handleLogout = () => {
    mockAuth.clearAuth()
    window.location.href = "/login"
  }

  return (
    <aside className="flex h-screen w-full max-w-[260px] flex-col gap-6 border-r border-[#eadfce] bg-white/70 px-6 py-8 backdrop-blur">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--ink-1)]">
          Jimmy Coach
        </p>
        <h1 className="text-lg font-semibold font-[var(--font-display)]">
          Workflow Studio
        </h1>
      </div>

      {orgSlug ? <OrgSwitcher currentSlug={orgSlug} /> : null}

      <nav className="space-y-2">
        {navItems.map((item) => {
          const href = `/${orgSlug}/${item.href}`
          const active = pathname?.startsWith(href)
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-[var(--ink-0)] text-white shadow-[0_18px_40px_-28px_rgba(20,18,16,0.6)]"
                  : "text-[var(--ink-0)] hover:bg-[#efe6d8]"
              )}
            >
              {item.label}
              <span className="text-xs opacity-70">-&gt;</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto space-y-2">
        <div className="rounded-2xl border border-[#e2d6c7] bg-white px-4 py-3 text-xs text-[var(--ink-1)]">
          Tip: Invite clients to keep everyone aligned.
        </div>
        <Button variant="secondary" onClick={handleLogout} className="w-full">
          Log out
        </Button>
      </div>
    </aside>
  )
}
