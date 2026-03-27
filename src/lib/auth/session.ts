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

export interface SessionUser {
  id: string
  name: string | null
  email: string | null
  image: string | null
  googleId: string
}

export async function createSession(userId: string, userInfo: { name: string | null; email: string | null; image: string | null; googleId: string }): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)
  const sessionToken = crypto.randomUUID()

  const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/database/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
  const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'
  fetch(D1_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${D1_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql: `INSERT OR IGNORE INTO sessions (id, session_token, user_id, expires) VALUES ('${sessionToken}', '${sessionToken}', '${userId}', ${Math.floor(expiresAt.getTime() / 1000)})` }),
  }).catch(() => {})

  const jwtPayload = {
    sub: userId,
    sid: sessionToken,
    name: userInfo.name,
    email: userInfo.email,
    image: userInfo.image,
    googleId: userInfo.googleId,
    exp: Math.floor(expiresAt.getTime() / 1000),
    iat: Math.floor(Date.now() / 1000),
  }
  return signJwt(jwtPayload, JWT_SECRET)
}

export async function validateSession(req: Request): Promise<{
  userId: string | null
  sessionToken: string | null
  user: SessionUser | null
}> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = parseCookies(cookieHeader)
  const token = cookies['session_token']
  if (!token) return { userId: null, sessionToken: null, user: null }

  let payload: { sub?: string; sid?: string; exp?: number; name?: string | null; email?: string | null; image?: string | null; googleId?: string } | null
  try {
    payload = await verifyJwt(token, JWT_SECRET) as typeof payload
  } catch { return { userId: null, sessionToken: null, user: null } }
  
  if (!payload || !payload.sub || !payload.exp) return { userId: null, sessionToken: null, user: null }
  if (Date.now() / 1000 > payload.exp) return { userId: null, sessionToken: null, user: null }

  return {
    userId: payload.sub,
    sessionToken: payload.sid ?? null,
    user: payload.sub ? {
      id: payload.sub,
      name: payload.name ?? null,
      email: payload.email ?? null,
      image: payload.image ?? null,
      googleId: payload.googleId ?? '',
    } : null,
  }
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
  response.headers.set('Set-Cookie', `session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}; Secure`)
  return response
}

export function clearSessionCookie(response: Response): Response {
  response.headers.set('Set-Cookie', 'session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
  return response
}
