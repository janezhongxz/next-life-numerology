# Life Numerology | 生命数字报告系统

> Powered by DeepSeek AI + Cloudflare D1 + Google OAuth

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器
# http://localhost:3000
```

## 项目结构

```
src/
├── app/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 入口页（计算器）
│   ├── globals.css     # 全局样式
│   └── report/
│       └── page.tsx    # 报告页
├── lib/
│   ├── calculator.ts   # 计算核心
│   ├── report-prompt.ts # Prompt模板
│   └── i18n.ts        # 国际化
```

## 功能

- ✅ 生命数字计算（毕达哥拉斯体系）
- ✅ 5个年龄档Prompt模板
- ✅ 报告生成（需配置API Key）
- ✅ PDF下载
- ✅ 中英双语
- 🔲 PayPal支付（待接入）

## 配置API Key

1. 打开报告页，点击右上角「设置」
2. 输入 OpenAI API Key
3. 选择模型（GPT-4o / GPT-4o-mini）
4. 保存后重新生成报告

## 部署

```bash
# Vercel (推荐)
npm i -g vercel
vercel

# 或 GitHub Pages
# push 后在 GitHub 仓库 Settings → Pages 配置
```

## License

MIT
