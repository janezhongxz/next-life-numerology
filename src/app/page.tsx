'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { calculate, CalculatorResult } from '@/lib/calculator'

const I18N = {
  zh: {
    title: '生命数字计算器',
    subtitle: 'Life Numerology Calculator',
    nameLabel: '姓名（中文/英文/拼音）',
    namePlaceholder: '请输入您的姓名',
    birthLabel: '出生日期',
    yearLabel: '查询年份（流年）',
    yearPlaceholder: '留空则不计算流年',
    calculate: '立即计算',
    calculating: '计算中...',
    footer: 'Life Numerology',
    footerSub: 'lifenumerology.shop',
    errorName: '请输入姓名',
    errorInvalidName: '姓名只支持中文、英文、拼音和点号（.）',
    errorDate: '请选择出生日期',
    errorCalc: '计算出错，请重试',
    langSwitch: 'EN / 中文',
    questionLabel: '问题困惑（选填）',
    questionPlaceholder: '请描述您目前遇到的问题或困惑（选填，限500字）',
    loginRequired: '请先登录',
    confirmRecalc: '此操作将消耗1次计算次数，确认继续？',
    confirmBtn: '确认',
    cancelBtn: '取消',
  },
  en: {
    title: 'Life Numerology Calculator',
    subtitle: 'Numerology Report',
    nameLabel: 'Name（Chinese/English/Pinyin）',
    namePlaceholder: 'Enter your name',
    birthLabel: 'Birth Date',
    yearLabel: 'Query Year（Personal Year）',
    yearPlaceholder: 'Leave empty to skip',
    calculate: 'Calculate',
    calculating: 'Calculating...',
    footer: 'Life Numerology',
    footerSub: 'lifenumerology.shop',
    errorName: 'Please enter your name',
    errorInvalidName: 'Name only supports Chinese, English, Pinyin and dots',
    errorDate: 'Please select a valid date',
    errorCalc: 'Calculation error, please try again',
    langSwitch: '中文 / EN',
    questionLabel: 'Questions / Concerns (Optional)',
    questionPlaceholder: 'Describe your questions or concerns (optional, max 500 chars)',
    loginRequired: 'Please login first',
    confirmRecalc: 'This will consume 1 calculation credit. Confirm?',
    confirmBtn: 'Confirm',
    cancelBtn: 'Cancel',
  }
}

type Lang = keyof typeof I18N

export default function HomePage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('zh')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [queryYear, setQueryYear] = useState(new Date().getFullYear().toString())
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<{ id: string; name: string } | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pendingCalc, setPendingCalc] = useState(false)

  const t = I18N[lang]
  const NAME_REGEX = /^[\u4e00-\u9fa5a-zA-Z.\s]+$/

  // Check login status
  useEffect(() => {
    fetch('/api/auth/me')
      .then(r => r.json())
      .then(data => setUser(data.user || null))
      .catch(() => setUser(null))
  }, [])

  const handleCalc = async () => {
    if (!user) return
    setShowConfirm(true)
    setPendingCalc(true)
  }

  const confirmCalc = async () => {
    setShowConfirm(false)
    await doCalculate()
  }

  const doCalculate = async () => {
    if (!name.trim()) { setError(t.errorName); return }
    if (!NAME_REGEX.test(name.trim())) { setError(t.errorInvalidName); return }
    if (!birthDate) { setError(t.errorDate); return }

    setLoading(true)
    setError('')
    try {
      const result: CalculatorResult = calculate(birthDate, name.trim(), queryYear ? parseInt(queryYear, 10) : undefined)

      const birth = new Date(birthDate)
      const today = new Date()
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--

      const data = {
        ...result,
        birthDate,
        name: name.trim(),
        age,
        lang,
        question: question.trim()
      }

      // Call API to check credits / fingerprint
      const apiRes = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate, name: name.trim(), queryYear: queryYear ? parseInt(queryYear) : undefined, question: question.trim() })
      })

      const apiData = await apiRes.json()

      if (apiData.type === 'no_credits' || apiData.type === 'unpaid_no_credits') {
        // Redirect to dashboard for payment
        router.push('/dashboard?payment_required=1')
        return
      }

      // Proceed to report
      router.push(`/report?data=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (err) {
      console.error('Calculation error:', err)
      setError(t.errorCalc)
    } finally {
      setLoading(false)
      setPendingCalc(false)
    }
  }

  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh')

  return (
    <main>
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-white/20">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl font-bold text-gray-900">{t.title}</h1>
            <p className="text-gray-500 text-xs">{t.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleLang} className="glass px-3 py-2 rounded-full text-sm font-medium text-purple-600 hover:bg-white/50 transition">
              {t.langSwitch}
            </button>
            {user ? (
              <a href="/dashboard" className="glass px-3 py-2 rounded-full text-sm font-medium text-purple-600 hover:bg-white/50 transition">
                {user.name}
              </a>
            ) : (
              <a href="/api/auth/login?callbackUrl=/" className="glass px-3 py-2 rounded-full text-sm font-medium text-purple-600 hover:bg-white/50 transition flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                {lang === 'zh' ? '登录' : 'Login'}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 shadow-2xl mb-6">
          <form onSubmit={(e) => { e.preventDefault(); user ? handleCalc() : null }} className="space-y-5">
            {/* 姓名 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.nameLabel}</label>
              <input type="text" value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition uppercase"
                autoComplete="off" style={{ textTransform: 'uppercase' }} />
            </div>

            {/* 出生日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.birthLabel}</label>
              <input type="date" value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>

            {/* 流年年份 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.yearLabel}</label>
              <input type="number" value={queryYear}
                onChange={(e) => setQueryYear(e.target.value)}
                placeholder={t.yearPlaceholder} min="1900" max="2100"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition" />
            </div>

            {/* 问题困惑 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'zh' ? '问题困惑（选填）' : 'Questions / Concerns (Optional)'}
              </label>
              <textarea value={question}
                onChange={(e) => setQuestion(e.target.value.slice(0, 500))}
                placeholder={lang === 'zh' ? '请描述您目前遇到的问题或困惑（选填，限500字）' : 'Describe your current questions or concerns (optional, max 500 chars)'}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none" />
              <p className="text-xs text-gray-400 mt-1 text-right">{question.length}/500</p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* 提交按钮 */}
            <button type="submit" disabled={loading || !user}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2">
              {loading ? (
                <><div className="spinner" />{t.calculating}</>
              ) : !user ? (
                t.loginRequired
              ) : (
                t.calculate
              )}
            </button>
          </form>
        </div>

        {/* 底部说明 */}
        <div className="mt-6 text-center text-white/80 text-xs">
          <p>{t.footer}</p>
          <p className="mt-1 opacity-70">{t.footerSub}</p>
        </div>
      </main>

      {/* 收费确认弹窗 */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <p className="text-gray-900 font-medium mb-4 text-center">
              {t.confirmRecalc}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition">
                {t.cancelBtn}
              </button>
              <button onClick={confirmCalc}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition">
                {t.confirmBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .spinner { border: 3px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; width: 20px; height: 20px; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(8px); }
      `}</style>
    </main>
  )
}
