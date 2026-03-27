// Google OAuth 2.0 configuration and helpers
// No external auth library needed - works with Cloudflare Pages edge runtime

// Trim whitespace from env vars (Cloudflare sometimes injects whitespace)
const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID ?? '').trim()
const GOOGLE_CLIENT_SECRET = (process.env.GOOGLE_CLIENT_SECRET ?? '').trim()

export const GOOGLE_CONFIG = {
  clientId     : GOOGLE_CLIENT_ID,
  clientSecret : GOOGLE_CLIENT_SECRET,
  redirectUri  : `https://lifenumerology.shop/api/auth/callback/google`,
}

// Step 1: Generate Google OAuth URL
export function getGoogleAuthUrl(state?: string): string {
  const params = new URLSearchParams({
    client_id    : GOOGLE_CONFIG.clientId,
    redirect_uri : GOOGLE_CONFIG.redirectUri,
    response_type: 'code',
    scope        : 'openid email profile',
    access_type  : 'offline',
    prompt       : 'consent',
    ...(state && { state }),
  })
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`
}

// Step 2: Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string
  id_token   : string
  refresh_token?: string
  expires_in : number
}> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method : 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body   : new URLSearchParams({
      client_id    : GOOGLE_CONFIG.clientId,
      client_secret: GOOGLE_CONFIG.clientSecret,
      code,
      grant_type   : 'authorization_code',
      redirect_uri : GOOGLE_CONFIG.redirectUri,
    }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Token exchange failed: ${res.status} - ${text}`)
  }

  return res.json()
}

// Step 3: Get user info from Google
export async function getGoogleUserInfo(accessToken: string): Promise<{
  id    : string
  email : string
  name  : string
  picture: string
}> {
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    throw new Error(`Failed to get user info: ${res.status}`)
  }

  return res.json()
}
