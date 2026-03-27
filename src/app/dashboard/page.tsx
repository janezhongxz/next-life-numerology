'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface HistoryItem {
  id: string
  name: string
  birthdate: string
  lifeNumber: number
  question: string | null
  queryYear: number | null
  isPaid: number
  createdAt: number
  fingerprint: string
}

interface User {
  name: string
  email: string
  image: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [credits, setCredits] = useState({ used: 0, remaining: 1 })
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'pricing'>('home')

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/me').then(r => r.json()),
      fetch('/api/user/credits').then(r => r.json()),
      fetch('/api/user/history').then(r => r.json()),
    ]).then(([userData, creditsData, historyData]) => {
      if (!userData.user) {
        router.push('/')
        return
      }
      setUser(userData.user)
      setCredits(creditsData)
      setHistory(historyData.history || [])
      setLoading(false)
    }).catch(() => {
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

  const formatDate = (ts: number) => {
    return new Date(ts).toLocaleDateString('zh-CN', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-xs">生命数字</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-purple-700 font-medium">
              {credits.remaining > 0 ? `剩余 ${credits.remaining} 次免费` : '免费次数已用尽'}
            </span>
            <a href="/api/auth/logout" className="glass px-3 py-1.5 rounded-full text-sm font-medium text-red-600 hover:bg-white/50 transition">
              退出
            </a>
          </div>
        </div>
        {/* Tab Nav */}
        <div className="max-w-lg mx-auto px-4 pb-2 flex gap-4">
          {(['home', 'history', 'pricing'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-1 text-sm font-medium border-b-2 transition ${activeTab === tab ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500'}`}>
              {tab === 'home' ? '首页' : tab === 'history' ? '历史报告' : '定价'}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl text-center space-y-4">
            {user?.image && (
              <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
            )}
            <h2 className="text-2xl font-bold text-gray-900">{user?.name ?? 'Welcome!'}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>

            {credits.remaining > 0 ? (
              <div className="bg-green-50 rounded-xl p-4 text-sm">
                <p className="text-green-700 font-medium">🎁 您还有 {credits.remaining} 次免费生成机会</p>
              </div>
            ) : (
              <div className="bg-amber-50 rounded-xl p-4 text-sm">
                <p className="text-amber-700 font-medium">⚠️ 免费次数已用尽，请选择付费方案</p>
              </div>
            )}

            <a href="/" className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition text-center">
              生成新的生命数字报告
            </a>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">报告历史</h3>
            {history.length === 0 ? (
              <div className="bg-white/90 rounded-3xl p-6 shadow-2xl text-center text-gray-500">
                暂无报告记录
              </div>
            ) : (
              history.map(item => (
                <div key={item.id} className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item.isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.isPaid ? '已付费' : '免费'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">生命数字：{item.lifeNumber}</p>
                  {item.question && <p className="text-xs text-gray-400 mb-2">问题：{item.question.slice(0, 50)}...</p>}
                  <div className="flex gap-2 mt-2">
                    <a href={`/?recalc=${item.fingerprint}`}
                      className="flex-1 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg text-center hover:bg-purple-200 transition">
                      重新生成
                    </a>
                    <a href={`/report?id=${item.id}`}
                      className="flex-1 py-2 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg text-center hover:bg-indigo-200 transition">
                      查看报告
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white mb-2">定价方案</h3>
            <div className="bg-white/90 rounded-3xl p-6 shadow-2xl">
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">首测免费</span>
                <p className="text-sm text-gray-500 mt-1">注册即送1次完整报告</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <span className="text-2xl">💎</span>
                  <div>
                    <p className="font-semibold text-gray-900">单次解锁</p>
                    <p className="text-sm text-gray-500">$1.99 / 次</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <p className="font-semibold text-gray-900">5次大包</p>
                    <p className="text-sm text-gray-500">$8.88 / 5次，平均$1.78/次</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">支付方式即将支持 PayPal</p>
            </div>
          </div>
        )}
      </main>

      <style jsx>{`
        .glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); }
      `}</style>
    </div>
  )
}
