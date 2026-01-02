import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/app/dashboard");
  }

  return <SignInForm />;
}
