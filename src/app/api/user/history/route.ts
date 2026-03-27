// GET /api/user/history - get user's calculation history
import { NextResponse } from 'next/server'
import { db } from '@/db'
import { validateSession } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  try {
    const { userId } = await validateSession(req)
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const history = await db.getCalculations(userId)

    return NextResponse.json({
      history: history.map(c => ({
        id: c.id,
        name: c.name,
        birthdate: c.birthdate,
        lifeNumber: c.lifeNumber,
        question: c.question,
        queryYear: c.queryYear,
        isPaid: c.isPaid,
        createdAt: c.createdAt,
        fingerprint: c.fingerprint,
      })),
    })
  } catch (err) {
    console.error('[/api/user/history]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
