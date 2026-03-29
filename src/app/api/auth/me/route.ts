// GET /api/auth/me - returns current logged-in user info
import { NextResponse } from 'next/server'
import { getAuthUser } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  try {
    console.error('[/api/auth/me] START')
    const cookieHeader = req.headers.get('cookie')
    console.error('[/api/auth/me] Cookie header:', cookieHeader?.substring(0, 100))
    
    const user = await getAuthUser(req)
    console.error('[/api/auth/me] User result:', user ? 'found' : 'null')
    
    return NextResponse.json({ user })
  } catch (err) {
    console.error('[/api/auth/me] ERROR:', err)
    return NextResponse.json({ user: null, error: String(err) }, { status: 200 })
  }
}
