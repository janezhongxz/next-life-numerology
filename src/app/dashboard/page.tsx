'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; image: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => {
        if (!data.user) {
          router.push('/')
          return
        }
        setUser(data.user)
        setLoading(false)
      })
      .catch(() => {
        router.push('/')
      })
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex items-center justify-center">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl text-center">
          <p className="text-lg text-purple-700">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-xs">生命数字</p>
          </div>
          <a
            href="/api/auth/logout"
            className="glass px-4 py-2 rounded-full text-sm font-medium text-red-600 hover:bg-white/50 transition"
          >
            退出登录
          </a>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl text-center">
          {user?.image && (
            <img
              src={user.image}
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
          )}
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            {user?.name ?? 'Welcome!'}
          </h2>
          <p className="text-gray-500 text-sm mb-6">{user?.email}</p>

          <div className="space-y-3">
            <a
              href="/"
              className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition text-center"
            >
              生成新的生命数字报告
            </a>
          </div>
        </div>
      </main>

      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
        }
      `}</style>
    </div>
  )
}
