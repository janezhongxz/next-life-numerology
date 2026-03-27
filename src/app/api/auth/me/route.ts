// GET /api/auth/me - returns current logged-in user info
import { getAuthUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  try {
    const user = await getAuthUser(req)
    return NextResponse.json({ user: user ? {
      id   : user.id,
      name : user.name,
      email: user.email,
      image: user.image,
    } : null })
  } catch (err) {
    console.error('[/api/auth/me]', err)
    return NextResponse.json({ user: null, error: String(err) }, { status: 200 })
  }
}
