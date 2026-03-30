import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    async signIn({ user, account }) {
      // Only handle Google sign in
      if (account?.provider !== 'google') return false
      if (!user.email) return false

      try {
        const googleId = account.providerAccountId

        // Check if user already exists by googleId
        let dbUser = await db.getUserByGoogleId(googleId)

        if (!dbUser) {
          // Check by email (account may exist without googleId linked)
          dbUser = await db.getUserByEmail(user.email)
        }

        if (!dbUser) {
          // Create new user
          const id = crypto.randomUUID()
          dbUser = await db.createUser({
            id,
            googleId,
            name: user.name ?? null,
            email: user.email,
            image: user.image ?? null,
          })
        } else if (!dbUser.googleId) {
          // Link googleId to existing email-based account
          await db.updateUser(dbUser.id, { googleId })
        }

        // Attach db user id so jwt callback can use it
        user.id = dbUser.id
        return true
      } catch (err) {
        console.error('[signIn callback]', err)
        return false
      }
    },

    async jwt({ token, user, account }) {
      // First sign in: user object is populated
      if (user?.id) {
        token.id = user.id
      }
      if (account?.providerAccountId) {
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
