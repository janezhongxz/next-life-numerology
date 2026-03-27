// Edge-runtime compatible D1 database wrapper
// In Cloudflare Pages: DB is a D1Database binding injected by wrangler.toml
// Usage: const db = getDb() - do NOT store as a global/module-level variable

import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export { schema }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const DB: any

export function getDb(): ReturnType<typeof drizzle<typeof schema>> {
  const dbInstance = typeof DB !== 'undefined' ? DB : (globalThis as any).__DB__
  if (!dbInstance) {
    throw new Error('D1 database binding not found. Ensure DB is configured in wrangler.toml and deployed.')
  }
  // @ts-ignore - DB is injected by Cloudflare Pages at runtime
  return drizzle(dbInstance, { schema })
}
