import type { Metadata } from "next"
import { Fraunces, Space_Grotesk } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
})

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Jimmy Coach",
  description: "Coach your clients with calm, modern workflows"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${fraunces.variable}`}>
      <body className="font-[var(--font-sans)] text-[15px] antialiased">
        {children}
      </body>
    </html>
  )
}
