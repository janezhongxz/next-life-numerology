// Debug endpoint - check environment variables
export async function GET() {
  return Response.json({
    GOOGLE_CLIENT_ID     : process.env.GOOGLE_CLIENT_ID ?? 'UNDEFINED',
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET ?? 'UNDEFINED',
    NEXTAUTH_URL         : process.env.NEXTAUTH_URL ?? 'UNDEFINED',
    JWT_SECRET           : process.env.JWT_SECRET ? '***' : 'UNDEFINED',
    NODE_ENV             : process.env.NODE_ENV ?? 'UNDEFINED',
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXT_PUBLIC_NEXTAUTH_URL ?? 'UNDEFINED',
  })
}
