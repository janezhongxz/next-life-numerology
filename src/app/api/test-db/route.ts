// Debug: test DB connection
import { getDb } from '@/db'
import { users } from '@/db/schema'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    const db = getDb()
    const result = await db.select({ count: sql`count(*)` }).from(users).all()
    return Response.json({ ok: true, userCount: result })
  } catch (err) {
    return Response.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
