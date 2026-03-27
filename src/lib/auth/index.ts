// Auth library - Google OAuth + D1 session management
// Edge-runtime compatible: uses D1 REST API (no binding issues)
import { db } from '@/db'
import { getGoogleAuthUrl, exchangeCodeForTokens, getGoogleUserInfo } from './google'
import { createSession, deleteSession, setSessionCookie, clearSessionCookie, validateSession } from './session'

export { getGoogleAuthUrl, validateSession, setSessionCookie, clearSessionCookie }

// Find or create user by Google ID
export async function findOrCreateUser(googleId: string, email: string, name: string, avatar: string) {
  const existing = await db.getUserByGoogleId(googleId)
  if (existing) {
    if (existing.name !== name || existing.image !== avatar) {
      await db.updateUser(existing.id, { name, image: avatar })
    }
    return existing
  }

  const newUser = {
    id       : crypto.randomUUID(),
    googleId,
    email,
    name,
    image: avatar,
  }

  return await db.createUser(newUser)
}

// Complete Google OAuth flow: code → tokens → user → session
export async function handleGoogleCallback(code: string): Promise<{
  userId: string
  token: string
}> {
  const tokens = await exchangeCodeForTokens(code)
  if (!tokens?.access_token) {
    throw new Error(`Token exchange returned no access_token: ${JSON.stringify(tokens)}`)
  }
  const googleUser = await getGoogleUserInfo(tokens.access_token)
  if (!googleUser?.id) {
    throw new Error(`Google userinfo missing id: ${JSON.stringify(googleUser)}`)
  }
  const user = await findOrCreateUser(
    googleUser.id,
    googleUser.email ?? '',
    googleUser.name ?? '',
    googleUser.picture ?? '',
  )
  const token = await createSession(user.id)
  return { userId: user.id, token }
}

// Get current logged-in user
export async function getAuthUser(req: Request) {
  const { userId } = await validateSession(req)
  if (!userId) return null
  return await db.getUserById(userId)
}

// Logout
export async function logout(req: Request): Promise<Response> {
  const { sessionToken } = await validateSession(req)
  if (sessionToken) {
    await deleteSession(sessionToken)
  }
  return new Response(null, {
    status : 302,
    headers: { Location: '/' },
  })
}
