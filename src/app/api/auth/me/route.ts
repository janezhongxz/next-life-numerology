import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const runtime = 'edge'

export async function GET() {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ user: null })
  }

  return NextResponse.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
  })
}
