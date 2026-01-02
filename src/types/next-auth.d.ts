import type { Role } from "@prisma/client";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      activeOrgId: string | null;
      role: Role | null;
    } & DefaultSession["user"];
  }

  interface User {
    activeOrgId?: string | null;
  }
}
