import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.getUserById(session.user.id)
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    freeCreditsUsed: user.freeCreditsUsed,
    freeCreditsRemaining: Math.max(0, 1 - user.freeCreditsUsed),
  })
}
