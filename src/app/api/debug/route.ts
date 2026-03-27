// GET /api/debug - D1 database diagnostic
import { NextResponse } from 'next/server'

const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

async function d1Query(sql: string) {
  const res = await fetch(D1_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql }),
  })
  return await res.json()
}

export async function GET(req: Request): Promise<Response> {
  // Get all users
  const usersResult = await d1Query('SELECT id, google_id, name, email FROM users LIMIT 10')
  const sessionsResult = await d1Query('SELECT session_token, user_id, expires FROM sessions LIMIT 10')
  const accountsResult = await d1Query('SELECT id, userId, provider, providerAccountId FROM accounts LIMIT 10')

  return NextResponse.json({
    users: usersResult,
    sessions: sessionsResult,
    accounts: accountsResult,
  })
}
