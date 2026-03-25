(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7078,(e,t,r)=>{},2220,(e,t,r)=>{var i=e.i(89732);e.r(7078);var n=e.r(7823),s=n&&"object"==typeof n&&"default"in n?n:{default:n},o=void 0!==i.default&&i.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,i=void 0===r?"stylesheet":r,n=t.optimizeForSpeed,s=void 0===n?o:n;u(a(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",u("boolean"==typeof s,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=s,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){u("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),u(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(u(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(u(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var r="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(i){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];u(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},r.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];u(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&u(a(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var n=document.head||document.getElementsByTagName("head")[0];return r?n.insertBefore(i,r):n.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function u(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},c={};function h(e,t){if(!t)return"jsx-"+e;var r=String(t),i=e+r;return c[i]||(c[i]="jsx-"+d(e+"-"+r)),c[i]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return c[r]||(c[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[r]}var m=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,i=void 0===r?null:r,n=t.optimizeForSpeed,s=void 0!==n&&n;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:s}),this._sheet.inject(),i&&"boolean"==typeof s&&(this._sheet.setOptimizeForSpeed(s),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),i=r.styleId,n=r.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var s=n.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=s,this._instancesCounts[i]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var i=this._fromServer&&this._fromServer[r];i?(i.parentNode.removeChild(i),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],i=e[1];return s.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,i=e.id;if(r){var n=h(i,r);return{styleId:n,rules:Array.isArray(t)?t.map(function(e){return p(n,e)}):[p(n,t)]}}return{styleId:h(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),f=n.createContext(null);function y(){return new m}function g(){return n.useContext(f)}f.displayName="StyleSheetContext";var $=s.default.useInsertionEffect||s.default.useLayoutEffect,b="u">typeof window?y():void 0;function _(e){var t=b||g();return t&&("u"<typeof window?t.add(e):$(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}_.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},r.StyleRegistry=function(e){var t=e.registry,r=e.children,i=n.useContext(f),o=n.useState(function(){return i||t||y()})[0];return s.default.createElement(f.Provider,{value:o},r)},r.createStyleRegistry=y,r.style=_,r.useStyleRegistry=g},81875,(e,t,r)=>{t.exports=e.r(2220).style},43452,(e,t,r)=>{t.exports=e.r(41688)},48705,e=>{"use strict";var t=e.i(36708),r=e.i(81875),i=e.i(7823),n=e.i(43452);function s(e){return e<18?"天赋养育":e<24?"赛道选择":e<40?"黄金实战":e<60?"天命整合":"智者传承"}function o(e){let t={1:{type:"破局与独立",opportunity:"新的开始、突破瓶颈",risk:"过于自我、冲动决策",keywords:["新生","突破","主导"]},2:{type:"合作与平衡",opportunity:"建立深度关系",risk:"犹豫不决",keywords:["合作","耐心","直觉"]},3:{type:"表达与创造",opportunity:"创意爆发、社交活跃",risk:"过于分散",keywords:["创造","表达","社交"]},4:{type:"根基与结构",opportunity:"建立稳定系统",risk:"过于保守",keywords:["稳定","积累","结构"]},5:{type:"自由与突破",opportunity:"突破限制、跨界探索",risk:"逃避责任",keywords:["突破","自由","变革"]},6:{type:"责任与和谐",opportunity:"导师角色、财富回流",risk:"过度承担",keywords:["责任","平衡","引领"]},7:{type:"内省与智慧",opportunity:"深度思考、精神成长",risk:"过于内收",keywords:["内省","智慧","疗愈"]},8:{type:"成就与丰盛",opportunity:"事业突破、财富显化",risk:"过度追逐",keywords:["成就","丰盛","扩张"]},9:{type:"整合与放下",opportunity:"结束旧篇章、智慧传承",risk:"沉溺过去",keywords:["放下","整合","圆融"]},11:{type:"启示与理想",opportunity:"灵感爆发、精神影响",risk:"不切实际",keywords:["启示","理想","赋能"]},22:{type:"大师课题",opportunity:"大型项目落地、改变世界",risk:"控制欲",keywords:["建设","传承","突破"]},33:{type:"慈悲课题",opportunity:"无条件给予、成为灯塔",risk:"过度牺牲",keywords:["慈悲","疗愈","灯塔"]}};return t[e]||t[1]}function a(){let e=(0,n.useSearchParams)(),[a,l]=(0,i.useState)(null),[u,d]=(0,i.useState)(""),[c,h]=(0,i.useState)(!0),[p,m]=(0,i.useState)("正在加载数据..."),[f,y]=(0,i.useState)(""),[g,$]=(0,i.useState)("deepseek");(0,i.useEffect)(()=>{let t=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520",r=localStorage.getItem("api_provider")||"deepseek";y(t),$(r);let i=e.get("data");if(!i)return void h(!1);try{let e=JSON.parse(decodeURIComponent(i));l(e)}catch(e){console.error("数据解析错误",e),h(!1)}},[e]),(0,i.useEffect)(()=>{a&&(async()=>{m("正在构建报告框架...");try{let e=function(e){let{birthDate:t,lifePath:r,attitude:i,birthDay:n,personalYear:a,birthGridCounts:l,missingNumbers:u,dominantNumber:d,age:c,question:h,lang:p="zh"}=e,m=s(c),f=u.length>0?u.join("、"):"无",y=a?o(a):o(1),g=new Date,$=`${g.getFullYear()}/${g.getMonth()+1}/${g.getDate()}`;return`【角色设定】
你是一位专业生命数字解读师，擅长毕达哥拉斯生命数字体系，拥有25年咨询经验。你的解读风格：犀利精准、有温度、接地气，既专业又让人听得懂。

【输入变量】
- 出生日期：${t}
- 生命路径数（主命数）：${r}
- 态度数：${i}
- 生日数：${n}
- 流年数字：${a||"未提供"}
- 天赋九宫格各数字出现次数：1出现${l[1]}次、2出现${l[2]}次、3出现${l[3]}次、4出现${l[4]}次、5出现${l[5]}次、6出现${l[6]}次、7出现${l[7]}次、8出现${l[8]}次、9出现${l[9]}次
- 最强数字：${d}
- 缺失数：${f}
- 用户年龄：${c}岁
- 年龄档：${m}
- 用户问题困惑：${h||"未提供"}

【输出语言】${"zh"===p?"简体中文":"English"}

【字数要求】5000字以上

【格式要求】
- 使用 Markdown 格式，但不要用表格
- 每个章节用 emoji 图标开头
- 重点句子用【】包裹
- 适当留白，分段清晰
- 数字解读用清晰的分行文字呈现，不用表格

【输出模板】

🌟 生命数字战略蓝图

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${r}         ${n}         ${i}         ${a||"-"}

---

📜 总纲：一句话判词

你的人生主轨是 ${r}，你的触发方式是 ${i}，而今年（${a||"?"} 流年）逼你把 ${u.length>0?u[0]:"你的核心课题"} 从"缺口"做成"能力"。

${h&&h.trim()?`

你提问的问题：
${h.trim()}
`:""}

---

核心参数一览

  生命路径数   ${r}   你的人生主轨：开创、独立、自我实现
  态度数       ${i}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${n}   你的行动默认模式：${8===n?"结果导向、权力、资源整合":1===n?"独立思考后行动":"协作与平衡"}
  流年         ${a||"未提供"}   今年的核心课题：${y.type}

缺失数   ${f}
今年要补的课：${u.length>0?u.map(e=>"数字"+e).join("、"):"无"}

---

🔮 第一章：出厂设置

1.1 人生主轨：${r}

${r}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字${d}出现了${Math.max(...Object.values(l))}次，这是你能量最强的核心引擎。这意味着你的"独立意志"和"开创力"是你的超级天赋，但同时也可能成为你的惯性陷阱。

1.2 天赋九宫格

你的最强数字是 ${d}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${l[1]}次
  数字2出现${l[2]}次
  数字3出现${l[3]}次
  数字4出现${l[4]}次
  数字5出现${l[5]}次
  数字6出现${l[6]}次
  数字7出现${l[7]}次
  数字8出现${l[8]}次
  数字9出现${l[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${n}）

你的生日数决定了你解决问题的"默认手法"是【${8===n?"结果导向、权力、资源整合":1===n?"独立思考后行动":2===n?"协作与感受":3===n?"创意表达":4===n?"稳定构建":5===n?"自由探索":6===n?"责任担当":7===n?"深度分析":"理想愿景"}】。

2.2 你的触发与沟通方式（态度数 ${i}）

你的态度数让你在面对挑战和压力时【${1===i?"立刻启动战斗模式":2===i?"变得情绪化、寻求支持":3===i?"用幽默回避":4===i?"收缩防御、追求稳定":5===i?"渴望自由、拒绝束缚":6===i?"承担过多、压抑情绪":7===i?"退缩分析、过度思考":8===i?"强势掌控、用权力解决问题":"被不公激惹、激发理想主义行动"}】。

---

📚 第三章：缺失数/提升策略

${u.length>0?u.map((e,t)=>`
数字${e}：你人生某个需要"补课"的能力区。

提升策略：
  Step A：识别触发条件
  Step B：替代动作
  Step C：复盘指标
`).join("\n\n"):'你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。'}

---

🎯 第四章：${m}专项指南（${c}岁）

**阶段定位：** ${"天赋养育"===m?"成长关键期，原生能量的保护比任何成就都重要。":"赛道选择"===m?"学业和早期职业探索的黄金期，试错成本最低。":"黄金实战"===m?"土星回归前的立身之本，是建立事业和关系的核心期。":"天命整合"===m?'从"为生存而战"转向"为使命而活"的关键转折。':'从"被疗愈者"成为"疗愈者"。'}

---

🚀 第五章：本流年战略

**【${a||"?"} 流年】核心主题：${y.type}**

  机会窗口：${y.opportunity}
  风险预警：${y.risk}
  今年关键词：${y.keywords.join(" / ")}

行动原则（5条）：
  原则1：用 **${r}** 的方式启动——做事前先找到你的核心动力
  原则2：用 **${i}** 处理触发——被激惹时先暂停再反应
  原则3：用 **${n}** 做验证——让行动可衡量、可复盘
  原则4：把缺失数 **【${f}】** 当作训练清单，每周至少练习1次
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

你的 ${r} 主轨决定了你终将走向【创造和引领】；你的 ${i} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${f}】就是你今年要用训练完成的"升级钥匙"。

当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${$}`}({birthDate:a.birthDate,lifePath:a.lifePath,attitude:a.attitude,birthDay:a.birthDay,personalYear:a.personalYear,birthGridCounts:a.birthGridCounts,missingNumbers:a.missingNumbersBirth,dominantNumber:a.dominantNumber,age:a.age,question:a.question,lang:"zh"}),t=localStorage.getItem("api_provider")||"deepseek",r=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520";if(r&&"sk-570adfb7923a4248b65fcafa9a26d520"!==r){m("正在生成详细报告...");let i=await fetch(`${"deepseek"===t?"https://api.deepseek.com":"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:"deepseek"===t?"deepseek-chat":"gpt-4o",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!i.ok)throw Error(`API错误: ${i.status}`);let n=await i.json();d(n.choices[0].message.content)}else{m("正在生成详细报告...");let t=await fetch("https://api.deepseek.com/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sk-570adfb7923a4248b65fcafa9a26d520"},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!t.ok)throw Error(`API错误: ${t.status}`);let r=await t.json();d(r.choices[0].message.content)}}catch(e){console.error("生成错误:",e),d(b(a))}finally{h(!1)}})()},[a]);let b=e=>{let t=s(e.age),r=e.personalYear?o(e.personalYear):o(1),i=e.missingNumbersBirth.length>0?e.missingNumbersBirth.join("、"):"无",n=new Date,a=`${n.getFullYear()}/${n.getMonth()+1}/${n.getDate()}`;return`🌟 生命数字战略蓝图

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${e.lifePath}         ${e.birthDay}         ${e.attitude}         ${e.personalYear}

---

📜 总纲：一句话判词

你的人生主轨是 ${e.lifePath}，你的触发方式是 ${e.attitude}，而今年（${e.personalYear} 流年）逼你把 ${e.missingNumbersBirth.length>0?e.missingNumbersBirth[0]:"你的核心课题"} 从"缺口"做成"能力"。

---

核心参数一览

  生命路径数   ${e.lifePath}   你的人生主轨：开创、独立、自我实现
  态度数       ${e.attitude}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${e.birthDay}   你的行动默认模式：结果导向、权力、资源整合
  流年         ${e.personalYear}   今年的核心课题：破局、新生、独立启动

缺失数   ${i}
今年要补的课：${e.missingNumbersBirth.length>0?e.missingNumbersBirth.map(e=>"数字"+e).join("、"):"无"}

---

🔮 第一章：出厂设置

1.1 人生主轨：${e.lifePath}

${e.lifePath}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字1出现了${e.birthGridCounts[1]}次，这是你能量最强的核心引擎。这意味着你的"独立意志"和"开创力"是你的超级天赋，但同时也可能成为你的惯性陷阱。

1.2 天赋九宫格

你的最强数字是 ${e.dominantNumber}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${e.birthGridCounts[1]}次（核心引擎）
  数字2出现${e.birthGridCounts[2]}次
  数字3出现${e.birthGridCounts[3]}次
  数字4出现${e.birthGridCounts[4]}次
  数字5出现${e.birthGridCounts[5]}次
  数字6出现${e.birthGridCounts[6]}次
  数字7出现${e.birthGridCounts[7]}次
  数字8出现${e.birthGridCounts[8]}次
  数字9出现${e.birthGridCounts[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${e.birthDay}）

你的生日数决定了你解决问题的"默认手法"是【${1===e.birthDay?"独立思考后行动":2===e.birthDay?"协作与感受":3===e.birthDay?"创意表达":4===e.birthDay?"稳定构建":5===e.birthDay?"自由探索":6===e.birthDay?"责任担当":7===e.birthDay?"深度分析":8===e.birthDay?"结果导向、权力、资源整合":"理想愿景"}】。

2.2 你的触发与沟通方式（态度数 ${e.attitude}）

你的态度数让你在面对挑战和压力时【${1===e.attitude?"立刻启动战斗模式":2===e.attitude?"变得情绪化、寻求支持":3===e.attitude?"用幽默回避":4===e.attitude?"收缩防御、追求稳定":5===e.attitude?"渴望自由、拒绝束缚":6===e.attitude?"承担过多、压抑情绪":7===e.attitude?"退缩分析、过度思考":8===e.attitude?"强势掌控、用权力解决问题":"被不公激惹、激发理想主义行动"}】。

---

📚 第三章：缺失数/提升策略

${e.missingNumbersBirth.length>0?e.missingNumbersBirth.map((e,t)=>`数字${e}：你人生某个需要"补课"的能力区。
提升策略：识别触发条件 → 替代动作 → 复盘记录。`).join("\n\n"):'你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。'}

---

🎯 第四章：${t}专项指南（${e.age}岁）

**阶段定位：** ${"天赋养育"===t?"成长关键期，原生能量的保护比任何成就都重要。":"赛道选择"===t?"学业和早期职业探索的黄金期，试错成本最低。":"黄金实战"===t?"土星回归前的立身之本，是建立事业和关系的核心期。":"天命整合"===t?'从"为生存而战"转向"为使命而活"的关键转折。':'从"被疗愈者"成为"疗愈者"。'}

---

🚀 第五章：本流年战略

**【${e.personalYear} 流年】核心主题：${r.type}**

  机会窗口：${r.opportunity}
  风险预警：${r.risk}

行动原则（5条）：
  原则1：用 **${e.lifePath}** 的方式启动——做事前先找到你的核心动力
  原则2：用 **${e.attitude}** 处理触发——被激惹时先暂停再反应
  原则3：用 **${e.birthDay}** 做验证——让行动可衡量、可复盘
  原则4：把缺失数 **【${i}】** 当作训练清单，每周至少练习1次
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

你的 ${e.lifePath} 主轨决定了你终将走向【创造和引领】；你的 ${e.attitude} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${i}】就是你今年要用训练完成的"升级钥匙"。

当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${a}`};return c?(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex flex-col items-center justify-center",children:(0,t.jsxs)("div",{className:"bg-white/90 rounded-3xl p-8 shadow-2xl max-w-md text-center",children:[(0,t.jsx)("div",{className:"spinner mx-auto mb-4"}),(0,t.jsx)("p",{className:"text-lg font-medium text-gray-800",children:p}),(0,t.jsx)("p",{className:"text-sm text-gray-500 mt-2",children:"预计需要 30-60 秒"})]})}):(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400",children:[(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb no-print fixed top-4 right-4 z-50",children:(0,t.jsx)("button",{onClick:()=>{window.print()},className:"jsx-9d84ecf5143d8cfb bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 transition font-medium",children:"📄 下载PDF"})}),(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb max-w-3xl mx-auto px-4 py-8 pt-16",children:(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb bg-white rounded-3xl shadow-2xl p-8 md:p-12 report-content",children:[(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:function(e){if(!e)return"";let t=e.replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/^---$/gm,"<hr />").replace(/\n\n/g,"</p><p>").replace(/\|(.+)\|/g,e=>{let t=e.split("|").filter(e=>e.trim());if(t.some(e=>e.includes("---")))return"";let r=t.some(e=>e.includes("**")||e.match(/参数|值|说明|数字/))?"th":"td";return`<tr>${t.map(e=>`<${r}>${e.trim()}</${r}>`).join("")}</tr>`});return t=(t=t.replace(/(<li>.*?<\/li>)+/g,"<ul>$&</ul>")).replace(/(<tr>.*?<\/tr>)+/g,"<table>$&</table>"),t=`<p>${t}</p>`}(u)},className:"jsx-9d84ecf5143d8cfb"}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm",children:[(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb",children:"Life Numerology"}),(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb mt-1",children:"lifenumerology.shop"})]})]})}),(0,t.jsx)(r.default,{id:"9d84ecf5143d8cfb",children:".report-content{font-size:14px;line-height:1.8}.report-content h1{text-align:center;margin-bottom:1rem;font-family:Playfair Display,serif;font-size:28px;font-weight:700}.report-content h2{color:#7c3aed;border-bottom:2px solid #e9d5ff;margin-top:2rem;margin-bottom:1rem;padding-bottom:.5rem;font-size:20px;font-weight:600}.report-content h3{color:#4f46e5;margin-top:1.5rem;margin-bottom:.75rem;font-size:16px;font-weight:600}.report-content p{margin-bottom:.75rem}.report-content table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}.report-content th{color:#fff;text-align:center;background:#7c3aed;padding:8px 12px}.report-content td{text-align:center;border:1px solid #e5e7eb;padding:8px 12px}.report-content blockquote{color:#666;border-left:4px solid #9333ea;margin:1rem 0;padding-left:1rem;font-style:italic}.spinner{border:3px solid #9333ea4d;border-top-color:#9333ea;border-radius:50%;width:48px;height:48px;animation:1s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}"})]})}e.s(["default",0,function(){return(0,t.jsx)(i.Suspense,{fallback:(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex items-center justify-center",children:(0,t.jsx)("div",{className:"bg-white/90 rounded-3xl p-8 shadow-2xl",children:(0,t.jsx)("p",{className:"text-lg",children:"加载中..."})})}),children:(0,t.jsx)(a,{})})}],48705)}]);