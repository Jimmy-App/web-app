import { redirect } from "next/navigation"

export default function OrgIndexPage({
  params
}: {
  params: { orgSlug: string }
}) {
  redirect(`/${params.orgSlug}/dashboard`)
}
