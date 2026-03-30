import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Adapter, AdapterUser } from "next-auth/adapters"
import { db } from "@/db"

// Custom adapter for D1 REST API
const D1Adapter: Adapter = {
  async createUser(user): Promise<AdapterUser> {
    const id = crypto.randomUUID()
    // googleId is unknown at this stage — linkAccount sets it later
    await db.createUser({
      id,
      googleId: null,
      name: user.name ?? null,
      email: user.email,
      image: user.image ?? null,
    })
    return { id, name: user.name ?? null, email: user.email, emailVerified: null, image: user.image ?? null }
  },

  async getUser(id): Promise<AdapterUser | null> {
    const user = await db.getUserById(id)
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email ?? '',
      emailVerified: user.emailVerified,
      image: user.image,
    }
  },

  async getUserByEmail(email): Promise<AdapterUser | null> {
    const user = await db.getUserByEmail(email)
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email ?? '',
      emailVerified: user.emailVerified,
      image: user.image,
    }
  },

  async getUserByAccount({ provider, providerAccountId }): Promise<AdapterUser | null> {
    if (provider === 'google') {
      const user = await db.getUserByGoogleId(providerAccountId)
      if (!user) return null
      return {
        id: user.id,
        name: user.name,
        email: user.email ?? '',
        emailVerified: user.emailVerified,
        image: user.image,
      }
    }
    return null
  },

  async updateUser(user): Promise<AdapterUser> {
    await db.updateUser(user.id, {
      name: user.name ?? null,
      email: user.email,
      image: user.image ?? null,
    })
    return user as AdapterUser
  },

  async linkAccount(account) {
    // Store the real Google providerAccountId as googleId
    if (account.provider === 'google') {
      await db.updateUser(account.userId, { googleId: account.providerAccountId })
    }
    return account as any
  },

  // Session methods — using JWT strategy, these are no-ops
  async createSession(session) { return session as any },
  async getSessionAndUser(_sessionToken) { return null },
  async updateSession(session) { return session as any },
  async deleteSession(_sessionToken) { return },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: D1Adapter,
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || '7a9f2e8b4c1d6e3a5f8b2c9d4e7a1b6c3f5e8a2d9c4b7e1a6f3c8b5d2e9a4c7b',
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.id) {
        token.id = user.id
      }
      if (account?.provider === 'google') {
        token.googleId = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
})
