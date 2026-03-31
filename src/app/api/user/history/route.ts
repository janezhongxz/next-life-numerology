import { NextResponse } from 'next/server'
import { verifyJwt } from '@/lib/jwt'
import { db } from '@/db'

export const runtime = 'edge'

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const token = cookieHeader.split(';').map(c => c.trim()).find(c => c.startsWith('session_token='))?.split('=').slice(1).join('=')
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const payload = await verifyJwt(token)
  if (!payload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const history = await db.getCalculations(payload.sub as string)
  return NextResponse.json({ history })
}
