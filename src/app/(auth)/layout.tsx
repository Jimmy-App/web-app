import type { Metadata } from "next";

import { AuthShell } from "@/components/layouts/auth-shell";

export const metadata: Metadata = {
  title: "Authenticate",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}
