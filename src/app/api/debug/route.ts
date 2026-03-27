// GET /api/debug - diagnostic endpoint
import { NextResponse } from 'next/server'

export async function GET(req: Request): Promise<Response> {
  const cookieHeader = req.headers.get('cookie') ?? ''
  const cookies = Object.fromEntries(
    cookieHeader.split(';').map(c => {
      const [k, ...v] = c.trim().split('=')
      return [k, v.join('=')]
    })
  )

  const token = cookies['session_token']
  const oauthState = cookies['oauth_state']

  return NextResponse.json({
    hasSessionToken: !!token,
    sessionTokenPrefix: token ? token.substring(0, 20) + '...' : null,
    hasOauthState: !!oauthState,
    allCookies: Object.keys(cookies),
    env: {
      NODE_ENV: process.env.NODE_ENV,
    }
  })
}
