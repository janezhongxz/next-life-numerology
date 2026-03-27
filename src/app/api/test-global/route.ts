// Debug: test what globalThis.DB returns
export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = (globalThis as any).DB
  return Response.json({
    dbType: typeof db,
    dbKeys: db ? Object.keys(db) : null,
    hasPrepare: db?.prepare ? true : false,
    constructor: db?.constructor?.name,
  })
}
