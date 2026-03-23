'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { calculate, CalculatorResult } from '@/lib/calculator'

// 姓名正则：中文/英文/拼音，可有.
const NAME_REGEX = /^[\u4e00-\u9fa5a-zA-Z.\s]+$/

export default function HomePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [queryYear, setQueryYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('请输入姓名')
      return
    }
    if (!NAME_REGEX.test(name.trim())) {
      setError('姓名只支持中文、英文、拼音和点号（.）')
      return
    }
    if (!birthDate) {
      setError('请选择出生日期')
      return
    }

    setLoading(true)
    try {
      const result: CalculatorResult = calculate(
        birthDate,
        name.trim(),
        queryYear ? parseInt(queryYear, 10) : undefined
      )

      // 计算年龄
      const birth = new Date(birthDate)
      const today = new Date()
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }

      // 通过URL参数传递数据到报告页
      const data = {
        ...result,
        birthDate,
        name: name.trim(),
        age
      }

      router.push(`/report?data=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (err) {
      console.error('计算错误:', err)
      setError('计算出错，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20">
        <div className="max-w-lg mx-auto px-4 py-3">
          <h1 className="font-display text-xl font-bold text-gray-900">生命数字计算器</h1>
          <p className="text-gray-500 text-xs">Life Numerology Calculator</p>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 py-8">
        {/* 表单卡片 */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl mb-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 姓名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                姓名（中文/英文/拼音）
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的姓名"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                autoComplete="off"
              />
            </div>

            {/* 出生日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                出生日期
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {/* 流年年份 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                查询年份（流年）
              </label>
              <input
                type="number"
                value={queryYear}
                onChange={(e) => setQueryYear(e.target.value)}
                placeholder="留空则不计算流年"
                min="1900"
                max="2100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>

            {/* 错误提示 */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="spinner" />
                  计算中...
                </>
              ) : (
                '立即计算'
              )}
            </button>
          </form>
        </div>

        {/* 底部说明 */}
        <div className="mt-6 text-center text-white/80 text-xs">
          <p>Life Numerology</p>
          <p className="mt-1 opacity-70">lifenumerology.shop</p>
        </div>
      </main>

      <style jsx>{`
        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}
