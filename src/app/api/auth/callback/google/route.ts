// GET /api/auth/callback/google - handles Google OAuth callback
import { handleGoogleCallback, setSessionCookie } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
    console.error('OAuth error from Google:', error)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=${encodeURIComponent(error)}` },
    })
  }

  if (!code) {
    return new Response('Missing code', { status: 400 })
  }

  // Verify state (CSRF protection)
  const cookies = Object.fromEntries(
    (req.headers.get('cookie') ?? '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  const savedState = cookies['oauth_state']
  if (state && savedState && state !== savedState) {
    console.error('OAuth state mismatch')
    return new Response(null, {
      status : 302,
      headers: { Location: '/?error=state_mismatch' },
    })
  }

  try {
    const { token } = await handleGoogleCallback(code)
    console.error('OAuth callback: success, token prefix:', token.substring(0, 20))

    // Log the cookie that will be set
    const testPayload = token.split('.')[1]
    console.error('OAuth callback: token payload (base64):', testPayload)

    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    response.cookies.set('session_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
    return response
  } catch (e) {
    console.error('OAuth callback error:', e)
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=auth_failed&detail=${encodeURIComponent(msg.slice(0, 100))}` },
    })
  }
}
