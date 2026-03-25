'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CalculatorResult } from '@/lib/calculator'
import { buildReportPrompt, getAgeGroup, getYearTheme } from '@/lib/report-prompt'

interface ReportData extends CalculatorResult {
  birthDate: string
  name: string
  age: number
  question?: string
}

function ReportContent() {
  const searchParams = useSearchParams()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [reportContent, setReportContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('正在加载数据...')
  const [apiKey, setApiKey] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('deepseek')

  useEffect(() => {
    // 从 localStorage 加载设置
    const savedKey = localStorage.getItem('api_key') || 'sk-570adfb7923a4248b65fcafa9a26d520'
    const savedProvider = localStorage.getItem('api_provider') || 'deepseek'
    setApiKey(savedKey)
    setSelectedProvider(savedProvider)

    // 解析URL数据
    const dataStr = searchParams.get('data')
    if (!dataStr) {
      setLoading(false)
      return
    }

    try {
      const data = JSON.parse(decodeURIComponent(dataStr))
      setReportData(data)
    } catch (e) {
      console.error('数据解析错误', e)
      setLoading(false)
    }
  }, [searchParams])

  useEffect(() => {
    if (!reportData) return

    const generateReport = async () => {
      setLoadingText('正在构建报告框架...')

      try {
        const prompt = buildReportPrompt({
          birthDate: reportData.birthDate,
          lifePath: reportData.lifePath,
          attitude: reportData.attitude,
          birthDay: reportData.birthDay,
          personalYear: reportData.personalYear,
          birthGridCounts: reportData.birthGridCounts,
          missingNumbers: reportData.missingNumbersBirth,
          dominantNumber: reportData.dominantNumber,
          age: reportData.age,
          question: reportData.question,
          lang: 'zh'
        })

        // 检查是否有API Key
        const provider = localStorage.getItem('api_provider') || 'deepseek'
        const key = localStorage.getItem('api_key') || 'sk-570adfb7923a4248b65fcafa9a26d520'

        if (!key || key === 'sk-570adfb7923a4248b65fcafa9a26d520') {
          // 使用默认 DeepSeek API
          setLoadingText('正在生成详细报告...')
          const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer sk-570adfb7923a4248b65fcafa9a26d520`
            },
            body: JSON.stringify({
              model: 'deepseek-chat',
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 4000
            })
          })

          if (!response.ok) {
            throw new Error(`API错误: ${response.status}`)
          }

          const data = await response.json()
          setReportContent(data.choices[0].message.content)
        } else {
          // 自定义API
          setLoadingText('正在生成详细报告...')
          const baseURL = provider === 'deepseek' ? 'https://api.deepseek.com' : 'https://api.openai.com/v1'
          const model = provider === 'deepseek' ? 'deepseek-chat' : 'gpt-4o'
          
          const response = await fetch(`${baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${key}`
            },
            body: JSON.stringify({
              model,
              messages: [{ role: 'user', content: prompt }],
              temperature: 0.7,
              max_tokens: 4000
            })
          })

          if (!response.ok) {
            throw new Error(`API错误: ${response.status}`)
          }

          const data = await response.json()
          setReportContent(data.choices[0].message.content)
        }
      } catch (e: any) {
        console.error('生成错误:', e)
        setReportContent(generateDemoReport(reportData))
      } finally {
        setLoading(false)
      }
    }

    generateReport()
  }, [reportData])

  const generateDemoReport = (data: ReportData): string => {
    const ageGroup = getAgeGroup(data.age)
    const theme = data.personalYear ? getYearTheme(data.personalYear) : getYearTheme(1)
    const missingStr = data.missingNumbersBirth.length > 0 ? data.missingNumbersBirth.join('、') : '无'
    const today = new Date()
    const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`

    return `🌟 生命数字战略蓝图

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${data.lifePath}         ${data.birthDay}         ${data.attitude}         ${data.personalYear}

---

📜 总纲：一句话判词

你的人生主轨是 ${data.lifePath}，你的触发方式是 ${data.attitude}，而今年（${data.personalYear} 流年）逼你把 ${data.missingNumbersBirth.length > 0 ? data.missingNumbersBirth[0] : '你的核心课题'} 从"缺口"做成"能力"。

---

核心参数一览

  生命路径数   ${data.lifePath}   你的人生主轨：开创、独立、自我实现
  态度数       ${data.attitude}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${data.birthDay}   你的行动默认模式：结果导向、权力、资源整合
  流年         ${data.personalYear}   今年的核心课题：破局、新生、独立启动

缺失数   ${missingStr}
今年要补的课：${data.missingNumbersBirth.length > 0 ? data.missingNumbersBirth.map(m => '数字' + m).join('、') : '无'}

---

🔮 第一章：出厂设置

1.1 人生主轨：${data.lifePath}

${data.lifePath}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字1出现了${data.birthGridCounts[1]}次，这是你能量最强的核心引擎。这意味着你的"独立意志"和"开创力"是你的超级天赋，但同时也可能成为你的惯性陷阱。

1.2 天赋九宫格

你的最强数字是 ${data.dominantNumber}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${data.birthGridCounts[1]}次（核心引擎）
  数字2出现${data.birthGridCounts[2]}次
  数字3出现${data.birthGridCounts[3]}次
  数字4出现${data.birthGridCounts[4]}次
  数字5出现${data.birthGridCounts[5]}次
  数字6出现${data.birthGridCounts[6]}次
  数字7出现${data.birthGridCounts[7]}次
  数字8出现${data.birthGridCounts[8]}次
  数字9出现${data.birthGridCounts[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${data.birthDay}）

你的生日数决定了你解决问题的"默认手法"是【${data.birthDay === 1 ? '独立思考后行动' : data.birthDay === 2 ? '协作与感受' : data.birthDay === 3 ? '创意表达' : data.birthDay === 4 ? '稳定构建' : data.birthDay === 5 ? '自由探索' : data.birthDay === 6 ? '责任担当' : data.birthDay === 7 ? '深度分析' : data.birthDay === 8 ? '结果导向、权力、资源整合' : '理想愿景'}】。

2.2 你的触发与沟通方式（态度数 ${data.attitude}）

你的态度数让你在面对挑战和压力时【${data.attitude === 1 ? '立刻启动战斗模式' : data.attitude === 2 ? '变得情绪化、寻求支持' : data.attitude === 3 ? '用幽默回避' : data.attitude === 4 ? '收缩防御、追求稳定' : data.attitude === 5 ? '渴望自由、拒绝束缚' : data.attitude === 6 ? '承担过多、压抑情绪' : data.attitude === 7 ? '退缩分析、过度思考' : data.attitude === 8 ? '强势掌控、用权力解决问题' : '被不公激惹、激发理想主义行动'}】。

---

📚 第三章：缺失数/提升策略

${data.missingNumbersBirth.length > 0 ? data.missingNumbersBirth.map((m, i) =>
`数字${m}：你人生某个需要"补课"的能力区。
提升策略：识别触发条件 → 替代动作 → 复盘记录。`
).join('\n\n') : '你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。'}

---

🎯 第四章：${ageGroup}专项指南（${data.age}岁）

**阶段定位：** ${ageGroup === '天赋养育' ? '成长关键期，原生能量的保护比任何成就都重要。' :
ageGroup === '赛道选择' ? '学业和早期职业探索的黄金期，试错成本最低。' :
ageGroup === '黄金实战' ? '土星回归前的立身之本，是建立事业和关系的核心期。' :
ageGroup === '天命整合' ? '从"为生存而战"转向"为使命而活"的关键转折。' :
'从"被疗愈者"成为"疗愈者"。'}

---

🚀 第五章：本流年战略

**【${data.personalYear} 流年】核心主题：${theme.type}**

  机会窗口：${theme.opportunity}
  风险预警：${theme.risk}

---

🌟 结语

你的 ${data.lifePath} 主轨决定了你终将走向【创造和引领】；你的 ${data.attitude} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${missingStr}】就是你今年要用训练完成的"升级钥匙"。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${dateStr}`
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex flex-col items-center justify-center">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl max-w-md text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-800">{loadingText}</p>
          <p className="text-sm text-gray-500 mt-2">预计需要 30-60 秒</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400">
      {/* 工具栏 */}
      <div className="no-print fixed top-4 right-4 z-50">
        <button
          onClick={handlePrint}
          className="bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 transition font-medium"
        >
          📄 下载PDF
        </button>
      </div>

      {/* 报告主体 */}
      <div className="max-w-3xl mx-auto px-4 py-8 pt-16">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 report-content">
          {/* 报告内容 - Markdown渲染 */}
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(reportContent) }} />

          {/* 底部 */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm">
            <p>Life Numerology</p>
            <p className="mt-1">lifenumerology.shop</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .report-content {
          font-size: 14px;
          line-height: 1.8;
        }
        .report-content h1 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
        }
        .report-content h2 {
          font-size: 20px;
          font-weight: 600;
          color: #7c3aed;
          margin-top: 2rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e9d5ff;
        }
        .report-content h3 {
          font-size: 16px;
          font-weight: 600;
          color: #4f46e5;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .report-content p {
          margin-bottom: 0.75rem;
        }
        .report-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 13px;
        }
        .report-content th {
          background: #7c3aed;
          color: white;
          padding: 8px 12px;
          text-align: center;
        }
        .report-content td {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          text-align: center;
        }
        .report-content blockquote {
          border-left: 4px solid #9333ea;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #666;
        }
        .spinner {
          border: 3px solid rgba(147, 51, 234, 0.3);
          border-top-color: #9333ea;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex items-center justify-center">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl">
          <p className="text-lg">加载中...</p>
        </div>
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}

// 简单Markdown渲染
function renderMarkdown(text: string): string {
  if (!text) return ''

  let html = text
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      if (cells.some(c => c.includes('---'))) return ''
      const isHeader = cells.some(c => c.includes('**') || c.match(/参数|值|说明|数字/))
      const tag = isHeader ? 'th' : 'td'
      return `<tr>${cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('')}</tr>`
    })

  html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>')
  html = html.replace(/(<tr>.*?<\/tr>)+/g, '<table>$&</table>')
  html = `<p>${html}</p>`

  return html
}
