import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/db'
import { calculate, CalculatorResult } from '@/lib/calculator'
import { createHash } from 'crypto'

export async function POST(req: Request): Promise<Response> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { birthDate, name, queryYear, question } = await req.json()
    if (!birthDate || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const fingerprint = createHash('sha256')
      .update(`${name}|${birthDate}|${queryYear ?? ''}|${question ?? ''}`)
      .digest('hex')

    const existing = await db.getCalculationByFingerprint(fingerprint, session.user.id)
    const user = await db.getUserById(session.user.id)
    const creditsUsed = user?.freeCreditsUsed ?? 0

    if (existing) {
      if (existing.isPaid) {
        return NextResponse.json({
          type: 'existing_paid',
          id: existing.id,
          reportText: existing.reportText,
          message: '历史已付费报告',
        })
      }
      if (creditsUsed >= 1) {
        return NextResponse.json({
          type: 'unpaid_no_credits',
          id: existing.id,
          fingerprint,
          message: '此配置需要付费',
        })
      }
      const result = calculate(birthDate, name, queryYear)
      const reportText = await generateReport(result, name, question)
      await db.updateCalculation(existing.id, { reportText })
      await db.incrementUserCredits(session.user.id)
      return NextResponse.json({
        type: 'new_with_credit',
        id: existing.id,
        reportText,
        result,
        creditsRemaining: 0,
      })
    }

    if (creditsUsed >= 1) {
      return NextResponse.json({
        type: 'no_credits',
        fingerprint,
        message: '免费次数已用尽，需要付费',
      })
    }

    const result = calculate(birthDate, name, queryYear)
    const reportText = await generateReport(result, name, question)

    const id = crypto.randomUUID()
    await db.createCalculation({
      id,
      userId: session.user.id,
      birthdate: birthDate,
      name: name.trim(),
      lifeNumber: result.lifePath,
      lang: 'zh',
      reportText,
      fingerprint,
      isPaid: 0,
      question: question ?? null,
      queryYear: queryYear ?? null,
    })

    await db.incrementUserCredits(session.user.id)

    return NextResponse.json({
      type: 'new',
      id,
      reportText,
      result,
      creditsRemaining: 0,
    })
  } catch (err) {
    console.error('[/api/calculate]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

async function generateReport(result: CalculatorResult, name: string, question?: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not set')

  const prompt = `生成一份详细的生命数字报告。
姓名：${name}
生命路径数：${result.lifePath}
生日数：${result.birthDay}
态度数：${result.attitude}
表达数：${result.expression}
灵魂数：${result.soulUrge}
外在人格数：${result.personality}
成熟数：${result.maturity}
流年：${result.personalYear ?? '未计算'}
缺失数：${result.missingNumbersBirth.join(', ') || '无'}
黑洞数：${result.karmicLessons.join(', ') || '无'}
主导数字：${result.dominantNumber}
${question ? `用户问题：${question}` : ''}`

  const res = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? '报告生成失败，请重试'
}
