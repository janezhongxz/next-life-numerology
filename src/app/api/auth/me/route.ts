// GET /api/auth/me - returns current logged-in user info
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  try {
    const user = await getAuthUser(req)
    return NextResponse.json({ user })
  } catch (err) {
    console.error('[/api/auth/me]', err)
    return NextResponse.json({ user: null, error: String(err) }, { status: 200 })
  }
}
