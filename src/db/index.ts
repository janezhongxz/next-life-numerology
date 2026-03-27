// Edge-runtime compatible D1 database wrapper
// In Cloudflare Pages: D1 bindings are injected on globalThis by the runtime
import { drizzle } from 'drizzle-orm/d1'
import * as schema from './schema'

export { schema }

export function getDb() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return drizzle((globalThis as any).DB, { schema })
}
