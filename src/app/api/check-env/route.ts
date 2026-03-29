// Debug endpoint to check JWT_SECRET
export async function GET() {
  const secret = process.env.JWT_SECRET
  return Response.json({
    hasSecret: !!secret,
    secretLength: secret?.length ?? 0,
    secretPrefix: secret?.substring(0, 10) ?? 'undefined',
  })
}
