// GET /api/user/credits - get remaining free credits
import { NextResponse } from 'next/server'
import { getDb } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { validateSession } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  const { userId } = await validateSession(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  const user = await db.select().from(users).where(eq(users.id, userId)).get()
  const creditsUsed = user?.freeCreditsUsed ?? 0

  return NextResponse.json({
    creditsUsed,
    creditsRemaining: Math.max(0, 1 - creditsUsed)
  })
}
