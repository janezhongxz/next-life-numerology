// GET /api/debug - session validation diagnostic
import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

export async function GET(req: Request): Promise<Response> {
  let validation = null
  let validationError = null
  try {
    validation = await validateSession(req)
  } catch (e) {
    validationError = String(e)
  }

  let dbSessionInfo = null
  if (validation?.sessionToken) {
    try {
      const res = await fetch(D1_API, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: `SELECT session_token, user_id, expires FROM sessions WHERE session_token = '${validation.sessionToken}' LIMIT 1` }),
      })
      const data = await res.json()
      dbSessionInfo = data
    } catch (e) {
      dbSessionInfo = { error: String(e) }
    }
  }

  return NextResponse.json({
    validation,
    validationError,
    dbSessionInfo,
  })
}
