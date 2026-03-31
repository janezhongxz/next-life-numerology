// GET /api/auth/login — redirect to Google OAuth
export const runtime = 'edge'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const callbackUrl = url.searchParams.get('callbackUrl') ?? '/'
  const clientId = process.env.GOOGLE_CLIENT_ID!
  const redirectUri = 'https://lifenumerology.shop/api/auth/callback/google'
  const state = btoa(JSON.stringify({ callbackUrl, ts: Date.now() }))

  const googleUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  googleUrl.searchParams.set('client_id', clientId)
  googleUrl.searchParams.set('redirect_uri', redirectUri)
  googleUrl.searchParams.set('response_type', 'code')
  googleUrl.searchParams.set('scope', 'openid email profile')
  googleUrl.searchParams.set('state', state)
  googleUrl.searchParams.set('access_type', 'offline')
  googleUrl.searchParams.set('prompt', 'select_account')

  return Response.redirect(googleUrl.toString(), 302)
}
