/**
 * 生命数字计算器 - 核心算法
 * 毕达哥拉斯生命数字体系
 */

// 字母映射表
const LETTER_MAP: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
}

// 元音集合（Y为辅音）
const VOWELS = new Set(['A', 'E', 'I', 'O', 'U'])

// 数字各位求和
function digitSum(n: number): number {
  return String(n).split('').reduce((acc, d) => acc + parseInt(d, 10), 0)
}

/**
 * DR9: 数字化简到 1-9（不保留11/22/33）
 */
function DR9(x: number): number {
  if (x < 10) return x
  let sum = digitSum(x)
  while (sum >= 10) {
    sum = digitSum(sum)
  }
  return sum
}

/**
 * DR11223: 数字化简到 1-9/11/22/33（保留卓越数）
 */
function DR11223(x: number): number {
  if (x === 11 || x === 22 || x === 33) return x
  if (x < 10) return x
  let sum = digitSum(x)
  while (sum >= 10) {
    if (sum === 11 || sum === 22 || sum === 33) return sum
    sum = digitSum(sum)
  }
  return sum
}

/**
 * 校验日期有效性
 */
function isValidDate(yyyy: number, mm: number, dd: number): boolean {
  const date = new Date(yyyy, mm - 1, dd)
  return date.getFullYear() === yyyy &&
         date.getMonth() === mm - 1 &&
         date.getDate() === dd
}

/**
 * 标准化拼音: ü→V, 大写, 去除非字母
 */
function normalizePinyin(pinyinRaw: string): string {
  let normalized = pinyinRaw
    .replace(/ü/g, 'V')
    .replace(/Ü/g, 'V')
    .toUpperCase()
  return normalized.replace(/[^A-Z]/g, '')
}

export interface CalculatorResult {
  lifePath: number
  birthDay: number
  attitude: number
  personalYear: number | null
  expression: number
  soulUrge: number
  personality: number
  maturity: number
  birthGridCounts: Record<number, number>
  missingNumbersBirth: number[]
  karmicLessons: number[]
  dominantNumber: number
  debug: {
    namePinyinRaw: string
    namePinyinLetters: string
    birthDigitString: string
    birthDigitStringNoZero: string
  }
}

/**
 * 完整生命数字计算
 */
export function calculate(
  birthDate: string,
  nameCn: string,
  queryYear?: number
): CalculatorResult {
  // 1. 解析日期
  const [yyyyStr, mmStr, ddStr] = birthDate.split('-')
  const yyyy = parseInt(yyyyStr, 10)
  const mm = parseInt(mmStr, 10)
  const dd = parseInt(ddStr, 10)
  const Y4 = String(yyyy)
  const M2 = String(mm).padStart(2, '0')
  const D2 = String(dd).padStart(2, '0')

  if (!isValidDate(yyyy, mm, dd)) {
    throw new Error('Invalid date')
  }

  // 2. 姓名处理（简化：使用原始输入作为演示）
  const namePinyinRaw = nameCn // 简化版，实际应调用拼音转换API
  const namePinyinLetters = normalizePinyin(namePinyinRaw)

  // 3. 出生数字串（移除0）
  const birthDigitString = Y4 + M2 + D2
  const birthDigitStringNoZero = birthDigitString.replace(/0/g, '')

  // ============ 核心计算 ============

  // 4.1 生命路径数
  const lifePathSum = digitSum(yyyy) + digitSum(parseInt(M2, 10)) + digitSum(parseInt(D2, 10))
  const lifePath = DR11223(lifePathSum)

  // 4.2 生日数
  const birthDay = DR11223(parseInt(D2, 10))

  // 4.3 态度数
  const attitudeSum = digitSum(parseInt(M2, 10)) + digitSum(parseInt(D2, 10))
  const attitude = DR11223(attitudeSum)

  // 4.4 流年运势
  let personalYear: number | null = null
  if (queryYear) {
    const qy = String(queryYear)
    const personalYearSum = digitSum(parseInt(qy, 10)) + digitSum(parseInt(M2, 10)) + digitSum(parseInt(D2, 10))
    personalYear = DR11223(personalYearSum)
  }

  // ============ 姓名数字 ============

  // 5.1 表达数
  const expressionSum = namePinyinLetters.split('').reduce((sum, c) => {
    return sum + (LETTER_MAP[c] || 0)
  }, 0)
  const expression = DR11223(expressionSum)

  // 5.2 灵魂数（元音和）
  const soulVowels = namePinyinLetters.split('').filter(c => VOWELS.has(c))
  const soulUrgeSum = soulVowels.reduce((sum, c) => {
    return sum + (LETTER_MAP[c] || 0)
  }, 0)
  const soulUrge = soulVowels.length > 0 ? DR11223(soulUrgeSum) : 0

  // 5.3 外在人格数（辅音和）
  const personalityConsonants = namePinyinLetters.split('').filter(c => !VOWELS.has(c))
  const personalitySum = personalityConsonants.reduce((sum, c) => {
    return sum + (LETTER_MAP[c] || 0)
  }, 0)
  const personality = DR11223(personalitySum)

  // 5.4 成熟数
  const maturity = DR11223(lifePath + expression)

  // ============ 九宫格统计 ============
  const birthGridCounts: Record<number, number> = {}
  for (let n = 1; n <= 9; n++) {
    birthGridCounts[n] = 0
  }
  for (const ch of birthDigitStringNoZero) {
    const num = parseInt(ch, 10)
    if (num >= 1 && num <= 9) {
      birthGridCounts[num]++
    }
  }

  // 6.2 缺失数
  const missingNumbersBirth: number[] = []
  for (let n = 1; n <= 9; n++) {
    if (birthGridCounts[n] === 0) {
      missingNumbersBirth.push(n)
    }
  }

  // ============ 黑洞数 ============
  const nameDigitSeq = namePinyinLetters.split('').map(c => LETTER_MAP[c] || 0).filter(d => d > 0)
  const countName: Record<number, number> = {}
  for (let n = 1; n <= 9; n++) {
    countName[n] = 0
  }
  for (const d of nameDigitSeq) {
    countName[d]++
  }

  const karmicLessons: number[] = []
  for (let n = 1; n <= 9; n++) {
    if (birthGridCounts[n] === 0 && countName[n] === 0) {
      karmicLessons.push(n)
    }
  }

  // ============ dominantNumber ============
  const entries = Object.entries(birthGridCounts)
  const dominant = entries.reduce((a, b) => parseInt(b[1]) > parseInt(a[1]) ? b : a)
  const dominantNumber = parseInt(dominant[0])

  return {
    lifePath,
    birthDay,
    attitude,
    personalYear,
    expression,
    soulUrge,
    personality,
    maturity,
    birthGridCounts,
    missingNumbersBirth,
    karmicLessons,
    dominantNumber,
    debug: {
      namePinyinRaw,
      namePinyinLetters,
      birthDigitString,
      birthDigitStringNoZero
    }
  }
}

export { DR9, DR11223, normalizePinyin }
