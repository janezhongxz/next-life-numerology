// Edge-runtime compatible D1 database wrapper
// In Cloudflare Pages: DB is a D1Database binding injected by wrangler.toml

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export { schema }

// Access Cloudflare D1 binding from context
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCloudflareEnv(): any {
  // Cloudflare Pages passes env via AsyncLocalStorage
  const store = globalThis[Symbol.for('__cloudflare-context__')]?.getStore?.()
  return store?.env
}

export function getDb() {
  // @ts-ignore - DB is injected by Cloudflare Pages at runtime
  if (typeof DB !== 'undefined') {
    return drizzle(DB, { schema })
  }

  // Try to get from Cloudflare context
  const env = getCloudflareEnv()
  const d1 = env?.DB

  if (d1) {
    // Store on global for reuse
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(globalThis as any).__DB__ = d1
    return drizzle(d1, { schema })
  }

  // Last resort: check if already cached
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cached = (globalThis as any).__DB__
  if (cached) return drizzle(cached, { schema })

  throw new Error('D1 database binding not found in any location: globalThis.DB, Cloudflare env.DB')
}
