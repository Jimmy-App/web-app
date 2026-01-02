import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { createPersonalOrganization } from "@/features/auth/organization";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { signInSchema } from "@/lib/validations";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsed = signInSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await compare(parsed.data.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.activeOrgId = user.activeOrgId ?? null;
        session.user.role = null;

        if (user.activeOrgId) {
          const membership = await prisma.membership.findUnique({
            where: {
              userId_orgId: {
                userId: user.id,
                orgId: user.activeOrgId,
              },
            },
            select: { role: true },
          });

          session.user.role = membership?.role ?? null;
        }
      }

      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      await createPersonalOrganization(user.id, user.name ?? "Personal");
    },
  },
  secret: env.NEXTAUTH_SECRET,
  trustHost: true,
});
