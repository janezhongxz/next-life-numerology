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
  lang?: 'zh' | 'en'
}

function ReportContent() {
  const searchParams = useSearchParams()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [reportContent, setReportContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('正在加载数据...')
  const [progress, setProgress] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [apiKey, setApiKey] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('deepseek')

  // 进度阶段
  const progressStages = reportData?.lang === 'en' ? [
    { pct: 10, text: 'Connecting your life frequency...' },
    { pct: 40, text: 'Analyzing core number patterns...' },
    { pct: 70, text: 'Generating personalized insights...' },
    { pct: 90, text: 'Finalizing your blueprint...' },
  ] : [
    { pct: 10, text: '正在连接您的生命频率...' },
    { pct: 40, text: '深度解析核心数字逻辑...' },
    { pct: 70, text: '正在生成个性化成长建议...' },
    { pct: 90, text: '报告装订中，惊喜即将呈现...' },
  ]

  // 金句
  const quotes = reportData?.lang === 'en' ? [
    '"Every digit is a love letter from the universe to you."',
    '"Your numbers never lie, but they do wait for you to listen."',
    '"The cosmos speaks in vibrations — you are fluent in them."',
    '"Behind every challenge is a hidden strength waiting to be discovered."',
    '"Your unique frequency is exactly what the world needs."',
  ] : [
    '每一个数字，都是宇宙写给你的一封信。',
    '你的数字从不撒谎，它们只是在等你聆听。',
    '宇宙用振动说话——而你，生来就听得懂。',
    '每一个挑战背后，都藏着一个等待被发现的天赋。',
    '你独特的频率，正是这个世界需要的。',
  ]

  // 进度 + 金句轮播 effect
  useEffect(() => {
    if (!loading) { setProgress(100); return }
    const stages = [
      { pct: 10, delay: 0 },
      { pct: 40, delay: 3000 },
      { pct: 70, delay: 8000 },
      { pct: 90, delay: 15000 },
      { pct: 98, delay: 25000 },
    ]
    const timers: ReturnType<typeof setTimeout>[] = []
    stages.forEach(({ pct, delay }) => {
      timers.push(setTimeout(() => setProgress(pct), delay))
    })
    const quoteTimer = setInterval(() => {
      setCurrentQuote(q => (q + 1) % quotes.length)
    }, 8000)
    return () => { timers.forEach(clearTimeout); clearInterval(quoteTimer) }
  }, [loading, reportData?.lang])

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
          name: reportData.name,
          lifePath: reportData.lifePath,
          attitude: reportData.attitude,
          birthDay: reportData.birthDay,
          personalYear: reportData.personalYear,
          birthGridCounts: reportData.birthGridCounts,
          missingNumbers: reportData.karmicLessons,
          dominantNumber: reportData.dominantNumber,
          age: reportData.age,
          question: reportData.question,
          lang: reportData.lang || 'zh'
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
    const missingStr = data.karmicLessons.length > 0 ? data.karmicLessons.join('、') : '无'
    const isEn = data.lang === 'en'
    const today = new Date()
    const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    // 格式化出生日期
    const birthParts = data.birthDate.split('-')
    const birthDateFormatted = `${birthParts[0]}年${parseInt(birthParts[1])}月${parseInt(birthParts[2])}日`

    return `🌟 生命数字战略蓝图：${data.name} | ${ageGroup}的${theme.type}

基本情况：

  姓名：${data.name}
  出生年月日：${birthDateFormatted}（公历）
  ${data.question && data.question.trim() ? `当前困惑/目标：\n${data.question.trim()}` : ''}

---

📜 总纲

你是 ${data.lifePath}号主命（LifePath=${data.lifePath}），用 **${data.birthDay}号生日结果导向（BirthDay=${data.birthDay}）** 做系统落地，用 **${data.attitude}号洞察与价值导向（Attitude=${data.attitude}）** 建立理解深度；但你当前的"动力来自业务不够"的根因是 **黑洞缺失数 ${missingStr}**。

· ${missingStr.includes('3') ? '3：表达没有补成"可行动/可回应"的业务结构' : ''}
· ${missingStr.includes('4') ? '4：执行没有补成"稳定运行的节律系统"' : ''}

${data.personalYear}（PersonalYear=${data.personalYear}）会把机会推向：用你姓名里的天赋数字把洞察变成可行动表达、用快速试验迭代验证，再用最低运行线把你从断档里拉出来。

---

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${data.lifePath}         ${data.birthDay}         ${data.attitude}         ${data.personalYear}

---

核心参数一览

  生命路径数   ${data.lifePath}   你的人生主轨：开创、独立、自我实现
  态度数       ${data.attitude}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${data.birthDay}   你的行动默认模式：结果导向、权力、资源整合
  流年         ${data.personalYear}   今年的核心课题：${theme.type}

缺失数   ${missingStr}
今年要补的课：${data.karmicLessons.length > 0 ? data.karmicLessons.map(m => '数字' + m).join('、') : '无'}

---

🔮 第一章：出厂设置

1.1 人生主轨：${data.lifePath}

${data.lifePath}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字${data.dominantNumber}出现了${Math.max(...Object.values(data.birthGridCounts))}次，这是你能量最强的核心引擎。

1.2 天赋九宫格

你的最强数字是 ${data.dominantNumber}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${data.birthGridCounts[1]}次
  数字2出现${data.birthGridCounts[2]}次
  数字3出现${data.birthGridCounts[3]}次
  数字4出现${data.birthGridCounts[4]}次
  数字5出现${data.birthGridCounts[5]}次
  数字6出现${data.birthGridCounts[6]}次
  数字7出现${data.birthGridCounts[7]}次
  数字8出现${data.birthGridCounts[8]}次
  数字9出现${data.birthGridCounts[9]}次
  数字9出现${data.birthGridCounts[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${data.birthDay}）

你的生日数决定了你解决问题的"默认手法"是【${data.birthDay === 1 ? '独立思考后行动' : data.birthDay === 2 ? '协作与感受' : data.birthDay === 3 ? '创意表达' : data.birthDay === 4 ? '稳定构建' : data.birthDay === 5 ? '自由探索' : data.birthDay === 6 ? '责任担当' : data.birthDay === 7 ? '深度分析' : data.birthDay === 8 ? '结果导向、权力、资源整合' : '理想愿景'}】。

2.2 你的触发与沟通方式（态度数 ${data.attitude}）

你的态度数让你在面对挑战和压力时【${data.attitude === 1 ? '立刻启动战斗模式' : data.attitude === 2 ? '变得情绪化、寻求支持' : data.attitude === 3 ? '用幽默回避' : data.attitude === 4 ? '收缩防御、追求稳定' : data.attitude === 5 ? '渴望自由、拒绝束缚' : data.attitude === 6 ? '承担过多、压抑情绪' : data.attitude === 7 ? '退缩分析、过度思考' : data.attitude === 8 ? '强势掌控、用权力解决问题' : '被不公激惹、激发理想主义行动'}】。

---

📚 第三章：缺失数/提升策略

${data.karmicLessons.length > 0 ? data.karmicLessons.map((m, i) =>
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

行动原则（5条）：
  原则1：用 **${data.lifePath}** 的方式启动——做事前先找到你的核心动力
  原则2：用 **${data.attitude}** 处理触发——被激惹时先暂停再反应
  原则3：用 **${data.birthDay}** 做验证——让行动可衡量、可复盘
  原则4：把缺失数 **【${missingStr}】** 当作训练清单，每周至少练习1次
  原则5：每次重大决策后做一次复盘

未来365天行动清单：

**【第一周：校准期】**
  ☐ 理解自己的核心数字含义
  ☐ 写下对缺失数的初步观察
  ☐ 确定一个最简单的"每日小练习"

**【第一个月：建立习惯期】**
  ☐ 缺失数训练变成每日流程（10-15分钟）
  ☐ 建立复盘习惯（每日睡前3分钟）
  ☐ 完成第1次Not-Self复位记录

**【半年：验证迭代期】**
  ☐ 6个月后重新评估缺失数影响
  ☐ 调整策略，优化"升级路径"
  ☐ 提炼1-2个可复用的"成长心法"

---

🌟 结语

你的 ${data.lifePath} 主轨决定了你终将走向【创造和引领】；你的 ${data.attitude} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${missingStr}】就是你今年要用训练完成的"升级钥匙"。

当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${dateStr}`
  }

  const handlePrint = () => {
    window.print()
  }

  if (loading) {
    const isEn = reportData?.lang === 'en'
    const currentStage = progressStages.filter(s => progress >= s.pct).pop()
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex flex-col items-center justify-center breathing-bg">
        <div className="bg-white/90 rounded-3xl p-8 shadow-2xl max-w-md text-center">
          {/* 标题 */}
          <h2 className="font-display text-xl font-bold text-gray-800 mb-2">
            {isEn ? 'Crafting Your Blueprint' : '正在为您精心绘就'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {isEn ? 'Life Numerology Report' : '生命数字战略蓝图'}
          </p>

          {/* 进度条 */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* 进度文案 */}
          <p className="text-base font-medium text-purple-700 mb-4">
            {currentStage?.text || (isEn ? 'Initializing...' : '正在初始化...')}
          </p>

          {/* 数字跳动效果 */}
          <div className="flex justify-center gap-3 mb-6">
            {[1,2,3,4,5,6,7,8,9].map(n => (
              <span key={n} className="text-2xl font-bold text-purple-400 animate-pulse" style={{ animationDelay: `${n * 0.1}s` }}>
                {n}
              </span>
            ))}
          </div>

          {/* 金句 */}
          <p className="text-gray-500 italic text-sm px-4 quote-rotate">
            {quotes[currentQuote]}
          </p>
        </div>

        <style jsx>{`
          @keyframes breathe {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.02); }
          }
          .breathing-bg {
            animation: breathe 4s ease-in-out infinite;
          }
          @keyframes quoteFade {
            0% { opacity: 0; transform: translateY(5px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-5px); }
          }
          .quote-rotate {
            animation: quoteFade 8s ease-in-out forwards;
          }
        `}</style>
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
