import Link from "next/link";

import { LandingShell } from "@/components/layouts/landing-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketingPage() {
  return (
    <LandingShell>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Public landing shell</CardTitle>
          <CardDescription>Replace with your product narrative.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/auth/sign-up">Get started</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/auth/sign-in">Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </LandingShell>
  );
}
