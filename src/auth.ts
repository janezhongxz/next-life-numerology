import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters"
import { db } from "@/db"

// Custom adapter for D1 REST API
const D1Adapter: Adapter = {
  async createUser(user) {
    const id = crypto.randomUUID()
    await db.createUser({
      id,
      googleId: user.email || '',
      name: user.name,
      email: user.email,
      image: user.image,
    })
    return { ...user, id, emailVerified: null }
  },
  
  async getUser(id) {
    const user = await db.getUserById(id)
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email || '',
      emailVerified: user.emailVerified,
      image: user.image,
    }
  },
  
  async getUserByEmail(email) {
    const user = await db.getUserByEmail(email)
    if (!user) return null
    return {
      id: user.id,
      name: user.name,
      email: user.email || '',
      emailVerified: user.emailVerified,
      image: user.image,
    }
  },
  
  async getUserByAccount({ provider, providerAccountId }) {
    if (provider === 'google') {
      const user = await db.getUserByGoogleId(providerAccountId)
      if (!user) return null
      return {
        id: user.id,
        name: user.name,
        email: user.email || '',
        emailVerified: user.emailVerified,
        image: user.image,
      }
    }
    return null
  },
  
  async updateUser(user) {
    await db.updateUser(user.id, {
      name: user.name,
      email: user.email,
      image: user.image,
    })
    return user as any
  },
  
  async linkAccount(account) {
    // Store googleId in users table
    if (account.provider === 'google') {
      await db.updateUser(account.userId, { googleId: account.providerAccountId })
    }
    return account as any
  },
  
  async createSession(session) {
    return session as any
  },
  
  async getSessionAndUser(sessionToken) {
    return null
  },
  
  async updateSession(session) {
    return session as any
  },
  
  async deleteSession(sessionToken) {
    return
  },
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: D1Adapter,
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
      if (user) {
        token.id = user.id
      }
      if (account?.provider === 'google') {
        token.googleId = account.providerAccountId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
})
