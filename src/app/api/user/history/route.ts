// GET /api/user/history - get user's calculation history
import { NextResponse } from 'next/server'
import { getDb } from '@/db'
import { calculations } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { validateSession } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  const { userId } = await validateSession(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const db = getDb()
  const history = await db
    .select({
      id: calculations.id,
      name: calculations.name,
      birthdate: calculations.birthdate,
      lifeNumber: calculations.lifeNumber,
      question: calculations.question,
      queryYear: calculations.queryYear,
      isPaid: calculations.isPaid,
      createdAt: calculations.createdAt,
      fingerprint: calculations.fingerprint,
    })
    .from(calculations)
    .where(eq(calculations.userId, userId))
    .orderBy(desc(calculations.createdAt))
    .limit(50)

  return NextResponse.json({ history })
}
