// GET /api/auth/logout
export const runtime = 'edge'

export async function GET(): Promise<Response> {
  const headers = new Headers()
  headers.set('Location', 'https://lifenumerology.shop/')
  headers.append('Set-Cookie', `session_token=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`)
  return new Response(null, { status: 302, headers })
}
