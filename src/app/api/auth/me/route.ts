// GET /api/auth/me - returns current logged-in user info
import { getAuthUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  try {
    const user = await getAuthUser(req)
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }
    return NextResponse.json({
      user: {
        id   : user.id,
        name : user.name,
        email: user.email,
        image: user.image,
      }
    })
  } catch (err) {
    console.error('[/api/auth/me]', err)
    return NextResponse.json({ error: 'Internal error', detail: String(err) }, { status: 500 })
  }
}
