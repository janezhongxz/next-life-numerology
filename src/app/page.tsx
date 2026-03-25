'use client'

import { useState } from 'react'
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
  }
}

type Lang = keyof typeof I18N

export default function HomePage() {
  const router = useRouter()
  const [lang, setLang] = useState<Lang>('zh')
  const [name, setName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [queryYear, setQueryYear] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const t = I18N[lang]
  const NAME_REGEX = /^[\u4e00-\u9fa5a-zA-Z.\s]+$/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError(t.errorName)
      return
    }
    if (!NAME_REGEX.test(name.trim())) {
      setError(t.errorInvalidName)
      return
    }
    if (!birthDate) {
      setError(t.errorDate)
      return
    }

    setLoading(true)
    try {
      const result: CalculatorResult = calculate(
        birthDate,
        name.trim(),
        queryYear ? parseInt(queryYear, 10) : undefined
      )

      const birth = new Date(birthDate)
      const today = new Date()
      let age = today.getFullYear() - birth.getFullYear()
      const monthDiff = today.getMonth() - birth.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--
      }

      const data = {
        ...result,
        birthDate,
        name: name.trim(),
        age,
        lang
      }

      router.push(`/report?data=${encodeURIComponent(JSON.stringify(data))}`)
    } catch (err) {
      console.error('Calculation error:', err)
      setError(t.errorCalc)
    } finally {
      setLoading(false)
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
          <button
            onClick={toggleLang}
            className="glass px-4 py-2 rounded-full text-sm font-medium text-purple-600 hover:bg-white/50 transition"
          >
            {t.langSwitch}
          </button>
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
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                autoComplete="off"
              />
            </div>

            {/* 出生日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.birthLabel}
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
                {t.yearLabel}
              </label>
              <input
                type="number"
                value={queryYear}
                onChange={(e) => setQueryYear(e.target.value)}
                placeholder={t.yearPlaceholder}
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
                  {t.calculating}
                </>
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
        .glass {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
        }
      `}</style>
    </main>
  )
}
