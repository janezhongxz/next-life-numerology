// GET /api/auth/callback/google - handles Google OAuth callback
import { handleGoogleCallback } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  console.error('Callback START', { error, hasCode: !!code })

  if (error) {
    console.error('Callback: Google error', error)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=${encodeURIComponent(error)}` },
    })
  }

  if (!code) {
    console.error('Callback: missing code')
    return new Response('Missing code', { status: 400 })
  }

  try {
    const { userId, token } = await handleGoogleCallback(code)
    console.error('Callback SUCCESS: userId=', userId, 'token prefix=', token.substring(0, 20))

    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    response.headers.set(
      'Set-Cookie',
      `session_token=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${expires.toUTCString()}`
    )
    console.error('Callback: cookie set successfully, redirecting to /dashboard')
    return response
  } catch (e) {
    console.error('Callback CATCH:', e instanceof Error ? `${e.message}` : String(e))
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=auth_failed&detail=${encodeURIComponent(msg.slice(0, 100))}` },
    })
  }
}
