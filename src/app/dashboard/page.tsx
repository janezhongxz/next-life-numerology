'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        console.error('Dashboard /api/auth/me response:', JSON.stringify(data))
        setUser(data.user)
        setLoading(false)
      })
      .catch((e: Error) => {
        console.error('Dashboard /api/auth/me error:', e)
        setError(String(e))
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>
  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Not logged in</h1>
        <p className="text-red-500 mb-4">User is null - redirecting to home...</p>
        <p className="text-xs text-gray-500">If you see this, /api/auth/me returned user: null</p>
        <Link href="/" className="text-blue-500 underline">Go home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-2">Welcome, {user.name}!</p>
      <p className="text-sm text-gray-500 mb-4">Email: {user.email}</p>
      <Link href="/api/auth/logout" className="text-red-500 underline">Logout</Link>
    </div>
  )
}
