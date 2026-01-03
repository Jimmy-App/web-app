import { Sidebar } from "@/components/layout/sidebar"

export default function OrgLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#f6f1e8]">
      <Sidebar />
      <div className="flex-1 px-8 py-10">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </div>
    </div>
  )
}
