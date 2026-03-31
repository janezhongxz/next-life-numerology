// Edge-compatible JWT using Web Crypto API
const SECRET = (process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? '7a9f2e8b4c1d6e3a5f8b2c9d4e7a1b6c3f5e8a2d9c4b7e1a6f3c8b5d2e9a4c7b').trim()

function b64url(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf)
  let bin = ''
  bytes.forEach(b => bin += String.fromCharCode(b))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function b64urlDecode(str: string): ArrayBuffer {
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  while (str.length % 4) str += '='
  const bin = atob(str)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes.buffer
}

async function getKey(secret: string) {
  return crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']
  )
}

export async function signJwt(payload: Record<string, unknown>, expiresInSeconds = 30 * 24 * 3600): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const fullPayload = { ...payload, iat: now, exp: now + expiresInSeconds }
  const header = b64url(new TextEncoder().encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).buffer)
  const body = b64url(new TextEncoder().encode(JSON.stringify(fullPayload)).buffer)
  const key = await getKey(SECRET)
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${header}.${body}`))
  return `${header}.${body}.${b64url(sig)}`
}

export async function verifyJwt(token: string): Promise<Record<string, unknown> | null> {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, body, sig] = parts
    const key = await getKey(SECRET)
    const valid = await crypto.subtle.verify('HMAC', key, b64urlDecode(sig), new TextEncoder().encode(`${header}.${body}`))
    if (!valid) return null
    const payload = JSON.parse(new TextDecoder().decode(b64urlDecode(body)))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch { return null }
}
