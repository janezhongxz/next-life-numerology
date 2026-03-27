// POST /api/calculate
// Core business logic: fingerprint check, free credits, paid判定
import { NextResponse } from 'next/server'
import { getDb } from '@/db'
import { calculations, users } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { validateSession } from '@/lib/auth'
import { calculate, CalculatorResult } from '@/lib/calculator'
import { createHash } from 'crypto'

export async function POST(req: Request): Promise<Response> {
  // 1. Auth check
  const { userId } = await validateSession(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Parse body
  const { birthDate, name, queryYear, question } = await req.json()
  if (!birthDate || !name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // 3. Generate fingerprint: SHA256(name + birthDate + queryYear + question)
  const fingerprint = createHash('sha256')
    .update(`${name}|${birthDate}|${queryYear ?? ''}|${question ?? ''}`)
    .digest('hex')

  const db = getDb()

  // 4. Check fingerprint in DB → existing report?
  const existing = await db
    .select()
    .from(calculations)
    .where(and(
      eq(calculations.fingerprint, fingerprint),
      eq(calculations.userId, userId)
    ))
    .get()

  // Get user credits
  const user = await db.select().from(users).where(eq(users.id, userId)).get()
  const creditsUsed = user?.freeCreditsUsed ?? 0

  if (existing) {
    if (existing.isPaid) {
      // Already paid - return existing report
      return NextResponse.json({
        type: 'existing_paid',
        id: existing.id,
        reportText: existing.reportText,
        message: '历史已付费报告'
      })
    }
    // Fingerprint hit but not paid AND no credits left
    if (creditsUsed >= 1) {
      return NextResponse.json({
        type: 'unpaid_no_credits',
        id: existing.id,
        fingerprint,
        message: '此配置需要付费'
      })
    }
    // Fingerprint hit, not paid, but has credits → use credit
    const result = calculate(birthDate, name, queryYear)
    const reportText = await generateReport(result, name, question)

    await db
      .update(calculations)
      .set({ reportText })
      .where(eq(calculations.id, existing.id))

    await db
      .update(users)
      .set({ freeCreditsUsed: creditsUsed + 1 })
      .where(eq(users.id, userId))

    return NextResponse.json({
      type: 'new_with_credit',
      id: existing.id,
      reportText,
      result,
      creditsRemaining: 0
    })
  }

  // 5. New calculation - check credits
  if (creditsUsed >= 1) {
    return NextResponse.json({
      type: 'no_credits',
      fingerprint,
      message: '免费次数已用尽，需要付费'
    })
  }

  // 6. Perform free calculation
  const result = calculate(birthDate, name, queryYear)
  const reportText = await generateReport(result, name, question)

  // Save to DB
  const id = crypto.randomUUID()
  await db.insert(calculations).values({
    id,
    userId,
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

  // Mark free credit as used
  await db
    .update(users)
    .set({ freeCreditsUsed: creditsUsed + 1 })
    .where(eq(users.id, userId))

  return NextResponse.json({
    type: 'new',
    id,
    reportText,
    result,
    creditsRemaining: 0
  })
}

async function generateReport(result: CalculatorResult, name: string, question?: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY not set')

  // Build prompt from report-prompt logic
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
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await res.json()
  return data.choices?.[0]?.message?.content ?? '报告生成失败，请重试'
}
