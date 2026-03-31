// GET /api/auth/me
import { verifyJwt } from '@/lib/jwt'
import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET(req: Request): Promise<Response> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const token = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('session_token='))?.split('=').slice(1).join('=')
  if (!token) return NextResponse.json({ user: null })

  const payload = await verifyJwt(token)
  if (!payload) return NextResponse.json({ user: null })

  return NextResponse.json({ user: { id: payload.sub, name: payload.name, email: payload.email, image: payload.image } })
}
