// Edge-runtime compatible D1 database wrapper
// In Cloudflare Pages: DB is a D1Database binding injected by wrangler.toml
// Usage: const db = getDb() - do NOT store as a global/module-level variable

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export { schema }

export function getDb(): ReturnType<typeof drizzle<typeof schema>> {
  // @ts-ignore - DB is injected by Cloudflare Pages at runtime
  return drizzle(DB, { schema })
}
