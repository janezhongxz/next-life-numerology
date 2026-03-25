/**
 * 报告 Prompt 模板
 */

export interface ReportVariables {
  birthDate: string
  name: string
  lifePath: number
  attitude: number
  birthDay: number
  personalYear: number | null
  birthGridCounts: Record<number, number>
  missingNumbers: number[]
  dominantNumber: number
  age: number
  question?: string
  lang?: 'zh' | 'en'
}

export function getAgeGroup(age: number): string {
  if (age < 18) return '天赋养育'
  if (age < 24) return '赛道选择'
  if (age < 40) return '黄金实战'
  if (age < 60) return '天命整合'
  return '智者传承'
}

export function getYearTheme(personalYear: number) {
  const themes: Record<number, { type: string; opportunity: string; risk: string; keywords: string[] }> = {
    1: { type: '破局与独立', opportunity: '新的开始、突破瓶颈', risk: '过于自我、冲动决策', keywords: ['新生', '突破', '主导'] },
    2: { type: '合作与平衡', opportunity: '建立深度关系', risk: '犹豫不决', keywords: ['合作', '耐心', '直觉'] },
    3: { type: '表达与创造', opportunity: '创意爆发、社交活跃', risk: '过于分散', keywords: ['创造', '表达', '社交'] },
    4: { type: '根基与结构', opportunity: '建立稳定系统', risk: '过于保守', keywords: ['稳定', '积累', '结构'] },
    5: { type: '自由与突破', opportunity: '突破限制、跨界探索', risk: '逃避责任', keywords: ['突破', '自由', '变革'] },
    6: { type: '责任与和谐', opportunity: '导师角色、财富回流', risk: '过度承担', keywords: ['责任', '平衡', '引领'] },
    7: { type: '内省与智慧', opportunity: '深度思考、精神成长', risk: '过于内收', keywords: ['内省', '智慧', '疗愈'] },
    8: { type: '成就与丰盛', opportunity: '事业突破、财富显化', risk: '过度追逐', keywords: ['成就', '丰盛', '扩张'] },
    9: { type: '整合与放下', opportunity: '结束旧篇章、智慧传承', risk: '沉溺过去', keywords: ['放下', '整合', '圆融'] },
    11: { type: '启示与理想', opportunity: '灵感爆发、精神影响', risk: '不切实际', keywords: ['启示', '理想', '赋能'] },
    22: { type: '大师课题', opportunity: '大型项目落地、改变世界', risk: '控制欲', keywords: ['建设', '传承', '突破'] },
    33: { type: '慈悲课题', opportunity: '无条件给予、成为灯塔', risk: '过度牺牲', keywords: ['慈悲', '疗愈', '灯塔'] }
  }
  return themes[personalYear] || themes[1]
}

export function buildReportPrompt(vars: ReportVariables): string {
  const { birthDate, name, lifePath, attitude, birthDay, personalYear, birthGridCounts, missingNumbers, dominantNumber, age, question, lang = 'zh' } = vars
  const ageGroup = getAgeGroup(age)
  const isZh = lang === 'zh'
  const missingStr = missingNumbers.length > 0 ? missingNumbers.join('、') : '无'
  const yearTheme = personalYear ? getYearTheme(personalYear) : getYearTheme(1)
  const today = new Date()
  const dateStr = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
  // 格式化出生日期为"1981年10月26日"
  const birthParts = birthDate.split('-')
  const birthDateFormatted = `${birthParts[0]}年${parseInt(birthParts[1])}月${parseInt(birthParts[2])}日`

  return `【角色设定】
你是一位专业生命数字解读师，擅长毕达哥拉斯生命数字体系，拥有25年咨询经验。你的解读风格：犀利精准、有温度、接地气，既专业又让人听得懂。

【输入变量】
- 姓名：${name}
- 出生日期：${birthDateFormatted}（公历）
- 生命路径数（主命数）：${lifePath}
- 态度数：${attitude}
- 生日数：${birthDay}
- 流年数字：${personalYear || '未提供'}
- 天赋九宫格各数字出现次数：1出现${birthGridCounts[1]}次、2出现${birthGridCounts[2]}次、3出现${birthGridCounts[3]}次、4出现${birthGridCounts[4]}次、5出现${birthGridCounts[5]}次、6出现${birthGridCounts[6]}次、7出现${birthGridCounts[7]}次、8出现${birthGridCounts[8]}次、9出现${birthGridCounts[9]}次
- 最强数字：${dominantNumber}
- 缺失数：${missingStr}
- 用户年龄：${age}岁（${ageGroup}）
- 用户问题困惑：${question || '未提供'}

【输出语言】${isZh ? '简体中文' : 'English'}

【字数要求】5000字以上

【格式要求】
- 使用 Markdown 格式，但不要用表格
- 每个章节用 emoji 图标开头
- 重点句子用【】包裹
- 适当留白，分段清晰
- 数字解读用清晰的分行文字呈现，不用表格

【输出模板】

🌟 生命数字战略蓝图：${name} | ${ageGroup}的${yearTheme.type}

基本情况：

  姓名：${name}
  出生年月日：${birthDateFormatted}（公历）
  ${question && question.trim() ? `当前困惑/目标：
${question.trim()}` : ''}

---

📜 总纲

你是 ${lifePath}号主命（LifePath=${lifePath}），用 **${birthDay}号生日结果导向（BirthDay=${birthDay}）** 做系统落地，用 **${attitude}号洞察与价值导向（Attitude=${attitude}）** 建立理解深度；但你当前的"动力来自业务不够"的根因是 **黑洞缺失数 ${missingStr}**。

${missingStr.includes('3') ? '· 3：表达没有补成"可行动/可回应"的业务结构' : ''}
${missingStr.includes('4') ? '· 4：执行没有补成"稳定运行的节律系统"' : ''}

${personalYear}（PersonalYear=${personalYear}）会把机会推向：用你姓名里的天赋数字把洞察变成可行动表达、用快速试验迭代验证，再用最低运行线把你从断档里拉出来。

---

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${lifePath}         ${birthDay}         ${attitude}         ${personalYear || '-'}

---

核心参数一览

  生命路径数   ${lifePath}   你的人生主轨：开创、独立、自我实现
  态度数       ${attitude}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${birthDay}   你的行动默认模式：${birthDay === 8 ? '结果导向、权力、资源整合' : birthDay === 1 ? '独立思考后行动' : birthDay === 2 ? '协作与感受' : birthDay === 3 ? '创意表达' : birthDay === 4 ? '稳定构建' : birthDay === 5 ? '自由探索' : birthDay === 6 ? '责任担当' : birthDay === 7 ? '深度分析' : '理想愿景'}
  流年         ${personalYear || '未提供'}   今年的核心课题：${yearTheme.type}

缺失数   ${missingStr}
今年要补的课：${missingNumbers.length > 0 ? missingNumbers.map(m => '数字' + m).join('、') : '无'}

---

🔮 第一章：出厂设置

1.1 人生主轨：${lifePath}

${lifePath}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字${dominantNumber}出现了${Math.max(...Object.values(birthGridCounts))}次，这是你能量最强的核心引擎。

1.2 天赋九宫格

你的最强数字是 ${dominantNumber}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${birthGridCounts[1]}次
  数字2出现${birthGridCounts[2]}次
  数字3出现${birthGridCounts[3]}次
  数字4出现${birthGridCounts[4]}次
  数字5出现${birthGridCounts[5]}次
  数字6出现${birthGridCounts[6]}次
  数字7出现${birthGridCounts[7]}次
  数字8出现${birthGridCounts[8]}次
  数字9出现${birthGridCounts[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${birthDay}）

你的生日数决定了你解决问题的"默认手法"是【${birthDay === 8 ? '结果导向、权力、资源整合' : birthDay === 1 ? '独立思考后行动' : birthDay === 2 ? '协作与感受' : birthDay === 3 ? '创意表达' : birthDay === 4 ? '稳定构建' : birthDay === 5 ? '自由探索' : birthDay === 6 ? '责任担当' : birthDay === 7 ? '深度分析' : '理想愿景'}】。

2.2 你的触发与沟通方式（态度数 ${attitude}）

你的态度数让你在面对挑战和压力时【${attitude === 1 ? '立刻启动战斗模式' : attitude === 2 ? '变得情绪化、寻求支持' : attitude === 3 ? '用幽默回避' : attitude === 4 ? '收缩防御、追求稳定' : attitude === 5 ? '渴望自由、拒绝束缚' : attitude === 6 ? '承担过多、压抑情绪' : attitude === 7 ? '退缩分析、过度思考' : attitude === 8 ? '强势掌控、用权力解决问题' : '被不公激惹、激发理想主义行动'}】。

---

📚 第三章：缺失数/提升策略

${missingNumbers.length > 0 ? missingNumbers.map((m, i) => `
数字${m}：你人生某个需要"补课"的能力区。

提升策略：
  Step A：识别触发条件
  Step B：替代动作
  Step C：复盘指标
`).join('\n\n') : '你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。'}

---

🎯 第四章：${ageGroup}专项指南（${age}岁）

**阶段定位：** ${ageGroup === '天赋养育' ? '成长关键期，原生能量的保护比任何成就都重要。' :
ageGroup === '赛道选择' ? '学业和早期职业探索的黄金期，试错成本最低。' :
ageGroup === '黄金实战' ? '土星回归前的立身之本，是建立事业和关系的核心期。' :
ageGroup === '天命整合' ? '从"为生存而战"转向"为使命而活"的关键转折。' :
'从"被疗愈者"成为"疗愈者"。'}

---

🚀 第五章：本流年战略

**【${personalYear || '?'} 流年】核心主题：${yearTheme.type}**

  机会窗口：${yearTheme.opportunity}
  风险预警：${yearTheme.risk}
  今年关键词：${yearTheme.keywords.join(' / ')}

行动原则（5条）：
  原则1：用 **${lifePath}** 的方式启动——做事前先找到你的核心动力
  原则2：用 **${attitude}** 处理触发——被激惹时先暂停再反应
  原则3：用 **${birthDay}** 做验证——让行动可衡量、可复盘
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

你的 ${lifePath} 主轨决定了你终将走向【创造和引领】；你的 ${attitude} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${missingStr}】就是你今年要用训练完成的"升级钥匙"。

当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${dateStr}`
}
