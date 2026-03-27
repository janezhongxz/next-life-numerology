// Cloudflare D1 via REST API - bypasses binding issues completely
import * as schema from './schema'

export { schema }

// D1 REST API config
const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/databases/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

interface D1Result {
  success: boolean
  results?: Array<{ columns: string[]; rows: unknown[][] }>
  errors?: Array<{ code: number; message: string }>
}

async function d1Query<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  const res = await fetch(D1_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${D1_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql, params }),
  })
  const data: D1Result = await res.json()
  if (!data.success || data.errors?.length) {
    throw new Error(data.errors?.[0]?.message ?? 'D1 query failed')
  }
  if (!data.results?.[0]) return []
  const { columns, rows } = data.results[0]
  return rows.map(row => {
    const obj: Record<string, unknown> = {}
    columns.forEach((col, i) => { obj[col] = row[i] })
    return obj as T
  })
}

function rowToCalculation(row: Record<string, unknown>): schema.Calculation {
  return {
    id: row.id as string,
    userId: row.user_id as string,
    birthdate: row.birthdate as string,
    name: row.name as string,
    lifeNumber: row.life_number as number,
    lang: (row.lang as string) ?? 'zh',
    reportText: row.report_text as string | null,
    createdAt: row.created_at ? new Date(row.created_at as number) : new Date(),
    fingerprint: row.fingerprint as string | null,
    isPaid: (row.is_paid as number) ?? 0,
    question: row.question as string | null,
    queryYear: row.query_year as number | null,
  }
}

// Actual database operations using D1 REST API
export const db = {
  async getUserByGoogleId(googleId: string): Promise<schema.User | undefined> {
    const rows = await d1Query<Record<string, unknown>>('SELECT * FROM users WHERE google_id = ? LIMIT 1', [googleId])
    return rows[0] as schema.User | undefined
  },

  async getUserById(id: string): Promise<schema.User | undefined> {
    const rows = await d1Query<Record<string, unknown>>('SELECT * FROM users WHERE id = ? LIMIT 1', [id])
    return rows[0] as schema.User | undefined
  },

  async createUser(user: { id: string; name: string | null; email: string | null; image: string | null; googleId: string }): Promise<schema.User> {
    await d1Query(
      'INSERT INTO users (id, name, email, image, google_id, free_credits_used) VALUES (?, ?, ?, ?, ?, 0)',
      [user.id, user.name ?? null, user.email ?? null, user.image ?? null, user.googleId]
    )
    return (await this.getUserById(user.id))!
  },

  async updateUser(id: string, data: { name?: string; image?: string; freeCreditsUsed?: number }): Promise<void> {
    const sets: string[] = []
    const vals: unknown[] = []
    if (data.name !== undefined) { sets.push('name = ?'); vals.push(data.name) }
    if (data.image !== undefined) { sets.push('image = ?'); vals.push(data.image) }
    if (data.freeCreditsUsed !== undefined) { sets.push('free_credits_used = ?'); vals.push(data.freeCreditsUsed) }
    if (sets.length === 0) return
    vals.push(id)
    await d1Query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, vals)
  },

  async getCalculations(userId: string): Promise<schema.Calculation[]> {
    const rows = await d1Query<Record<string, unknown>>(
      'SELECT * FROM calculations WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
      [userId]
    )
    return rows.map(rowToCalculation)
  },

  async getCalculationByFingerprint(fingerprint: string, userId: string): Promise<schema.Calculation | undefined> {
    const rows = await d1Query<Record<string, unknown>>(
      'SELECT * FROM calculations WHERE fingerprint = ? AND user_id = ? LIMIT 1',
      [fingerprint, userId]
    )
    return rows[0] ? rowToCalculation(rows[0]) : undefined
  },

  async createCalculation(calc: schema.Calculation): Promise<schema.Calculation> {
    await d1Query(
      'INSERT INTO calculations (id, user_id, birthdate, name, life_number, lang, report_text, fingerprint, is_paid, question, query_year) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [calc.id, calc.userId, calc.birthdate, calc.name, calc.lifeNumber, calc.lang, calc.reportText ?? null, calc.fingerprint ?? null, calc.isPaid ?? 0, calc.question ?? null, calc.queryYear ?? null]
    )
    return calc
  },

  async updateCalculation(id: string, data: { reportText?: string; isPaid?: number }): Promise<void> {
    const sets: string[] = []
    const vals: unknown[] = []
    if (data.reportText !== undefined) { sets.push('report_text = ?'); vals.push(data.reportText) }
    if (data.isPaid !== undefined) { sets.push('is_paid = ?'); vals.push(data.isPaid) }
    if (sets.length === 0) return
    vals.push(id)
    await d1Query(`UPDATE calculations SET ${sets.join(', ')} WHERE id = ?`, vals)
  },

  async incrementUserCredits(userId: string): Promise<void> {
    await d1Query('UPDATE users SET free_credits_used = free_credits_used + 1 WHERE id = ?', [userId])
  },
}
