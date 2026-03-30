import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/db'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const history = await db.getCalculations(session.user.id)
  return NextResponse.json({ history })
}
