(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7078,(e,t,r)=>{},2220,(e,t,r)=>{var i=e.i(89732);e.r(7078);var s=e.r(7823),n=s&&"object"==typeof s&&"default"in s?s:{default:s},o=void 0!==i.default&&i.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,i=void 0===r?"stylesheet":r,s=t.optimizeForSpeed,n=void 0===s?o:s;d(a(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",d("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){d("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),d(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(d(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(d(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var r="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(i){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];d(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},r.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];d(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&d(a(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var s=document.head||document.getElementsByTagName("head")[0];return r?s.insertBefore(i,r):s.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function d(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var c=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},u={};function p(e,t){if(!t)return"jsx-"+e;var r=String(t),i=e+r;return u[i]||(u[i]="jsx-"+c(e+"-"+r)),u[i]}function h(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return u[r]||(u[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[r]}var f=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,i=void 0===r?null:r,s=t.optimizeForSpeed,n=void 0!==s&&s;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),i&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),i=r.styleId,s=r.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var n=s.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=n,this._instancesCounts[i]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var i=this._fromServer&&this._fromServer[r];i?(i.parentNode.removeChild(i),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],i=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,i=e.id;if(r){var s=p(i,r);return{styleId:s,rules:Array.isArray(t)?t.map(function(e){return h(s,e)}):[h(s,t)]}}return{styleId:p(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=s.createContext(null);function g(){return new f}function y(){return s.useContext(m)}m.displayName="StyleSheetContext";var b=n.default.useInsertionEffect||n.default.useLayoutEffect,x="u">typeof window?g():void 0;function $(e){var t=x||y();return t&&("u"<typeof window?t.add(e):b(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}$.dynamic=function(e){return e.map(function(e){return p(e[0],e[1])}).join(" ")},r.StyleRegistry=function(e){var t=e.registry,r=e.children,i=s.useContext(m),o=s.useState(function(){return i||t||g()})[0];return n.default.createElement(m.Provider,{value:o},r)},r.createStyleRegistry=g,r.style=$,r.useStyleRegistry=y},81875,(e,t,r)=>{t.exports=e.r(2220).style},43452,(e,t,r)=>{t.exports=e.r(41688)},48705,e=>{"use strict";var t=e.i(36708),r=e.i(81875),i=e.i(7823),s=e.i(43452);function n(e){return e<18?"天赋养育":e<24?"赛道选择":e<40?"黄金实战":e<60?"天命整合":"智者传承"}function o(e){let t={1:{type:"破局与独立",opportunity:"新的开始、突破瓶颈",risk:"过于自我、冲动决策",keywords:["新生","突破","主导"]},2:{type:"合作与平衡",opportunity:"建立深度关系",risk:"犹豫不决",keywords:["合作","耐心","直觉"]},3:{type:"表达与创造",opportunity:"创意爆发、社交活跃",risk:"过于分散",keywords:["创造","表达","社交"]},4:{type:"根基与结构",opportunity:"建立稳定系统",risk:"过于保守",keywords:["稳定","积累","结构"]},5:{type:"自由与突破",opportunity:"突破限制、跨界探索",risk:"逃避责任",keywords:["突破","自由","变革"]},6:{type:"责任与和谐",opportunity:"导师角色、财富回流",risk:"过度承担",keywords:["责任","平衡","引领"]},7:{type:"内省与智慧",opportunity:"深度思考、精神成长",risk:"过于内收",keywords:["内省","智慧","疗愈"]},8:{type:"成就与丰盛",opportunity:"事业突破、财富显化",risk:"过度追逐",keywords:["成就","丰盛","扩张"]},9:{type:"整合与放下",opportunity:"结束旧篇章、智慧传承",risk:"沉溺过去",keywords:["放下","整合","圆融"]},11:{type:"启示与理想",opportunity:"灵感爆发、精神影响",risk:"不切实际",keywords:["启示","理想","赋能"]},22:{type:"大师课题",opportunity:"大型项目落地、改变世界",risk:"控制欲",keywords:["建设","传承","突破"]},33:{type:"慈悲课题",opportunity:"无条件给予、成为灯塔",risk:"过度牺牲",keywords:["慈悲","疗愈","灯塔"]}};return t[e]||t[1]}function a(){let e=(0,s.useSearchParams)(),[a,l]=(0,i.useState)(null),[d,c]=(0,i.useState)(""),[u,p]=(0,i.useState)(!0),[h,f]=(0,i.useState)("正在加载数据..."),[m,g]=(0,i.useState)(!1),[y,b]=(0,i.useState)(""),[x,$]=(0,i.useState)("deepseek");(0,i.useEffect)(()=>{let t=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520",r=localStorage.getItem("api_provider")||"deepseek";b(t),$(r);let i=e.get("data");if(!i)return void p(!1);try{let e=JSON.parse(decodeURIComponent(i));l(e)}catch(e){console.error("数据解析错误",e),p(!1)}},[e]),(0,i.useEffect)(()=>{a&&(async()=>{f("正在构建报告框架...");try{let e=function(e){let{birthDate:t,lifePath:r,attitude:i,birthDay:s,personalYear:a,birthGridCounts:l,missingNumbers:d,dominantNumber:c,age:u,lang:p="zh"}=e,h=n(u),f=d.length>0?d.join("、"):"无",m=a?o(a):o(1);return`【角色设定】
你是一位专业生命数字解读师，擅长毕达哥拉斯生命数字体系，拥有25年咨询经验。你的解读风格：犀利精准、有温度、接地气，既专业又让人听得懂。

【输入变量】
- 出生日期：${t}
- 生命路径数（主命数）：${r}
- 态度数：${i}
- 生日数：${s}
- 流年数字：${a||"未提供"}
- 天赋九宫格：${JSON.stringify(l)}
- 最强数字：${c}
- 缺失数：${f}
- 用户年龄：${u}岁
- 年龄档：${h}

【输出语言】${"zh"===p?"简体中文":"English"}

【字数要求】5000字以上

【格式要求】
- 使用 Markdown 格式
- 每个章节用 emoji 图标开头
- 重点句子用【】包裹
- 数字解读尽量用表格呈现
- 适当留白，分段清晰

## 🌟 封面

# 生命数字战略蓝图
**${t}**

---

★ 核心数字速览 ★

| 生命路径数 | 生日数 | 态度数 | 流年 |
|:---:|:---:|:---:|:---:|
| ${r} | ${s} | ${i} | ${a||"-"} |

---

## 📜 总纲：一句话判词

> 你的人生主轨是 **${r}**，你的触发方式是 **${i}**，而今年（${a||"?"} 流年）逼你把 ${d.length>0?"**"+d[0]+"**":"你的核心课题"} 从"缺口"做成"能力"。

**核心参数一览**

| 参数 | 值 | 说明 |
|------|-----|------|
| 生命路径数 | ${r} | 你的人生主轨 |
| 态度数 | ${i} | 你如何被触发 |
| 生日数 | ${s} | 你的行动默认模式 |
| 流年 | ${a||"未提供"} | 今年的核心课题 |
| 缺失数 | ${f} | 今年要补的课 |

---

## 🔮 第一章：出厂设置

### 1.1 人生主轨：${r}

**${r}号主轨** 意味着你天生倾向于用【】来推进生活和工作。你最容易赢在【】；你也最需要警惕【】。

### 1.2 天赋九宫格

你的最强数字是 **${c}**，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

| 数字 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 次数 | ${l[1]} | ${l[2]} | ${l[3]} | ${l[4]} | ${l[5]} | ${l[6]} | ${l[7]} | ${l[8]} | ${l[9]} |

---

## ⚙️ 第二章：运作方式

### 2.1 你的行动策略（生日数 ${s}）

你的生日数决定了你解决问题的"默认手法"是【】。

### 2.2 你的触发与沟通方式（态度数 ${i}）

你的 **${i} 号态度数** 让你在面对【】时立刻【】。

### 2.3 微型决策练习

**练习一：72小时延迟决策记录**
记录触发事件、第一反应、延迟后决定、验证结果

**练习二：把直觉写成可验证条件**
当你说"我感觉..."时，翻译成"如果...我就..."

---

## 📚 第三章：缺失数/提升策略

${d.length>0?d.map((e,t)=>`
### 3.${t+1} 缺失数：${e}

#### 3.${t+1}.1 你天然不擅长的区域
数字 **${e}** 代表你人生某个需要"补课"的能力区。

#### 3.${t+1}.2 偏离时的典型表现
当你偏离时，你容易在【】上耗能，表现为：

#### 3.${t+1}.3 它造成的常见代价

#### 3.${t+1}.4 提升策略（3步法）
**Step A：识别触发条件**
**Step B：替代动作**
**Step C：复盘指标**
`).join(""):`
你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。
`}

---

## 🎯 第四章：${h}专项指南（${u}岁）

**阶段定位：** ${"天赋养育"===h?"成长关键期，原生能量的保护比任何成就都重要。":"赛道选择"===h?"学业和早期职业探索的黄金期，试错成本最低。":"黄金实战"===h?"土星回归前的立身之本，是建立事业和关系的核心期。":"天命整合"===h?'从"为生存而战"转向"为使命而活"的关键转折。':'从"被疗愈者"成为"疗愈者"。'}

**【A 阶段核心】** ${"天赋养育"===h?"能量保护 - 保护孩子的原生能量不被制约压制":"赛道选择"===h?'恐惧选择识别 - 选专业是基于"我想要"还是"我害怕"':"黄金实战"===h?"职业锚点 - 找到你稳定输出的核心能力区":"天命整合"===h?"从生存到使命 - 重新回答人生下半场的方向":'外部权威 - 从"被疗愈者"成为"疗愈者"'}

**【B 关键机制】** ${"天赋养育"===h?"学习节律 - 找到孩子的能量高峰期":"赛道选择"===h?"专业匹配与试错策略 - 用100小时验证法":"黄金实战"===h?"通道天赋最大化 - 找到你最高效的表达→行动路径":"天命整合"===h?"人生下半场方向检视 - 用轮回交叉视角审视":"身体智慧与疗愈分享 - 用身体感知替代大脑分析"}

**【C 偏离修正】** ${"天赋养育"===h?"情绪疏导与边界 - 稳定回应 > 立即满足":"赛道选择"===h?"独立决策边界 - 独立决策 ≠ 冲动决断":"黄金实战"===h?"抗压机制 - 区分真实压力和想象的压力":"天命整合"===h?'去制约边界 - 识别"我应该"的声音是谁的期待':'放下控制边界 - 区分"帮助"和"控制"'}

**【D 输出型策略】** ${"天赋养育"===h?'亲子沟通句式 - "我理解你感到..."':"赛道选择"===h?"社交与资源积累 - 建立弱关系网络":"黄金实战"===h?"关系能量管理 - 识别消耗型和滋养型关系":"天命整合"===h?"影响力构建 - 用专业输出建立影响力":"智慧传承 - 写下来/录下来，你的故事就是最好的教材"}

**【心理建设】**
- ${"天赋养育"===h?"学习是为了理解世界，不是为了比较":"赛道选择"===h?"选择没有对错，只有适合和成长":"黄金实战"===h?"你的价值不取决于职位或收入":"天命整合"===h?"你不需要向任何人证明自己":"你的经验是宝贵的传承资产"}
- ${"天赋养育"===h?"失败是探索的一部分，不是能力的定义":"赛道选择"===h?"大学是探索期，不是定型期":"黄金实战"===h?"休息不是懒惰，是战略投资":"天命整合"===h?"后半生可以跟前半生完全不同":"帮助他人的同时也是在疗愈自己"}
- ${"天赋养育"===h?"你的价值不取决于成绩或表现":"赛道选择"===h?"你不需要现在就确定一生的事业":"黄金实战"===h?"可以追求成功，但不要用健康换":"天命整合"===h?"真正的成熟是接纳自己的全部":"年龄带给你的是智慧，不是限制"}

---

## 🚀 第五章：本流年战略

### 5.1 流年主题总宣言

**【${a||"?"} 流年】核心主题：${m.type}】

- **机会窗口：** ${m.opportunity}
- **风险预警：** ${m.risk}
- **今年关键词：** ${m.keywords.join(" / ")}

### 5.2 今年的行动原则（5条）

| 原则 | 内容 |
|------|------|
| 原则1 | 用 **${r}** 的方式启动——做事前先找到你的核心动力 |
| 原则2 | 用 **${i}** 处理触发——被激惹时先暂停再反应 |
| 原则3 | 用 **${s}** 做验证——让行动可衡量、可复盘 |
| 原则4 | 把缺失数 **【${f}】** 当作训练清单，每周至少练习1次 |
| 原则5 | 每次重大决策后做一次复盘 |

### 5.3 本流年行动清单

${d.length>0?d.map((e,t)=>`- ☐ 针对缺失数 **${e}** 的具体练习`).join("\n"):"- ☐ 今年没有缺失数绑定，专注于发挥优势"}
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

你的 **${r}** 主轨决定了你终将走向【】；你的 **${i}** 触发机制决定了你会在【】变得强或失控；你的 **${s}** 行动方式决定了你要用【】来验证选择。

**${a||"?"}** 流年把重点落在【${m.type}】。

而缺失数 **【${f}】** 就是你今年要用训练完成的"升级钥匙"。

今年的升级钥匙不是【】，而是【】。当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

*报告生成：Life Numerology | lifenumerology.shop*`}({birthDate:a.birthDate,lifePath:a.lifePath,attitude:a.attitude,birthDay:a.birthDay,personalYear:a.personalYear,birthGridCounts:a.birthGridCounts,missingNumbers:a.missingNumbersBirth,dominantNumber:a.dominantNumber,age:a.age,lang:"zh"}),t=localStorage.getItem("api_provider")||"deepseek",r=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520";if(r&&"sk-570adfb7923a4248b65fcafa9a26d520"!==r){f("正在生成详细报告...");let i=await fetch(`${"deepseek"===t?"https://api.deepseek.com":"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:"deepseek"===t?"deepseek-chat":"gpt-4o",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!i.ok)throw Error(`API错误: ${i.status}`);let s=await i.json();c(s.choices[0].message.content)}else{f("正在生成详细报告（使用 DeepSeek AI）...");let t=await fetch("https://api.deepseek.com/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sk-570adfb7923a4248b65fcafa9a26d520"},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!t.ok)throw Error(`API错误: ${t.status}`);let r=await t.json();c(r.choices[0].message.content)}}catch(e){console.error("生成错误:",e),c(v(a))}finally{p(!1)}})()},[a]);let v=e=>{let t=n(e.age),r=e.personalYear?o(e.personalYear):o(1);return`# 🌟 生命数字战略蓝图

**${e.birthDate}**

---

★ 核心数字速览 ★

| 生命路径数 | 生日数 | 态度数 | 流年 |
|:---:|:---:|:---:|:---:|
| ${e.lifePath} | ${e.birthDay} | ${e.attitude} | ${e.personalYear} |

---

## 📜 总纲：一句话判词

> 你的人生主轨是 **${e.lifePath}**，你的触发方式是 **${e.attitude}**，而今年（${e.personalYear} 流年）逼你把 ${e.missingNumbersBirth.length>0?e.missingNumbersBirth[0]:"你的核心课题"} 从"缺口"做成"能力"。

---

## 🔮 第一章：出厂设置

### 1.1 人生主轨：${e.lifePath}

**${e.lifePath}号主轨** 意味着你天生倾向于用【战略性思维】来推进生活和工作。你最容易赢在【系统规划和长远布局】；你也最需要警惕【过度计划而行动迟缓】。

### 1.2 天赋九宫格

你的最强数字是 **${e.dominantNumber}**，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

| 数字 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 次数 | ${e.birthGridCounts[1]} | ${e.birthGridCounts[2]} | ${e.birthGridCounts[3]} | ${e.birthGridCounts[4]} | ${e.birthGridCounts[5]} | ${e.birthGridCounts[6]} | ${e.birthGridCounts[7]} | ${e.birthGridCounts[8]} | ${e.birthGridCounts[9]} |

---

## ⚙️ 第二章：运作方式

### 2.1 你的行动策略（生日数 ${e.birthDay}）

你的生日数决定了你解决问题的"默认手法"是【独立思考后行动】。

### 2.2 你的触发与沟通方式（态度数 ${e.attitude}）

你的 **${e.attitude} 号态度数** 让你在面对【挑战和压力】时立刻【激活防御反应】。

---

## 📚 第三章：缺失数/提升策略

${e.missingNumbersBirth.length>0?e.missingNumbersBirth.map((e,t)=>`
### 3.${t+1} 缺失数：${e}

数字 **${e}** 代表你人生某个需要"补课"的能力区。提升策略：识别触发条件 → 替代动作 → 复盘记录。
`).join(""):`
你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。
`}

---

## 🎯 第四章：${t}专项指南（${e.age}岁）

**阶段定位：** ${"天赋养育"===t?"成长关键期，原生能量的保护比任何成就都重要。":"赛道选择"===t?"学业和早期职业探索的黄金期，试错成本最低。":"黄金实战"===t?"土星回归前的立身之本，是建立事业和关系的核心期。":"天命整合"===t?'从"为生存而战"转向"为使命而活"的关键转折。':'从"被疗愈者"成为"疗愈者"。'}

---

## 🚀 第五章：本流年战略

### 5.1 流年主题总宣言

**【${e.personalYear} 流年】核心主题：${r.type}】

- **机会窗口：** ${r.opportunity}
- **风险预警：** ${r.risk}

---

## 🌟 结语

你的 **${e.lifePath}** 主轨决定了你终将走向【创造和引领】；你的 **${e.attitude}** 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数 **【${e.missingNumbersBirth.length>0?e.missingNumbersBirth.join("、"):"无"}】** 就是你今年要用训练完成的"升级钥匙"。

---

*报告生成：Life Numerology | lifenumerology.shop*
*（演示模式 - 配置API Key可生成完整报告）*`};return u?(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex flex-col items-center justify-center",children:(0,t.jsxs)("div",{className:"bg-white/90 rounded-3xl p-8 shadow-2xl max-w-md text-center",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-lg font-medium text-gray-800",children:h}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"预计需要 30-60 秒"})]})}):(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400",children:[(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb no-print fixed top-4 right-4 flex gap-2 z-50",children:[(0,t.jsx)("button",{onClick:()=>g(!0),className:"jsx-9d84ecf5143d8cfb bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 transition font-medium",children:"⚙️ 设置"}),(0,t.jsx)("button",{onClick:()=>{window.print()},className:"jsx-9d84ecf5143d8cfb bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 transition font-medium",children:"📄 下载PDF"})]}),m&&(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb no-print fixed inset-0 bg-black/50 flex items-center justify-center z-50",children:(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl",children:[(0,t.jsx)("h2",{className:"jsx-9d84ecf5143d8cfb text-xl font-bold text-gray-800 mb-4",children:"API 设置"}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb space-y-4",children:[(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb",children:[(0,t.jsx)("label",{className:"jsx-9d84ecf5143d8cfb block text-sm font-medium text-gray-700 mb-1",children:"API Key"}),(0,t.jsx)("input",{type:"password",value:y,onChange:e=>b(e.target.value),placeholder:"sk-...",className:"jsx-9d84ecf5143d8cfb w-full px-4 py-2 border rounded-lg"})]}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb",children:[(0,t.jsx)("label",{className:"jsx-9d84ecf5143d8cfb block text-sm font-medium text-gray-700 mb-1",children:"API供应商"}),(0,t.jsxs)("select",{value:x,onChange:e=>$(e.target.value),className:"jsx-9d84ecf5143d8cfb w-full px-4 py-2 border rounded-lg",children:[(0,t.jsx)("option",{value:"deepseek",className:"jsx-9d84ecf5143d8cfb",children:"DeepSeek"}),(0,t.jsx)("option",{value:"openai",className:"jsx-9d84ecf5143d8cfb",children:"OpenAI"})]})]}),(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb bg-yellow-50 p-3 rounded-lg text-sm text-yellow-700",children:"⚠️ 演示模式：未配置API Key时会生成示例报告"})]}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb flex gap-2 mt-6",children:[(0,t.jsx)("button",{onClick:()=>{localStorage.setItem("api_key",y),localStorage.setItem("api_provider",x),g(!1),window.location.reload()},className:"jsx-9d84ecf5143d8cfb flex-1 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700",children:"保存并重新生成"}),(0,t.jsx)("button",{onClick:()=>g(!1),className:"jsx-9d84ecf5143d8cfb px-4 py-2 border rounded-lg hover:bg-gray-50",children:"取消"})]})]})}),(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb max-w-3xl mx-auto px-4 py-8 pt-16",children:(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb bg-white rounded-3xl shadow-2xl p-8 md:p-12 report-content",children:[(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:function(e){if(!e)return"";let t=e.replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/^---$/gm,"<hr />").replace(/\n\n/g,"</p><p>").replace(/\|(.+)\|/g,e=>{let t=e.split("|").filter(e=>e.trim());if(t.some(e=>e.includes("---")))return"";let r=t.some(e=>e.includes("**")||e.match(/参数|值|说明|数字/))?"th":"td";return`<tr>${t.map(e=>`<${r}>${e.trim()}</${r}>`).join("")}</tr>`});return t=(t=t.replace(/(<li>.*?<\/li>)+/g,"<ul>$&</ul>")).replace(/(<tr>.*?<\/tr>)+/g,"<table>$&</table>"),t=`<p>${t}</p>`}(d)},className:"jsx-9d84ecf5143d8cfb"}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm",children:[(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb",children:"Life Numerology"}),(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb mt-1",children:"lifenumerology.shop"})]})]})}),(0,t.jsx)(r.default,{id:"9d84ecf5143d8cfb",children:".report-content{font-size:14px;line-height:1.8}.report-content h1{text-align:center;margin-bottom:1rem;font-family:Playfair Display,serif;font-size:28px;font-weight:700}.report-content h2{color:#7c3aed;border-bottom:2px solid #e9d5ff;margin-top:2rem;margin-bottom:1rem;padding-bottom:.5rem;font-size:20px;font-weight:600}.report-content h3{color:#4f46e5;margin-top:1.5rem;margin-bottom:.75rem;font-size:16px;font-weight:600}.report-content p{margin-bottom:.75rem}.report-content table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}.report-content th{color:#fff;text-align:center;background:#7c3aed;padding:8px 12px}.report-content td{text-align:center;border:1px solid #e5e7eb;padding:8px 12px}.report-content blockquote{color:#666;border-left:4px solid #9333ea;margin:1rem 0;padding-left:1rem;font-style:italic}.spinner{border:3px solid #9333ea4d;border-top-color:#9333ea;border-radius:50%;width:48px;height:48px;animation:1s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}"})]})}e.s(["default",0,function(){return(0,t.jsx)(i.Suspense,{fallback:(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex items-center justify-center",children:(0,t.jsx)("div",{className:"bg-white/90 rounded-3xl p-8 shadow-2xl",children:(0,t.jsx)("p",{className:"text-lg",children:"加载中..."})})}),children:(0,t.jsx)(a,{})})}],48705)}]);