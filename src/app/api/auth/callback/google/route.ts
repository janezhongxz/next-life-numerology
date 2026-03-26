// GET /api/auth/callback/google - handles Google OAuth callback
import { handleGoogleCallback, setSessionCookie } from '@/lib/auth'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
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
    return new Response('Invalid state', { status: 400 })
  }

  try {
    const { token } = await handleGoogleCallback(code)

    const response = new Response(null, {
      status : 302,
      headers: { Location: '/dashboard' },
    })

    return setSessionCookie(response, token)
  } catch (e) {
    console.error('OAuth callback error:', e)
    return new Response(null, {
      status : 302,
      headers: { Location: '/?error=auth_failed' },
    })
  }
}
