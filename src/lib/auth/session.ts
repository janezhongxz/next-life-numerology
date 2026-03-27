// JWT utilities using Web Crypto API (available in edge runtime)
// HMAC-SHA256 signing - compatible with Cloudflare Workers

const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim() || 'fallback-secret-change-in-production'
const SESSION_DURATION_DAYS = 30

function base64UrlEncode(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data)
  let binary = ''
  bytes.forEach(b => binary += String.fromCharCode(b))
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function base64UrlDecode(str: string): ArrayBuffer {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i) }
  return bytes.buffer
}

async function signJwt(payload: object, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const data = encoder.encode(JSON.stringify(payload))
  const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerB64  = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)).buffer)
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)).buffer)
  const sigB64     = base64UrlEncode(signature)
  return `${headerB64}.${payloadB64}.${sigB64}`
}

async function verifyJwt(token: string, secret: string): Promise<object | null> {
  try {
    const [headerB64, payloadB64, sigB64] = token.split('.')
    if (!headerB64 || !payloadB64 || !sigB64) return null
    const sigData = base64UrlDecode(sigB64)
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sigData, data)
    if (!valid) return null
    return JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)))
  } catch { return null }
}

function parseCookies(cookieHeader: string): Record<string, string> {
  const result: Record<string, string> = {}
  if (!cookieHeader) return result
  cookieHeader.split(';').forEach(part => {
    const trimmed = part.trim()
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex > 0) {
      result[trimmed.substring(0, eqIndex)] = trimmed.substring(eqIndex + 1)
    }
  })
  return result
}

// Retry-capable D1 session check
async function checkSessionInDb(sessionToken: string): Promise<boolean> {
  const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
  const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) {
      // Wait 100ms for D1 replication to catch up
      await new Promise(r => setTimeout(r, 100))
    }
    try {
      const res = await fetch(D1_API, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: `SELECT 1 FROM sessions WHERE session_token = '${sessionToken}' LIMIT 1` }),
      })
      const data = await res.json()
      if (data.success && data.results?.[0]?.rows?.length > 0) {
        return true
      }
    } catch { /* continue retry */ }
  }
  return false
}

export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)
  const sessionToken = crypto.randomUUID()

  const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
  const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'
  await fetch(D1_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql: `INSERT INTO sessions (id, session_token, user_id, expires) VALUES ('${sessionToken}', '${sessionToken}', '${userId}', ${Math.floor(expiresAt.getTime() / 1000)})` }),
  })

  const jwtPayload = {
    sub: userId,
    sid: sessionToken,
    exp: Math.floor(expiresAt.getTime() / 1000),
    iat: Math.floor(Date.now() / 1000),
  }
  return signJwt(jwtPayload, JWT_SECRET)
}

export async function validateSession(req: Request): Promise<{
  userId: string | null
  sessionToken: string | null
}> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = parseCookies(cookieHeader)
  const token = cookies['session_token']
  if (!token) return { userId: null, sessionToken: null }

  let payload: { sub?: string; sid?: string; exp?: number } | null
  try {
    payload = await verifyJwt(token, JWT_SECRET) as { sub?: string; sid?: string; exp?: number } | null
  } catch { return { userId: null, sessionToken: null } }
  if (!payload || !payload.sub || !payload.exp) return { userId: null, sessionToken: null }
  if (Date.now() / 1000 > payload.exp) return { userId: null, sessionToken: null }

  const sessionToken = payload.sid ?? null
  if (!sessionToken) return { userId: null, sessionToken: null }

  // Retry D1 reads up to 3 times with 100ms delay to handle replication lag
  const sessionFound = await checkSessionInDb(sessionToken)
  if (!sessionFound) {
    return { userId: null, sessionToken: null }
  }

  return { userId: payload.sub, sessionToken }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
  const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'
  await fetch(D1_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql: `DELETE FROM sessions WHERE session_token = '${sessionToken}'` }),
  })
}

export function setSessionCookie(response: Response, token: string): Response {
  const expires = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)
  response.headers.set('Set-Cookie', `session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}`)
  return response
}

export function clearSessionCookie(response: Response): Response {
  response.headers.set('Set-Cookie', 'session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
  return response
}
