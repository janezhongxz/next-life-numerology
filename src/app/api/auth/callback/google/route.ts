// GET /api/auth/callback/google - handles Google OAuth callback
import { handleGoogleCallback, setSessionCookie } from '@/lib/auth'

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
    console.error('OAuth callback: starting handleGoogleCallback, code prefix:', code.substring(0, 10))
    const { token } = await handleGoogleCallback(code)
    console.error('OAuth callback: success, token created')

    const response = new Response(null, {
      status : 302,
      headers: { Location: '/dashboard' },
    })

    return setSessionCookie(response, token)
  } catch (e) {
    console.error('OAuth callback error:', e)
    const msg = e instanceof Error ? e.message : String(e)
    return new Response(null, {
      status : 302,
      headers: { Location: `/?error=auth_failed&detail=${encodeURIComponent(msg.slice(0, 100))}` },
    })
  }
}
