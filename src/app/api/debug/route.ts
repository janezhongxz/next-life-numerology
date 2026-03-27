// GET /api/debug - minimal diagnostic
import { NextResponse } from 'next/server'

// Same decode logic as session.ts
function base64UrlDecode(str: string): ArrayBuffer {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) { bytes[i] = binary.charCodeAt(i) }
  return bytes.buffer
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

// Inline minimal verifyJwt for diagnosis
async function verifyJwtTest(token: string, secret: string) {
  try {
    const [headerB64, payloadB64, sigB64] = token.split('.')
    if (!headerB64 || !payloadB64 || !sigB64) return { error: 'malformed token - missing parts' }
    
    const sigData = base64UrlDecode(sigB64)
    const encoder = new TextEncoder()
    const keyData = encoder.encode(secret)
    const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    const data = encoder.encode(`${headerB64}.${payloadB64}`)
    const valid = await crypto.subtle.verify('HMAC', cryptoKey, sigData, data)
    
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)))
    return { valid, payload }
  } catch (e) {
    return { error: String(e) }
  }
}

const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim() || 'fallback-secret-change-in-production'

export async function GET(req: Request): Promise<Response> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = parseCookies(cookieHeader)
  const token = cookies['session_token']
  
  let verifyResult = null
  if (token) {
    verifyResult = await verifyJwtTest(token, JWT_SECRET)
  }
  
  return NextResponse.json({
    hasToken: !!token,
    tokenPrefix: token ? token.substring(0, 20) + '...' : null,
    jwtSecretLength: JWT_SECRET.length,
    jwtSecretPrefix: JWT_SECRET.substring(0, 8) + '...',
    verifyResult,
    cookiesFound: Object.keys(cookies),
  })
}
