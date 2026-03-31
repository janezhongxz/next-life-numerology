// Debug endpoint to check environment variables
export const runtime = 'edge'

export async function GET() {
  return Response.json({
    hasAuthSecret: !!(process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET),
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    googleClientIdPrefix: process.env.GOOGLE_CLIENT_ID?.substring(0, 15) ?? 'MISSING',
    authSecretLength: (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)?.length ?? 0,
  })
}
