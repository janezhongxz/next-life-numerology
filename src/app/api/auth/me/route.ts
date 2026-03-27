// GET /api/auth/me - returns current logged-in user info
import { NextResponse } from 'next/server'
import { getAuthUser, validateSession } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  try {
    const validation = await validateSession(req)
    console.error('[/api/auth/me] validateSession result:', JSON.stringify(validation))
    
    if (!validation.userId) {
      console.error('[/api/auth/me] no userId from validateSession, returning null')
      return NextResponse.json({ user: null })
    }
    
    const user = await getAuthUser(req)
    console.error('[/api/auth/me] getAuthUser result:', user ? `id=${user.id} name=${user.name}` : 'null')
    
    return NextResponse.json({
      user: user ? { id: user.id, name: user.name, email: user.email, image: user.image } : null
    })
  } catch (err) {
    console.error('[/api/auth/me] ERROR:', err instanceof Error ? `${err.message}\n${err.stack}` : String(err))
    return NextResponse.json({ user: null, error: String(err) }, { status: 200 })
  }
}
