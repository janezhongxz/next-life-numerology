'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface UserInfo {
  id: string
  name: string | null
  email: string | null
  image: string | null
}

interface HistoryItem {
  id: string
  name: string
  birthdate: string
  lifeNumber: number
  question: string | null
  queryYear: number | null
  isPaid: number
  createdAt: string
  fingerprint: string | null
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [credits, setCredits] = useState<{ freeCreditsUsed: number; freeCreditsRemaining: number } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()),
      fetch('/api/user/history').then(r => r.json()),
      fetch('/api/user/credits').then(r => r.json()),
    ]).then(([meData, histData, credData]) => {
      if (!meData.user) {
        router.push('/')
        return
      }
      setUser(meData.user)
      setHistory(histData.history || [])
      setCredits(credData)
    }).catch(console.error).finally(() => setLoading(false))
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/signout', { method: 'POST' }).catch(() => {})
    router.push('/api/auth/signout')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-purple-600 text-lg">加载中...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <main className="max-w-lg mx-auto px-4 py-6">
      {/* 顶部导航 */}
      <header className="flex items-center justify-between mb-6">
        <Link href="/" className="text-purple-600 text-sm flex items-center gap-1 hover:opacity-70 transition">
          ← 返回计算器
        </Link>
        <a
          href="/api/auth/signout"
          className="text-sm text-gray-500 hover:text-red-500 transition"
        >
          退出登录
        </a>
      </header>

      {/* 用户信息卡 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl mb-6">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img src={user.image} alt={user.name || ''} className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-200" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              {(user.name || user.email || '?')[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user.name || '用户'}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* 免费次数卡 */}
      {credits && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-5 shadow-xl mb-6 text-white">
          <p className="text-sm opacity-80 mb-1">免费计算次数</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold">{credits.freeCreditsRemaining}</span>
            <span className="text-sm opacity-70 mb-1">/ 1 次剩余</span>
          </div>
          {credits.freeCreditsRemaining === 0 && (
            <p className="text-xs mt-2 opacity-80">免费次数已用完，后续计算需付费</p>
          )}
        </div>
      )}

      {/* 历史报告 */}
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-900 mb-4">历史报告</h2>
        {history.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>暂无历史记录</p>
            <Link href="/" className="mt-3 inline-block text-purple-600 text-sm hover:underline">
              去计算第一份报告 →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div key={item.id} className="border border-gray-100 rounded-2xl p-4 hover:border-purple-200 hover:bg-purple-50/50 transition">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      生日：{item.birthdate}
                      {item.queryYear && <span className="ml-2">流年：{item.queryYear}</span>}
                    </p>
                    {item.question && (
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">问：{item.question}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-3 flex-shrink-0">
                    <span className="text-2xl font-bold text-purple-600">{item.lifeNumber}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {item.isPaid ? '已付费' : '免费'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-300 mt-2">
                  {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
