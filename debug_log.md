# 项目调试备忘录 - Life Numerology

> 创建时间：2026-03-26
> 最后更新：2026-03-26 21:00

---

## 一、项目概况

**域名**：https://lifenumerology.shop
**GitHub**：https://github.com/janezhongxz/next-life-numerology
**框架**：Next.js 16 + Cloudflare Pages + D1 (SQLite)
**认证**：自建 Google OAuth（无 next-auth，自研 edge-compatible JWT session）

---

## 二、技术架构

### 认证流程
```
用户点击登录
  → GET /api/auth/login
  → 302 重定向到 Google OAuth
  → 用户授权
  → Google 回调 /api/auth/callback/google?code=xxx
  → 后端拿 code 换 token，拿 token 换用户信息
  → D1 users 表查找或创建用户
  → 创建 JWT session 存 D1 sessions 表
  → 设置 HttpOnly Cookie，跳转 /dashboard
```

### 核心文件
| 文件 | 作用 |
|------|------|
| `src/lib/auth/google.ts` | Google OAuth URL 生成、code 换 token、拿用户信息 |
| `src/lib/auth/session.ts` | JWT 签名/验证、D1 session CRUD |
| `src/lib/auth/index.ts` | 封装登录回调、登出、获取当前用户 |
| `src/db/schema.ts` | Drizzle ORM schema（users, accounts, sessions, calculations, verification_tokens） |
| `src/app/api/auth/login/route.ts` | 登录入口 |
| `src/app/api/auth/callback/google/route.ts` | Google 回调处理 |
| `src/app/api/auth/logout/route.ts` | 登出 |
| `src/app/api/auth/me/route.ts` | 获取当前登录用户 |
| `src/app/dashboard/page.tsx` | 登录后 dashboard 页面 |

### D1 数据库
- **名称**：life-numerology-db
- **ID**：6ef773d5-b683-48dc-953b-325d76bc4efa
- **表**：users, accounts, sessions, calculations, verification_tokens

### 环境变量（Cloudflare Pages Settings → Environment Variables）
| 变量名 | 值 | 类型 |
|--------|-----|------|
| `GOOGLE_CLIENT_ID` | `<YOUR_GOOGLE_CLIENT_ID>` | Secret |
| `GOOGLE_CLIENT_SECRET` | `<YOUR_GOOGLE_CLIENT_SECRET>` | Secret |
| `NEXTAUTH_URL` | https://lifenumerology.shop | Plain Text |
| `JWT_SECRET` | `<YOUR_JWT_SECRET>` | Secret |

---

## 三、已知问题 & 解决方案

### ❌ Google OAuth invalid_request（当前未解决）
**现象**：`redirect_uri=undefined/api/auth/callback/google`
**根因**：Cloudflare Pages 环境变量 `NEXTAUTH_URL` 未设置或未生效
**解决**：在 Cloudflare Dashboard 添加 `NEXTAUTH_URL` = `https://lifenumerology.shop`，Retry deployment

### ❌ Google OAuth "app doesn't comply"（当前未解决）
**现象**：You can't sign in to this app because it doesn't comply with Google's OAuth 2.0 policy
**根因**：Google OAuth App 处于 "Testing" 模式，未通过 Google 安全验证
**解决**：
1. 在 Google Cloud Console → OAuth consent screen → Test users，添加 `zxz69518289@gmail.com`
2. 或者如果长期使用，需提交 Google OAuth 验证（需要 Privacy Policy URL 等）

### ❌ Wrangler CLI 无法部署 Pages
**现象**：`Project not found` 或 `Authentication error`
**根因**：Workers API Token (`cfut_`) 无 Pages 管理权限
**解决**：目前通过 GitHub push → Cloudflare Dashboard 手动 Retry deployment 解决
**TODO**：需要创建一个包含 Pages 权限的 Account API Token（`cfat_`）实现完全自动化

---

## 四、Cloudflare API Token 清单

| Token | 前缀 | 权限 | 用途 |
|-------|------|------|------|
| Workers API Token | `cfut_` | Workers & Pages 运行时 | Pages 运行时访问（当前有效） |
| D1 API Token | `cfut_` | D1 数据库管理 | 创建/迁移 D1（有效） |
| ~~Zone API Token~~ | `cfat_` | DNS only | 已废弃，无法用于 D1 |
| Deploy Key | — | GitHub 读 | CI/CD 拉取代码 |

**缺失的 Token**：
- 需要一个 **Account API Token**（`cfat_`）包含 **Pages 部署** 权限，用于 GitHub Actions 自动部署

---

## 五、操作记录

### 2026-03-26
- 创建 D1 数据库 `life-numerology-db`（ID: 6ef773d5-b683-48dc-953b-325d76bc4efa）
- 推送 Drizzle schema 到 D1（users, accounts, sessions, calculations, verification_tokens）
- 因 next-auth v5 + @auth/drizzle-adapter + @opennextjs/cloudflare 三者 edge runtime 冲突，改用自研 OAuth
- 实现 edge-compatible JWT session（Drizzle + D1 + Web Crypto API）
- 添加 Google 登录按钮、dashboard 页面
- 两次 push 到 GitHub，Cloudflare 自动部署

---

## 六、GitHub Actions 自动化（TODO）

目前状态：**未完成**

问题：
- 仓库没有 `.github/workflows` 目录
- 需要 Account API Token（`cfat_`）包含 Pages 部署权限

步骤：
1. 在 Cloudflare Dashboard 创建一个包含 "Cloudflare Pages: Edit" 权限的 Account API Token
2. 在 GitHub 仓库 Settings → Secrets 添加 `CLOUDFLARE_API_TOKEN`
3. 我来创建 `.github/workflows/deploy.yml`

---

## 七、Google Cloud Console 配置确认

需确认以下配置正确：

### OAuth Consent Screen
- Publishing status：**Testing**（测试模式）或 **In production**（正式）
- Test users 列表包含：`zxz69518289@gmail.com`

### Credentials → Web Client ID
**Authorized redirect URIs** 必须包含：
```
https://lifenumerology.shop/api/auth/callback/google
```

**Authorized JavaScript origins** 必须包含：
```
https://lifenumerology.shop
```

---

## 八、测试检查清单

- [ ] `curl https://lifenumerology.shop/api/auth/login` → 返回 302，location 含正确 client_id 和 redirect_uri
- [ ] 点击登录 → Google 授权页面正常显示
- [ ] 授权后跳转 `/dashboard`，显示用户信息
- [ ] 刷新 `/dashboard` → 保持登录态
- [ ] 点击退出 → 清 cookie，回到首页
