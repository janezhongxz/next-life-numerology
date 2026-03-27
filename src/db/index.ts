// Cloudflare D1 via REST API - bypasses binding issues completely
import * as schema from './schema'

export { schema }

// D1 REST API - note: singular "database" not "databases"
const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

interface D1Result {
  success: boolean
  results?: Array<{ columns: string[]; rows: unknown[][] }>
  errors?: Array<{ code: number; message: string }>
}

// Escape string value for inline use (basic SQL injection prevention for UUIDs/emails)
function esc(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  const s = String(v).replace(/'/g, "''")
  return `'${s}'`
}

// Execute SQL against D1 REST API
async function d1Query<T = Record<string, unknown>>(sql: string): Promise<T[]> {
  const res = await fetch(D1_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${D1_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sql }),
  })

  let data: D1Result
  try {
    data = await res.json()
  } catch {
    const text = await res.text().catch(() => 'empty')
    throw new Error(`D1 parse error: status=${res.status} body=${text.slice(0, 200)}`)
  }

  if (!res.ok || !data.success || data.errors?.length) {
    const msg = data.errors?.map(e => e.message).join('; ') ?? `HTTP ${res.status}`
    throw new Error(`D1 error: ${msg} | sql: ${sql.slice(0, 80)}`)
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

export const db = {
  async getUserByGoogleId(googleId: string): Promise<schema.User | undefined> {
    const rows = await d1Query<Record<string, unknown>>(
      `SELECT * FROM users WHERE google_id = ${esc(googleId)} LIMIT 1`
    )
    return rows[0] as unknown as schema.User | undefined
  },

  async getUserById(id: string): Promise<schema.User | undefined> {
    const rows = await d1Query<Record<string, unknown>>(
      `SELECT * FROM users WHERE id = ${esc(id)} LIMIT 1`
    )
    return rows[0] as unknown as schema.User | undefined
  },

  async createUser(user: schema.InsertUser): Promise<schema.User> {
    await d1Query(
      `INSERT INTO users (id, google_id, name, email, image) VALUES (${esc(user.id)}, ${esc(user.googleId)}, ${esc(user.name ?? null)}, ${esc(user.email ?? null)}, ${esc(user.image ?? null)})`
    )
    return (await this.getUserById(user.id))!
  },

  async updateUser(id: string, data: { name?: string | null; image?: string | null }): Promise<void> {
    const sets: string[] = []
    if (data.name !== undefined) sets.push(`name = ${esc(data.name)}`)
    if (data.image !== undefined) sets.push(`image = ${esc(data.image)}`)
    if (sets.length === 0) return
    await d1Query(`UPDATE users SET ${sets.join(', ')} WHERE id = ${esc(id)}`)
  },

  async getCalculations(userId: string): Promise<schema.Calculation[]> {
    const rows = await d1Query<Record<string, unknown>>(
      `SELECT * FROM calculations WHERE user_id = ${esc(userId)} ORDER BY created_at DESC LIMIT 50`
    )
    return rows.map(rowToCalculation)
  },

  async getCalculationByFingerprint(fingerprint: string, userId: string): Promise<schema.Calculation | undefined> {
    const rows = await d1Query<Record<string, unknown>>(
      `SELECT * FROM calculations WHERE fingerprint = ${esc(fingerprint)} AND user_id = ${esc(userId)} LIMIT 1`
    )
    return rows[0] ? rowToCalculation(rows[0]) : undefined
  },

  async createCalculation(calc: schema.InsertCalculation): Promise<void> {
    await d1Query(
      `INSERT INTO calculations (id, user_id, birthdate, name, life_number, lang, report_text, fingerprint, is_paid, question, query_year) VALUES (${esc(calc.id)}, ${esc(calc.userId)}, ${esc(calc.birthdate)}, ${esc(calc.name)}, ${calc.lifeNumber}, ${esc(calc.lang)}, ${esc(calc.reportText ?? null)}, ${esc(calc.fingerprint ?? null)}, ${calc.isPaid ?? 0}, ${esc(calc.question ?? null)}, ${esc(calc.queryYear ?? null)})`
    )
  },

  async updateCalculation(id: string, data: { reportText?: string | null; isPaid?: number }): Promise<void> {
    const sets: string[] = []
    if (data.reportText !== undefined) sets.push(`report_text = ${esc(data.reportText)}`)
    if (data.isPaid !== undefined) sets.push(`is_paid = ${data.isPaid}`)
    if (sets.length === 0) return
    await d1Query(`UPDATE calculations SET ${sets.join(', ')} WHERE id = ${esc(id)}`)
  },

  async incrementUserCredits(userId: string): Promise<void> {
    await d1Query(`UPDATE users SET free_credits_used = free_credits_used + 1 WHERE id = ${esc(userId)}`)
  },

  async createSession(sessionToken: string, userId: string, expiresAt: Date): Promise<void> {
    await d1Query(
      `INSERT INTO sessions (id, session_token, user_id, expires) VALUES (${esc(sessionToken)}, ${esc(sessionToken)}, ${esc(userId)}, ${Math.floor(expiresAt.getTime() / 1000)})`
    )
  },

  async deleteSession(sessionToken: string): Promise<void> {
    await d1Query(`DELETE FROM sessions WHERE session_token = ${esc(sessionToken)}`)
  },
}
