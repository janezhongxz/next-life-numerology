// D1 database wrapper using Cloudflare D1 REST API directly
// Bypasses globalThis.DB binding issues completely
import * as schema from './schema'

export { schema }

// Cloudflare D1 REST API config
const D1_API_URL = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/databases/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
const D1_AUTH_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

export interface D1Result {
  success: boolean
  results?: Array<Record<string, unknown>>
  errors?: Array<{ code: number; message: string }>
}

// Execute a SQL query against D1 REST API
export async function d1Query(sql: string, params?: unknown[]): Promise<D1Result> {
  const response = await fetch(D1_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${D1_AUTH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sql,
      params: params ?? [],
    }),
  })
  return response.json()
}

// Simple query builder that mimics basic drizzle operations
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDb() {
  return {
    select: () => ({
      from: (table: unknown) => ({
        where: (_cond: unknown) => ({
          get: async () => {
            const { eq } = await import('drizzle-orm').then(m => m)
            return undefined
          },
          all: async () => [],
          orderBy: () => ({ limit: () => ({ get: async () => [] }) }),
        }),
        all: async () => [],
        limit: () => ({ get: async () => undefined }),
      }),
    }),
    insert: (table: unknown) => ({
      values: async (_values: unknown) => ({ id: '' }),
    }),
    update: (table: unknown) => ({
      set: () => ({
        where: async () => ({}),
      }),
    }),
  })
}

// Placeholder - will be replaced with actual implementation
export const drizzle = getDb
