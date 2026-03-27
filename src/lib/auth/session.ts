// JWT utilities using Web Crypto API (available in edge runtime)
// HMAC-SHA256 signing - compatible with Cloudflare Workers
// Session storage uses D1 REST API

import { db } from '@/db'

const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim() || 'fallback-secret-change-in-production'
const SESSION_DURATION_DAYS = 30

// Base64URL encoding (RFC 4648)
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
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

// HMAC-SHA256 signing using Web Crypto API
async function signJwt(payload: object, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(secret)
  const data = encoder.encode(JSON.stringify(payload))

  const cryptoKey = await crypto.subtle.importKey(
    'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, data)
  const header = { alg: 'HS256', typ: 'JWT' }

  const headerB64  = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)).buffer)
  const payloadB64 = base64UrlEncode(new TextEncoder().encode(JSON.stringify(payload)).buffer)
  const sigB64     = base64UrlEncode(signature)

  return `${headerB64}.${payloadB64}.${sigB64}`
}

// Verify JWT using Web Crypto API
async function verifyJwt(token: string, secret: string): Promise<object | null> {
  try {
    const [headerB64, payloadB64, sigB64] = token.split('.')
    const sigData = base64UrlDecode(sigB64)

    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const cryptoKey = await crypto.subtle.importKey(
      'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    )

    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sigData, data)
    if (!valid) return null

    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)))
    return payload
  } catch {
    return null
  }
}

// Create session - stores JWT in D1 sessions table via REST API
export async function createSession(userId: string): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)
  const sessionToken = crypto.randomUUID()

  await db.createSession(sessionToken, userId, expiresAt)

  const jwtPayload = {
    sub: userId,
    sid: sessionToken,
    exp: Math.floor(expiresAt.getTime() / 1000),
    iat: Math.floor(Date.now() / 1000),
  }

  return signJwt(jwtPayload, JWT_SECRET)
}

// Validate session from request
export async function validateSession(req: Request): Promise<{
  userId: string | null
  sessionToken: string | null
}> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )

  const token = cookies['session_token']
  if (!token) return { userId: null, sessionToken: null }

  let payload: { sub?: string; sid?: string; exp?: number } | null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload = await verifyJwt(token, JWT_SECRET) as any
  } catch {
    return { userId: null, sessionToken: null }
  }

  if (!payload || !payload.sub || !payload.exp) {
    return { userId: null, sessionToken: null }
  }

  if (Date.now() / 1000 > payload.exp) {
    return { userId: null, sessionToken: null }
  }

  return { userId: payload.sub, sessionToken: payload.sid ?? null }
}

// Delete session (logout)
export async function deleteSession(sessionToken: string): Promise<void> {
  await db.deleteSession(sessionToken)
}

// Set session cookie on response
export function setSessionCookie(response: Response, token: string): Response {
  const expires = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000)
  response.headers.set(
    'Set-Cookie',
    `session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires.toUTCString()}`
  )
  return response
}

// Clear session cookie
export function clearSessionCookie(response: Response): Response {
  response.headers.set(
    'Set-Cookie',
    'session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  )
  return response
}
