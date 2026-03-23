/**
 * 报告 Prompt 模板
 */

export interface ReportVariables {
  birthDate: string
  lifePath: number
  attitude: number
  birthDay: number
  personalYear: number | null
  birthGridCounts: Record<number, number>
  missingNumbers: number[]
  dominantNumber: number
  age: number
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
  const { birthDate, lifePath, attitude, birthDay, personalYear, birthGridCounts, missingNumbers, dominantNumber, age, lang = 'zh' } = vars
  const ageGroup = getAgeGroup(age)
  const isZh = lang === 'zh'
  const missingStr = missingNumbers.length > 0 ? missingNumbers.join('、') : '无'
  const yearTheme = personalYear ? getYearTheme(personalYear) : getYearTheme(1)

  return `【角色设定】
你是一位专业生命数字解读师，擅长毕达哥拉斯生命数字体系，拥有25年咨询经验。你的解读风格：犀利精准、有温度、接地气，既专业又让人听得懂。

【输入变量】
- 出生日期：${birthDate}
- 生命路径数（主命数）：${lifePath}
- 态度数：${attitude}
- 生日数：${birthDay}
- 流年数字：${personalYear || '未提供'}
- 天赋九宫格：${JSON.stringify(birthGridCounts)}
- 最强数字：${dominantNumber}
- 缺失数：${missingStr}
- 用户年龄：${age}岁
- 年龄档：${ageGroup}

【输出语言】${isZh ? '简体中文' : 'English'}

【字数要求】5000字以上

【格式要求】
- 使用 Markdown 格式
- 每个章节用 emoji 图标开头
- 重点句子用【】包裹
- 数字解读尽量用表格呈现
- 适当留白，分段清晰

## 🌟 封面

# 生命数字战略蓝图
**${birthDate}**

---

★ 核心数字速览 ★

| 生命路径数 | 生日数 | 态度数 | 流年 |
|:---:|:---:|:---:|:---:|
| ${lifePath} | ${birthDay} | ${attitude} | ${personalYear || '-'} |

---

## 📜 总纲：一句话判词

> 你的人生主轨是 **${lifePath}**，你的触发方式是 **${attitude}**，而今年（${personalYear || '?'} 流年）逼你把 ${missingNumbers.length > 0 ? '**' + missingNumbers[0] + '**' : '你的核心课题'} 从"缺口"做成"能力"。

**核心参数一览**

| 参数 | 值 | 说明 |
|------|-----|------|
| 生命路径数 | ${lifePath} | 你的人生主轨 |
| 态度数 | ${attitude} | 你如何被触发 |
| 生日数 | ${birthDay} | 你的行动默认模式 |
| 流年 | ${personalYear || '未提供'} | 今年的核心课题 |
| 缺失数 | ${missingStr} | 今年要补的课 |

---

## 🔮 第一章：出厂设置

### 1.1 人生主轨：${lifePath}

**${lifePath}号主轨** 意味着你天生倾向于用【】来推进生活和工作。你最容易赢在【】；你也最需要警惕【】。

### 1.2 天赋九宫格

你的最强数字是 **${dominantNumber}**，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

| 数字 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 次数 | ${birthGridCounts[1]} | ${birthGridCounts[2]} | ${birthGridCounts[3]} | ${birthGridCounts[4]} | ${birthGridCounts[5]} | ${birthGridCounts[6]} | ${birthGridCounts[7]} | ${birthGridCounts[8]} | ${birthGridCounts[9]} |

---

## ⚙️ 第二章：运作方式

### 2.1 你的行动策略（生日数 ${birthDay}）

你的生日数决定了你解决问题的"默认手法"是【】。

### 2.2 你的触发与沟通方式（态度数 ${attitude}）

你的 **${attitude} 号态度数** 让你在面对【】时立刻【】。

### 2.3 微型决策练习

**练习一：72小时延迟决策记录**
记录触发事件、第一反应、延迟后决定、验证结果

**练习二：把直觉写成可验证条件**
当你说"我感觉..."时，翻译成"如果...我就..."

---

## 📚 第三章：缺失数/提升策略

${missingNumbers.length > 0 ? missingNumbers.map((m, i) => `
### 3.${i+1} 缺失数：${m}

#### 3.${i+1}.1 你天然不擅长的区域
数字 **${m}** 代表你人生某个需要"补课"的能力区。

#### 3.${i+1}.2 偏离时的典型表现
当你偏离时，你容易在【】上耗能，表现为：

#### 3.${i+1}.3 它造成的常见代价

#### 3.${i+1}.4 提升策略（3步法）
**Step A：识别触发条件**
**Step B：替代动作**
**Step C：复盘指标**
`).join('') : `
你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。
`}

---

## 🎯 第四章：${ageGroup}专项指南（${age}岁）

**阶段定位：** ${ageGroup === '天赋养育' ? '成长关键期，原生能量的保护比任何成就都重要。' :
ageGroup === '赛道选择' ? '学业和早期职业探索的黄金期，试错成本最低。' :
ageGroup === '黄金实战' ? '土星回归前的立身之本，是建立事业和关系的核心期。' :
ageGroup === '天命整合' ? '从"为生存而战"转向"为使命而活"的关键转折。' :
'从"被疗愈者"成为"疗愈者"。'}

**【A 阶段核心】** ${ageGroup === '天赋养育' ? '能量保护 - 保护孩子的原生能量不被制约压制' :
ageGroup === '赛道选择' ? '恐惧选择识别 - 选专业是基于"我想要"还是"我害怕"' :
ageGroup === '黄金实战' ? '职业锚点 - 找到你稳定输出的核心能力区' :
ageGroup === '天命整合' ? '从生存到使命 - 重新回答人生下半场的方向' :
'外部权威 - 从"被疗愈者"成为"疗愈者"'}

**【B 关键机制】** ${ageGroup === '天赋养育' ? '学习节律 - 找到孩子的能量高峰期' :
ageGroup === '赛道选择' ? '专业匹配与试错策略 - 用100小时验证法' :
ageGroup === '黄金实战' ? '通道天赋最大化 - 找到你最高效的表达→行动路径' :
ageGroup === '天命整合' ? '人生下半场方向检视 - 用轮回交叉视角审视' :
'身体智慧与疗愈分享 - 用身体感知替代大脑分析'}

**【C 偏离修正】** ${ageGroup === '天赋养育' ? '情绪疏导与边界 - 稳定回应 > 立即满足' :
ageGroup === '赛道选择' ? '独立决策边界 - 独立决策 ≠ 冲动决断' :
ageGroup === '黄金实战' ? '抗压机制 - 区分真实压力和想象的压力' :
ageGroup === '天命整合' ? '去制约边界 - 识别"我应该"的声音是谁的期待' :
'放下控制边界 - 区分"帮助"和"控制"'}

**【D 输出型策略】** ${ageGroup === '天赋养育' ? '亲子沟通句式 - "我理解你感到..."' :
ageGroup === '赛道选择' ? '社交与资源积累 - 建立弱关系网络' :
ageGroup === '黄金实战' ? '关系能量管理 - 识别消耗型和滋养型关系' :
ageGroup === '天命整合' ? '影响力构建 - 用专业输出建立影响力' :
'智慧传承 - 写下来/录下来，你的故事就是最好的教材'}

**【心理建设】**
- ${ageGroup === '天赋养育' ? '学习是为了理解世界，不是为了比较' :
ageGroup === '赛道选择' ? '选择没有对错，只有适合和成长' :
ageGroup === '黄金实战' ? '你的价值不取决于职位或收入' :
ageGroup === '天命整合' ? '你不需要向任何人证明自己' :
'你的经验是宝贵的传承资产'}
- ${ageGroup === '天赋养育' ? '失败是探索的一部分，不是能力的定义' :
ageGroup === '赛道选择' ? '大学是探索期，不是定型期' :
ageGroup === '黄金实战' ? '休息不是懒惰，是战略投资' :
ageGroup === '天命整合' ? '后半生可以跟前半生完全不同' :
'帮助他人的同时也是在疗愈自己'}
- ${ageGroup === '天赋养育' ? '你的价值不取决于成绩或表现' :
ageGroup === '赛道选择' ? '你不需要现在就确定一生的事业' :
ageGroup === '黄金实战' ? '可以追求成功，但不要用健康换' :
ageGroup === '天命整合' ? '真正的成熟是接纳自己的全部' :
'年龄带给你的是智慧，不是限制'}

---

## 🚀 第五章：本流年战略

### 5.1 流年主题总宣言

**【${personalYear || '?'} 流年】核心主题：${yearTheme.type}】

- **机会窗口：** ${yearTheme.opportunity}
- **风险预警：** ${yearTheme.risk}
- **今年关键词：** ${yearTheme.keywords.join(' / ')}

### 5.2 今年的行动原则（5条）

| 原则 | 内容 |
|------|------|
| 原则1 | 用 **${lifePath}** 的方式启动——做事前先找到你的核心动力 |
| 原则2 | 用 **${attitude}** 处理触发——被激惹时先暂停再反应 |
| 原则3 | 用 **${birthDay}** 做验证——让行动可衡量、可复盘 |
| 原则4 | 把缺失数 **【${missingStr}】** 当作训练清单，每周至少练习1次 |
| 原则5 | 每次重大决策后做一次复盘 |

### 5.3 本流年行动清单

${missingNumbers.length > 0 ? missingNumbers.map((m, i) => `- ☐ 针对缺失数 **${m}** 的具体练习`).join('\n') : '- ☐ 今年没有缺失数绑定，专注于发挥优势'}
- ☐ 至少完成1次"阶段核心"相关的深度反思
- ☐ 建立/优化你的"关键机制"执行路径
- ☐ 遇到偏离时，使用"偏离修正"策略而不是自责
- ☐ 每月末做一次月度复盘
- ☐ 找到一个可以互相监督的伙伴或社群

### 5.4 偏离纠偏机制（Not-Self复位5步）

| 步骤 | 动作 | 操作 |
|------|------|------|
| 1 | 命名 | 识别"Not-Self"状态 |
| 2 | 暂停窗口 | 30秒-3分钟冷静期 |
| 3 | 替代动作 | 深呼吸/散步/喝水 |
| 4 | 补能 | 回到内在权威 |
| 5 | 复盘记录 | 记录事件+反应+结果 |

### 5.5 未来365天行动方案

**【第一周：校准期】**
- ☐ 理解自己的核心数字含义
- ☐ 写下对缺失数的初步观察
- ☐ 确定一个最简单的"每日小练习"

**【第一个月：建立习惯期】**
- ☐ 缺失数训练变成每日流程（10-15分钟）
- ☐ 建立复盘习惯（每日睡前3分钟）
- ☐ 完成第1次Not-Self复位记录

**【半年：验证迭代期】**
- ☐ 6个月后重新评估缺失数影响
- ☐ 调整策略，优化"升级路径"
- ☐ 提炼1-2个可复用的"成长心法"

---

## 🌟 结语

你的 **${lifePath}** 主轨决定了你终将走向【】；你的 **${attitude}** 触发机制决定了你会在【】变得强或失控；你的 **${birthDay}** 行动方式决定了你要用【】来验证选择。

**${personalYear || '?'}** 流年把重点落在【${yearTheme.type}】。

而缺失数 **【${missingStr}】** 就是你今年要用训练完成的"升级钥匙"。

今年的升级钥匙不是【】，而是【】。当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

*报告生成：Life Numerology | lifenumerology.shop*`
}
