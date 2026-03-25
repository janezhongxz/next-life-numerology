(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7078,(e,t,r)=>{},2220,(e,t,r)=>{var i=e.i(89732);e.r(7078);var n=e.r(7823),s=n&&"object"==typeof n&&"default"in n?n:{default:n},o=void 0!==i.default&&i.default.env&&!0,a=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,i=void 0===r?"stylesheet":r,n=t.optimizeForSpeed,s=void 0===n?o:n;u(a(i),"`name` must be a string"),this._name=i,this._deletedRulePlaceholder="#"+i+"-deleted-rule____{}",u("boolean"==typeof s,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=s,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="u">typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){u("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),u(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(u(!this._injected,"sheet already injected"),this._injected=!0,"u">typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(u(a(e),"`insertRule` accepts only strings"),"u"<typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var i=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,i))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"u"<typeof window){var r="u">typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(i){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var i=this._tags[e];u(i,"old rule at index `"+e+"` not found"),i.textContent=t}return e},r.deleteRule=function(e){if("u"<typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];u(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"u">typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"u"<typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&u(a(t),"makeStyleTag accepts only strings as second parameter");var i=document.createElement("style");this._nonce&&i.setAttribute("nonce",this._nonce),i.type="text/css",i.setAttribute("data-"+e,""),t&&i.appendChild(document.createTextNode(t));var n=document.head||document.getElementsByTagName("head")[0];return r?n.insertBefore(i,r):n.appendChild(i),i},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(e.prototype,t),e}();function u(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},c={};function h(e,t){if(!t)return"jsx-"+e;var r=String(t),i=e+r;return c[i]||(c[i]="jsx-"+d(e+"-"+r)),c[i]}function p(e,t){"u"<typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return c[r]||(c[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[r]}var f=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,i=void 0===r?null:r,n=t.optimizeForSpeed,s=void 0!==n&&n;this._sheet=i||new l({name:"styled-jsx",optimizeForSpeed:s}),this._sheet.inject(),i&&"boolean"==typeof s&&(this._sheet.setOptimizeForSpeed(s),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"u">typeof window&&!this._fromServer&&(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),i=r.styleId,n=r.rules;if(i in this._instancesCounts){this._instancesCounts[i]+=1;return}var s=n.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[i]=s,this._instancesCounts[i]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var i=this._fromServer&&this._fromServer[r];i?(i.parentNode.removeChild(i),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],i=e[1];return s.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:i}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,i=e.id;if(r){var n=h(i,r);return{styleId:n,rules:Array.isArray(t)?t.map(function(e){return p(n,e)}):[p(n,t)]}}return{styleId:h(i),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=n.createContext(null);function y(){return new f}function g(){return n.useContext(m)}m.displayName="StyleSheetContext";var $=s.default.useInsertionEffect||s.default.useLayoutEffect,b="u">typeof window?y():void 0;function x(e){var t=b||g();return t&&("u"<typeof window?t.add(e):$(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}x.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},r.StyleRegistry=function(e){var t=e.registry,r=e.children,i=n.useContext(m),o=n.useState(function(){return i||t||y()})[0];return s.default.createElement(m.Provider,{value:o},r)},r.createStyleRegistry=y,r.style=x,r.useStyleRegistry=g},81875,(e,t,r)=>{t.exports=e.r(2220).style},43452,(e,t,r)=>{t.exports=e.r(41688)},48705,e=>{"use strict";var t=e.i(36708),r=e.i(81875),i=e.i(7823),n=e.i(43452);function s(e){return e<18?"天赋养育":e<24?"赛道选择":e<40?"黄金实战":e<60?"天命整合":"智者传承"}function o(e){let t={1:{type:"破局与独立",opportunity:"新的开始、突破瓶颈",risk:"过于自我、冲动决策",keywords:["新生","突破","主导"]},2:{type:"合作与平衡",opportunity:"建立深度关系",risk:"犹豫不决",keywords:["合作","耐心","直觉"]},3:{type:"表达与创造",opportunity:"创意爆发、社交活跃",risk:"过于分散",keywords:["创造","表达","社交"]},4:{type:"根基与结构",opportunity:"建立稳定系统",risk:"过于保守",keywords:["稳定","积累","结构"]},5:{type:"自由与突破",opportunity:"突破限制、跨界探索",risk:"逃避责任",keywords:["突破","自由","变革"]},6:{type:"责任与和谐",opportunity:"导师角色、财富回流",risk:"过度承担",keywords:["责任","平衡","引领"]},7:{type:"内省与智慧",opportunity:"深度思考、精神成长",risk:"过于内收",keywords:["内省","智慧","疗愈"]},8:{type:"成就与丰盛",opportunity:"事业突破、财富显化",risk:"过度追逐",keywords:["成就","丰盛","扩张"]},9:{type:"整合与放下",opportunity:"结束旧篇章、智慧传承",risk:"沉溺过去",keywords:["放下","整合","圆融"]},11:{type:"启示与理想",opportunity:"灵感爆发、精神影响",risk:"不切实际",keywords:["启示","理想","赋能"]},22:{type:"大师课题",opportunity:"大型项目落地、改变世界",risk:"控制欲",keywords:["建设","传承","突破"]},33:{type:"慈悲课题",opportunity:"无条件给予、成为灯塔",risk:"过度牺牲",keywords:["慈悲","疗愈","灯塔"]}};return t[e]||t[1]}function a(){let e=(0,n.useSearchParams)(),[a,l]=(0,i.useState)(null),[u,d]=(0,i.useState)(""),[c,h]=(0,i.useState)(!0),[p,f]=(0,i.useState)("正在加载数据..."),[m,y]=(0,i.useState)(0),[g,$]=(0,i.useState)(0),[b,x]=(0,i.useState)(""),[v,_]=(0,i.useState)("deepseek"),S=a?.lang==="en"?[{pct:10,text:"Connecting your life frequency..."},{pct:40,text:"Analyzing core number patterns..."},{pct:70,text:"Generating personalized insights..."},{pct:90,text:"Finalizing your blueprint..."}]:[{pct:10,text:"正在连接您的生命频率..."},{pct:40,text:"深度解析核心数字逻辑..."},{pct:70,text:"正在生成个性化成长建议..."},{pct:90,text:"报告装订中，惊喜即将呈现..."}],j=a?.lang==="en"?['"Every digit is a love letter from the universe to you."','"Your numbers never lie, but they do wait for you to listen."','"The cosmos speaks in vibrations — you are fluent in them."','"Behind every challenge is a hidden strength waiting to be discovered."','"Your unique frequency is exactly what the world needs."']:["每一个数字，都是宇宙写给你的一封信。","你的数字从不撒谎，它们只是在等你聆听。","宇宙用振动说话——而你，生来就听得懂。","每一个挑战背后，都藏着一个等待被发现的天赋。","你独特的频率，正是这个世界需要的。"];(0,i.useEffect)(()=>{if(!c)return void y(100);let e=[];[{pct:10,delay:0},{pct:40,delay:3e3},{pct:70,delay:8e3},{pct:90,delay:15e3},{pct:98,delay:25e3}].forEach(({pct:t,delay:r})=>{e.push(setTimeout(()=>y(t),r))});let t=setInterval(()=>{$(e=>(e+1)%j.length)},8e3);return()=>{e.forEach(clearTimeout),clearInterval(t)}},[c,a?.lang]),(0,i.useEffect)(()=>{let t=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520",r=localStorage.getItem("api_provider")||"deepseek";x(t),_(r);let i=e.get("data");if(!i)return void h(!1);try{let e=JSON.parse(decodeURIComponent(i));l(e)}catch(e){console.error("数据解析错误",e),h(!1)}},[e]),(0,i.useEffect)(()=>{a&&(async()=>{f("正在构建报告框架...");try{let e=function(e){let{birthDate:t,name:r,lifePath:i,attitude:n,birthDay:a,personalYear:l,birthGridCounts:u,missingNumbers:d,dominantNumber:c,age:h,question:p,lang:f="zh"}=e,m=s(h),y=d.length>0?d.join("、"):"无",g=l?o(l):o(1),$=new Date,b=`${$.getFullYear()}/${$.getMonth()+1}/${$.getDate()}`,x=t.split("-"),v=`${x[0]}年${parseInt(x[1])}月${parseInt(x[2])}日`;return`【角色设定】
你是一位专业生命数字解读师，擅长毕达哥拉斯生命数字体系，拥有25年咨询经验。你的解读风格：犀利精准、有温度、接地气，既专业又让人听得懂。

【输入变量】
- 姓名：${r}
- 出生日期：${v}（公历）
- 生命路径数（主命数）：${i}
- 态度数：${n}
- 生日数：${a}
- 流年数字：${l||"未提供"}
- 天赋九宫格各数字出现次数：1出现${u[1]}次、2出现${u[2]}次、3出现${u[3]}次、4出现${u[4]}次、5出现${u[5]}次、6出现${u[6]}次、7出现${u[7]}次、8出现${u[8]}次、9出现${u[9]}次
- 最强数字：${c}
- 缺失数：${y}
- 用户年龄：${h}岁（${m}）
- 用户问题困惑：${p||"未提供"}

【输出语言】${"zh"===f?"简体中文":"English"}

【字数要求】5000字以上

【格式要求】
- 使用 Markdown 格式，但不要用表格
- 每个章节用 emoji 图标开头
- 重点句子用【】包裹
- 适当留白，分段清晰
- 数字解读用清晰的分行文字呈现，不用表格

【输出模板】

🌟 生命数字战略蓝图：${r} | ${m}的${g.type}

基本情况：

  姓名：${r}
  出生年月日：${v}（公历）
  ${p&&p.trim()?`当前困惑/目标：
${p.trim()}`:""}

---

📜 总纲

你是 ${i}号主命（LifePath=${i}），用 **${a}号生日结果导向（BirthDay=${a}）** 做系统落地，用 **${n}号洞察与价值导向（Attitude=${n}）** 建立理解深度；但你当前的"动力来自业务不够"的根因是 **黑洞缺失数 ${y}**。

${y.includes("3")?'· 3：表达没有补成"可行动/可回应"的业务结构':""}
${y.includes("4")?'· 4：执行没有补成"稳定运行的节律系统"':""}

${l}（PersonalYear=${l}）会把机会推向：用你姓名里的天赋数字把洞察变成可行动表达、用快速试验迭代验证，再用最低运行线把你从断档里拉出来。

---

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${i}         ${a}         ${n}         ${l||"-"}

---

核心参数一览

  生命路径数   ${i}   你的人生主轨：开创、独立、自我实现
  态度数       ${n}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${a}   你的行动默认模式：${8===a?"结果导向、权力、资源整合":1===a?"独立思考后行动":2===a?"协作与感受":3===a?"创意表达":4===a?"稳定构建":5===a?"自由探索":6===a?"责任担当":7===a?"深度分析":"理想愿景"}
  流年         ${l||"未提供"}   今年的核心课题：${g.type}

缺失数   ${y}
今年要补的课：${d.length>0?d.map(e=>"数字"+e).join("、"):"无"}

---

🔮 第一章：出厂设置

1.1 人生主轨：${i}

${i}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字${c}出现了${Math.max(...Object.values(u))}次，这是你能量最强的核心引擎。

1.2 天赋九宫格

你的最强数字是 ${c}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${u[1]}次
  数字2出现${u[2]}次
  数字3出现${u[3]}次
  数字4出现${u[4]}次
  数字5出现${u[5]}次
  数字6出现${u[6]}次
  数字7出现${u[7]}次
  数字8出现${u[8]}次
  数字9出现${u[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${a}）

你的生日数决定了你解决问题的"默认手法"是【${8===a?"结果导向、权力、资源整合":1===a?"独立思考后行动":2===a?"协作与感受":3===a?"创意表达":4===a?"稳定构建":5===a?"自由探索":6===a?"责任担当":7===a?"深度分析":"理想愿景"}】。

2.2 你的触发与沟通方式（态度数 ${n}）

你的态度数让你在面对挑战和压力时【${1===n?"立刻启动战斗模式":2===n?"变得情绪化、寻求支持":3===n?"用幽默回避":4===n?"收缩防御、追求稳定":5===n?"渴望自由、拒绝束缚":6===n?"承担过多、压抑情绪":7===n?"退缩分析、过度思考":8===n?"强势掌控、用权力解决问题":"被不公激惹、激发理想主义行动"}】。

---

📚 第三章：缺失数/提升策略

${d.length>0?d.map((e,t)=>`
数字${e}：你人生某个需要"补课"的能力区。

提升策略：
  Step A：识别触发条件
  Step B：替代动作
  Step C：复盘指标
`).join("\n\n"):'你没有出生缺失数——这意味着你的人生没有明显的"天赋缺口"。'}

---

🎯 第四章：${m}专项指南（${h}岁）

**阶段定位：** ${"天赋养育"===m?"成长关键期，原生能量的保护比任何成就都重要。":"赛道选择"===m?"学业和早期职业探索的黄金期，试错成本最低。":"黄金实战"===m?"土星回归前的立身之本，是建立事业和关系的核心期。":"天命整合"===m?'从"为生存而战"转向"为使命而活"的关键转折。':'从"被疗愈者"成为"疗愈者"。'}

---

🚀 第五章：本流年战略

**【${l||"?"} 流年】核心主题：${g.type}**

  机会窗口：${g.opportunity}
  风险预警：${g.risk}
  今年关键词：${g.keywords.join(" / ")}

行动原则（5条）：
  原则1：用 **${i}** 的方式启动——做事前先找到你的核心动力
  原则2：用 **${n}** 处理触发——被激惹时先暂停再反应
  原则3：用 **${a}** 做验证——让行动可衡量、可复盘
  原则4：把缺失数 **【${y}】** 当作训练清单，每周至少练习1次
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

你的 ${i} 主轨决定了你终将走向【创造和引领】；你的 ${n} 触发机制决定了你会在【被否定】时变得强或失控。

而缺失数【${y}】就是你今年要用训练完成的"升级钥匙"。

当你真正理解了这个课题，你会发现：所有的缺失，都是伪装的礼物。

---

报告生成：Life Numerology | lifenumerology.shop
日期：${b}`}({birthDate:a.birthDate,name:a.name,lifePath:a.lifePath,attitude:a.attitude,birthDay:a.birthDay,personalYear:a.personalYear,birthGridCounts:a.birthGridCounts,missingNumbers:a.karmicLessons,dominantNumber:a.dominantNumber,age:a.age,question:a.question,lang:a.lang||"zh"}),t=localStorage.getItem("api_provider")||"deepseek",r=localStorage.getItem("api_key")||"sk-570adfb7923a4248b65fcafa9a26d520";if(r&&"sk-570adfb7923a4248b65fcafa9a26d520"!==r){f("正在生成详细报告...");let i=await fetch(`${"deepseek"===t?"https://api.deepseek.com":"https://api.openai.com/v1"}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r}`},body:JSON.stringify({model:"deepseek"===t?"deepseek-chat":"gpt-4o",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!i.ok)throw Error(`API错误: ${i.status}`);let n=await i.json();d(n.choices[0].message.content)}else{f("正在生成详细报告...");let t=await fetch("https://api.deepseek.com/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer sk-570adfb7923a4248b65fcafa9a26d520"},body:JSON.stringify({model:"deepseek-chat",messages:[{role:"user",content:e}],temperature:.7,max_tokens:4e3})});if(!t.ok)throw Error(`API错误: ${t.status}`);let r=await t.json();d(r.choices[0].message.content)}}catch(e){console.error("生成错误:",e),d(w(a))}finally{h(!1)}})()},[a]);let w=e=>{let t=s(e.age),r=e.personalYear?o(e.personalYear):o(1),i=e.karmicLessons.length>0?e.karmicLessons.join("、"):"无";e.lang;let n=new Date,a=`${n.getFullYear()}/${n.getMonth()+1}/${n.getDate()}`,l=e.birthDate.split("-"),u=`${l[0]}年${parseInt(l[1])}月${parseInt(l[2])}日`;return`🌟 生命数字战略蓝图：${e.name} | ${t}的${r.type}

基本情况：

  姓名：${e.name}
  出生年月日：${u}（公历）
  ${e.question&&e.question.trim()?`当前困惑/目标：
${e.question.trim()}`:""}

---

📜 总纲

你是 ${e.lifePath}号主命（LifePath=${e.lifePath}），用 **${e.birthDay}号生日结果导向（BirthDay=${e.birthDay}）** 做系统落地，用 **${e.attitude}号洞察与价值导向（Attitude=${e.attitude}）** 建立理解深度；但你当前的"动力来自业务不够"的根因是 **黑洞缺失数 ${i}**。

\xb7 ${i.includes("3")?'3：表达没有补成"可行动/可回应"的业务结构':""}
\xb7 ${i.includes("4")?'4：执行没有补成"稳定运行的节律系统"':""}

${e.personalYear}（PersonalYear=${e.personalYear}）会把机会推向：用你姓名里的天赋数字把洞察变成可行动表达、用快速试验迭代验证，再用最低运行线把你从断档里拉出来。

---

★ 核心数字速览 ★

  生命路径数   生日数   态度数   流年
      ${e.lifePath}         ${e.birthDay}         ${e.attitude}         ${e.personalYear}

---

核心参数一览

  生命路径数   ${e.lifePath}   你的人生主轨：开创、独立、自我实现
  态度数       ${e.attitude}   你如何被触发：大爱、理想、易被不公激惹
  生日数       ${e.birthDay}   你的行动默认模式：结果导向、权力、资源整合
  流年         ${e.personalYear}   今年的核心课题：${r.type}

缺失数   ${i}
今年要补的课：${e.karmicLessons.length>0?e.karmicLessons.map(e=>"数字"+e).join("、"):"无"}

---

🔮 第一章：出厂设置

1.1 人生主轨：${e.lifePath}

${e.lifePath}号主轨意味着你天生倾向于用【开创、独立和自我证明】来推进生活和工作。你骨子里的信条是"我命由我不由天"——独立启动一件事、在无人区开辟新路、成为第一个吃螃蟹的人，是你最舒服、也最能发光的状态。

你最容易赢在：人生的起点、项目的开端、任何需要"从0到1"的突破性时刻。
你最需要警惕：因过度强调自我而导致的孤立、因不愿示弱而独自硬扛、因总想当"第一"而陷入无谓的竞争。

你的天赋九宫格中，数字${e.dominantNumber}出现了${Math.max(...Object.values(e.birthGridCounts))}次，这是你能量最强的核心引擎。

1.2 天赋九宫格

你的最强数字是 ${e.dominantNumber}，它像是你的"发射台"——每次你把能量对准它，事情就会自动顺利。

九宫格数字分布：
  数字1出现${e.birthGridCounts[1]}次
  数字2出现${e.birthGridCounts[2]}次
  数字3出现${e.birthGridCounts[3]}次
  数字4出现${e.birthGridCounts[4]}次
  数字5出现${e.birthGridCounts[5]}次
  数字6出现${e.birthGridCounts[6]}次
  数字7出现${e.birthGridCounts[7]}次
  数字8出现${e.birthGridCounts[8]}次
  数字9出现${e.birthGridCounts[9]}次
  数字9出现${e.birthGridCounts[9]}次

---

⚙️ 第二章：运作方式

2.1 你的行动策略（生日数 ${e.birthDay}）

你的生日数决定了你解决问题的"默认手法"是【${1===e.birthDay?"独立思考后行动":2===e.birthDay?"协作与感受":3===e.birthDay?"创意表达":4===e.birthDay?"稳定构建":5===e.birthDay?"自由探索":6===e.birthDay?"责任担当":7===e.birthDay?"深度分析":8===e.birthDay?"结果导向、权力、资源整合":"理想愿景"}】。

2.2 你的触发与沟通方式（态度数 ${e.attitude}）

你的态度数让你在面对挑战和压力时【${1===e.attitude?"立刻启动战斗模式":2===e.attitude?"变得情绪化、寻求支持":3===e.attitude?"用幽默回避":4===e.attitude?"收缩防御、追求稳定":5===e.attitude?"渴望自由、拒绝束缚":6===e.attitude?"承担过多、压抑情绪":7===e.attitude?"退缩分析、过度思考":8===e.attitude?"强势掌控、用权力解决问题":"被不公激惹、激发理想主义行动"}】。

---

📚 第三章：缺失数/提升策略

${e.karmicLessons.length>0?e.karmicLessons.map((e,t)=>`数字${e}：你人生某个需要"补课"的能力区。
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
日期：${a}`};if(c){let e=a?.lang==="en",i=S.filter(e=>m>=e.pct).pop();return(0,t.jsxs)("div",{className:"jsx-b6b9046220397d1e min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex flex-col items-center justify-center breathing-bg",children:[(0,t.jsxs)("div",{className:"jsx-b6b9046220397d1e bg-white/90 rounded-3xl p-8 shadow-2xl max-w-md text-center",children:[(0,t.jsx)("h2",{className:"jsx-b6b9046220397d1e font-display text-xl font-bold text-gray-800 mb-2",children:e?"Crafting Your Blueprint":"正在为您精心绘就"}),(0,t.jsx)("p",{className:"jsx-b6b9046220397d1e text-sm text-gray-500 mb-6",children:e?"Life Numerology Report":"生命数字战略蓝图"}),(0,t.jsx)("div",{className:"jsx-b6b9046220397d1e w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden",children:(0,t.jsx)("div",{style:{width:`${m}%`},className:"jsx-b6b9046220397d1e h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"})}),(0,t.jsx)("p",{className:"jsx-b6b9046220397d1e text-base font-medium text-purple-700 mb-4",children:i?.text||(e?"Initializing...":"正在初始化...")}),(0,t.jsx)("div",{className:"jsx-b6b9046220397d1e flex justify-center gap-3 mb-6",children:[1,2,3,4,5,6,7,8,9].map(e=>(0,t.jsx)("span",{style:{animationDelay:`${.1*e}s`},className:"jsx-b6b9046220397d1e text-2xl font-bold text-purple-400 animate-pulse",children:e},e))}),(0,t.jsx)("p",{className:"jsx-b6b9046220397d1e text-gray-500 italic text-sm px-4 quote-rotate",children:j[g]})]}),(0,t.jsx)(r.default,{id:"b6b9046220397d1e",children:"@keyframes breathe{0%,to{opacity:1;transform:scale(1)}50%{opacity:.8;transform:scale(1.02)}}.breathing-bg.jsx-b6b9046220397d1e{animation:4s ease-in-out infinite breathe}@keyframes quoteFade{0%{opacity:0;transform:translateY(5px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-5px)}}.quote-rotate.jsx-b6b9046220397d1e{animation:8s ease-in-out forwards quoteFade}"})]})}return(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400",children:[(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb no-print fixed top-4 right-4 z-50",children:(0,t.jsx)("button",{onClick:()=>{window.print()},className:"jsx-9d84ecf5143d8cfb bg-white text-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-50 transition font-medium",children:"📄 下载PDF"})}),(0,t.jsx)("div",{className:"jsx-9d84ecf5143d8cfb max-w-3xl mx-auto px-4 py-8 pt-16",children:(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb bg-white rounded-3xl shadow-2xl p-8 md:p-12 report-content",children:[(0,t.jsx)("div",{dangerouslySetInnerHTML:{__html:function(e){if(!e)return"";let t=e.replace(/^# (.+)$/gm,"<h1>$1</h1>").replace(/^## (.+)$/gm,"<h2>$1</h2>").replace(/^### (.+)$/gm,"<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*(.+?)\*/g,"<em>$1</em>").replace(/^> (.+)$/gm,"<blockquote>$1</blockquote>").replace(/^- (.+)$/gm,"<li>$1</li>").replace(/^---$/gm,"<hr />").replace(/\n\n/g,"</p><p>").replace(/\|(.+)\|/g,e=>{let t=e.split("|").filter(e=>e.trim());if(t.some(e=>e.includes("---")))return"";let r=t.some(e=>e.includes("**")||e.match(/参数|值|说明|数字/))?"th":"td";return`<tr>${t.map(e=>`<${r}>${e.trim()}</${r}>`).join("")}</tr>`});return t=(t=t.replace(/(<li>.*?<\/li>)+/g,"<ul>$&</ul>")).replace(/(<tr>.*?<\/tr>)+/g,"<table>$&</table>"),t=`<p>${t}</p>`}(u)},className:"jsx-9d84ecf5143d8cfb"}),(0,t.jsxs)("div",{className:"jsx-9d84ecf5143d8cfb mt-12 pt-6 border-t border-gray-200 text-center text-gray-400 text-sm",children:[(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb",children:"Life Numerology"}),(0,t.jsx)("p",{className:"jsx-9d84ecf5143d8cfb mt-1",children:"lifenumerology.shop"})]})]})}),(0,t.jsx)(r.default,{id:"9d84ecf5143d8cfb",children:".report-content{font-size:14px;line-height:1.8}.report-content h1{text-align:center;margin-bottom:1rem;font-family:Playfair Display,serif;font-size:28px;font-weight:700}.report-content h2{color:#7c3aed;border-bottom:2px solid #e9d5ff;margin-top:2rem;margin-bottom:1rem;padding-bottom:.5rem;font-size:20px;font-weight:600}.report-content h3{color:#4f46e5;margin-top:1.5rem;margin-bottom:.75rem;font-size:16px;font-weight:600}.report-content p{margin-bottom:.75rem}.report-content table{border-collapse:collapse;width:100%;margin:1rem 0;font-size:13px}.report-content th{color:#fff;text-align:center;background:#7c3aed;padding:8px 12px}.report-content td{text-align:center;border:1px solid #e5e7eb;padding:8px 12px}.report-content blockquote{color:#666;border-left:4px solid #9333ea;margin:1rem 0;padding-left:1rem;font-style:italic}.spinner{border:3px solid #9333ea4d;border-top-color:#9333ea;border-radius:50%;width:48px;height:48px;animation:1s linear infinite spin}@keyframes spin{to{transform:rotate(360deg)}}"})]})}e.s(["default",0,function(){return(0,t.jsx)(i.Suspense,{fallback:(0,t.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-purple-500 via-indigo-500 to-orange-400 flex items-center justify-center",children:(0,t.jsx)("div",{className:"bg-white/90 rounded-3xl p-8 shadow-2xl",children:(0,t.jsx)("p",{className:"text-lg",children:"加载中..."})})}),children:(0,t.jsx)(a,{})})}],48705)}]);