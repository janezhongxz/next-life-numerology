import { NextResponse } from 'next/server'

const JWT_SECRET = (process.env.JWT_SECRET ?? '').trim() || 'fallback-secret-change-in-production'

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
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

async function sign(payload: object, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const header = { alg: 'HS256', typ: 'JWT' }
  const h = base64UrlEncode(encoder.encode(JSON.stringify(header)).buffer)
  const p = base64UrlEncode(encoder.encode(JSON.stringify(payload)).buffer)
  const encoder2 = new TextEncoder()
  const signature = await crypto.subtle.sign('HMAC', key, encoder2.encode(`${h}.${p}`))
  const s = base64UrlEncode(signature)
  return `${h}.${p}.${s}`
}

async function verify(token: string, secret: string): Promise<object | null> {
  try {
    const [h, p, s] = token.split('.')
    const encoder = new TextEncoder()
    const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
    const valid = await crypto.subtle.verify('HMAC', key, base64UrlDecode(s), encoder.encode(`${h}.${p}`))
    if (!valid) return null
    return JSON.parse(new TextDecoder().decode(base64UrlDecode(p)))
  } catch { return null }
}

export async function GET(req: Request) {
  const testPayload = { sub: 'test-user' }
  const token = await sign(testPayload, JWT_SECRET)
  const result = await verify(token, JWT_SECRET)

  const cookies = Object.fromEntries(
    (req.headers.get('cookie') ?? '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k.trim(), v.join('=')]
    })
  )
  const sessionToken = cookies['session_token']
  const cookieResult = sessionToken ? await verify(sessionToken, JWT_SECRET) : 'no cookie'

  return NextResponse.json({
    secretPrefix: JWT_SECRET.substring(0, 10),
    selfSignVerify: result ? 'OK' : 'FAIL',
    cookieVerify: cookieResult ? 'OK' : 'FAIL',
    cookiePayload: cookieResult,
  })
}
