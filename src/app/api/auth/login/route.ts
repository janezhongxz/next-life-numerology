// GET /api/auth/login/google - redirect to Google OAuth
import { getGoogleAuthUrl } from '@/lib/auth'

export async function GET(): Promise<Response> {
  const state = crypto.randomUUID()
  const authUrl = getGoogleAuthUrl(state)

  return new Response(null, {
    status : 302,
    headers: {
      Location : authUrl,
      'Set-Cookie': `oauth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=600`,
    },
  })
}
