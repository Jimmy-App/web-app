import { NextResponse, type NextRequest } from "next/server"

const AUTH_COOKIE = "jimmy_coach_auth"
const ORG_COOKIE = "jimmy_coach_orgs"

// LocalStorage is client-only; we mirror auth/org state in cookies for middleware.

const isPublicPath = (pathname: string) =>
  pathname === "/" || pathname.startsWith("/login") || pathname.startsWith("/signup")

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next()
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const auth = request.cookies.get(AUTH_COOKIE)?.value
  if (!auth) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  const orgCountRaw = request.cookies.get(ORG_COOKIE)?.value
  const orgCount = orgCountRaw ? Number(orgCountRaw) : 0
  const orgCountSafe = Number.isFinite(orgCount) ? orgCount : 0

  if (orgCountSafe === 0 && !pathname.startsWith("/onboarding")) {
    const url = request.nextUrl.clone()
    url.pathname = "/onboarding"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
}
