// Auth library - Google OAuth + D1 session management
// Edge-runtime compatible: no Node.js dependencies

import { getDb } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getGoogleAuthUrl, exchangeCodeForTokens, getGoogleUserInfo } from './google'
import { createSession, deleteSession, setSessionCookie, clearSessionCookie, validateSession } from './session'

export { getGoogleAuthUrl, validateSession, setSessionCookie, clearSessionCookie }

// Find or create user by Google ID
export async function findOrCreateUser(googleId: string, email: string, name: string, avatar: string) {
  const db = getDb()

  const existing = await db.select().from(users).where(eq(users.googleId, googleId)).limit(1)

  if (existing[0]) {
    if (existing[0].name !== name || existing[0].image !== avatar) {
      await db.update(users)
        .set({ name, image: avatar, updatedAt: new Date() })
        .where(eq(users.id, existing[0].id))
    }
    return existing[0]
  }

  const newUser = {
    id       : crypto.randomUUID(),
    googleId ,
    email    ,
    name     ,
    image    : avatar,
    createdAt: new Date(),
  }

  await db.insert(users).values(newUser)
  return newUser
}

// Complete Google OAuth flow: code → tokens → user → session
export async function handleGoogleCallback(code: string): Promise<{
  userId: string
  token: string
}> {
  const tokens = await exchangeCodeForTokens(code)
  const googleUser = await getGoogleUserInfo(tokens.access_token)
  const user = await findOrCreateUser(
    googleUser.id,
    googleUser.email,
    googleUser.name,
    googleUser.picture
  )
  const token = await createSession(user.id)
  return { userId: user.id, token }
}

// Get current logged-in user
export async function getAuthUser(req: Request) {
  const db = getDb()
  const { userId } = await validateSession(req)
  if (!userId) return null

  const result = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  return result[0] ?? null
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
