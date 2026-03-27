// GET /api/user/credits - get remaining free credits
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { validateSession } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  try {
    const { userId } = await validateSession(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.getUserById(userId)
    const creditsUsed = user?.freeCreditsUsed ?? 0

    return NextResponse.json({
      creditsUsed,
      creditsRemaining: Math.max(0, 1 - creditsUsed),
    })
  } catch (err) {
    console.error('[/api/user/credits]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
