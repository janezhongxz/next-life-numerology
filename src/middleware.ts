import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Inject Cloudflare D1 binding into globalThis for use by Drizzle in API routes
  // In Cloudflare Pages + Next.js, bindings are available via request.env
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const env = (request as any).env
  if (env?.DB) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(globalThis as any).DB = env.DB
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*']
}
