// GET /api/auth/callback/google - handles Google OAuth callback
import { handleGoogleCallback } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  console.error('Callback START', { error, hasCode: !!code, state: state ? state.substring(0, 10) : null })

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

  // Verify state (CSRF protection)
  const cookies = Object.fromEntries(
    (req.headers.get('cookie') ?? '').split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )
  const savedState = cookies['oauth_state']
  console.error('Callback: state check', { hasSavedState: !!savedState, stateMatch: state && savedState ? state === savedState : null })
  if (state && savedState && state !== savedState) {
    console.error('OAuth state mismatch')
    return new Response(null, {
      status : 302,
      headers: { Location: '/?error=state_mismatch' },
    })
  }

  try {
    console.error('Callback: calling handleGoogleCallback with code prefix:', code.substring(0, 10))
    const { token } = await handleGoogleCallback(code)
    console.error('Callback: success! token prefix:', token.substring(0, 20))

    const response = NextResponse.redirect(new URL('/dashboard', req.url))
    response.cookies.set('session_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      secure: true,
    })
    console.error('Callback: cookie set, redirecting to /dashboard')
    return response
  } catch (e) {
    console.error('Callback CATCH:', e instanceof Error ? `${e.message}\n${e.stack}` : String(e))
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=auth_failed&detail=${encodeURIComponent(msg.slice(0, 100))}` },
    })
  }
}
