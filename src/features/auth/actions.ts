"use server";

import { hash } from "bcryptjs";
import { revalidateTag } from "next/cache";

import { signIn, signOut } from "@/auth";
import { createPersonalOrganization } from "@/features/auth/organization";
import { cacheProfiles, dashboardTag } from "@/lib/cache";
import { prisma } from "@/lib/db";
import { signInSchema, signUpSchema } from "@/lib/validations";

export type AuthActionState = {
  error?: string;
};

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/app/dashboard",
    });
  } catch {
    return { error: "Invalid email or password." };
  }

  return {};
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const parsed = signUpSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return { error: "Check the fields and try again." };
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });

  if (existing) {
    return { error: "Email is already in use." };
  }

  const passwordHash = await hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
    },
  });

  await createPersonalOrganization(user.id, parsed.data.name);
  revalidateTag(dashboardTag(user.id), cacheProfiles.dashboard);

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/app/dashboard",
    });
  } catch {
    return { error: "Unable to sign in. Try again." };
  }

  return {};
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/app/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/auth/sign-in" });
}
