// GET /api/auth/callback/google
import { db } from '@/db'
import { signJwt } from '@/lib/jwt'

export const runtime = 'edge'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
    return Response.redirect('https://lifenumerology.shop/?auth_error=' + encodeURIComponent(error), 302)
  }
  if (!code) {
    return Response.redirect('https://lifenumerology.shop/?auth_error=no_code', 302)
  }

  let callbackUrl = '/'
  try {
    if (state) callbackUrl = JSON.parse(atob(state)).callbackUrl ?? '/'
  } catch {}

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: 'https://lifenumerology.shop/api/auth/callback/google',
        grant_type: 'authorization_code',
      }),
    })
    if (!tokenRes.ok) {
      return Response.redirect('https://lifenumerology.shop/?auth_error=token_exchange', 302)
    }
    const { access_token } = await tokenRes.json() as { access_token: string }

    const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    })
    const gu = await userInfoRes.json() as { sub: string; email: string; name: string; picture: string }
    if (!gu.email) return Response.redirect('https://lifenumerology.shop/?auth_error=no_email', 302)

    let dbUser = await db.getUserByGoogleId(gu.sub)
    if (!dbUser) dbUser = await db.getUserByEmail(gu.email)
    if (!dbUser) {
      dbUser = await db.createUser({ id: crypto.randomUUID(), googleId: gu.sub, name: gu.name ?? null, email: gu.email, image: gu.picture ?? null })
    } else if (!dbUser.googleId) {
      await db.updateUser(dbUser.id, { googleId: gu.sub })
    }

    const jwt = await signJwt({ sub: dbUser.id, email: dbUser.email, name: dbUser.name, image: dbUser.image })
    const headers = new Headers()
    headers.set('Location', `https://lifenumerology.shop${callbackUrl}`)
    headers.append('Set-Cookie', `session_token=${jwt}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${30 * 24 * 3600}`)
    return new Response(null, { status: 302, headers })

  } catch (err: any) {
    console.error('[google callback] ERROR:', err?.message)
    return Response.redirect('https://lifenumerology.shop/?auth_error=server_error', 302)
  }
}
