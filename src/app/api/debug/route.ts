// GET /api/debug - session validation diagnostic
import { NextResponse } from 'next/server'
import { validateSession } from '@/lib/auth'

const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'
const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim() || 'fallback-secret-change-in-production'

// Minimal base64url decoder for debugging
function decodeJwtPayload(token: string): object | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    let payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    while (payload.length % 4) payload += '='
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export async function GET(req: Request): Promise<Response> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  const token = cookies['session_token']

  let validation = null
  let validationError = null
  let jwtPayload = null
  try {
    validation = await validateSession(req)
  } catch (e) {
    validationError = String(e)
  }

  if (token) {
    jwtPayload = decodeJwtPayload(token)
  }

  let dbSessionInfo = null
  if (validation?.sessionToken) {
    try {
      const res = await fetch(D1_API, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: `SELECT session_token, user_id, expires FROM sessions WHERE session_token = '${validation.sessionToken}' LIMIT 1` }),
      })
      dbSessionInfo = await res.json()
    } catch (e) {
      dbSessionInfo = { error: String(e) }
    }
  }

  return NextResponse.json({
    jwtPayload,
    validation,
    validationError,
    jwtSecretUsed: JWT_SECRET.substring(0, 10) + '...',
    dbSessionInfo,
  })
}
