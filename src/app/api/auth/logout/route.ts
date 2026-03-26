// POST /api/auth/logout - clears session
import { logout, clearSessionCookie } from '@/lib/auth'

export async function POST(req: Request): Promise<Response> {
  const response = await logout(req)
  return clearSessionCookie(response)
}

// Also support GET for convenience
export async function GET(req: Request): Promise<Response> {
  const response = await logout(req)
  return clearSessionCookie(response)
}
