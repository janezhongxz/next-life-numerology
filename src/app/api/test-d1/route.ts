// Debug: test D1 REST API from within the worker
export async function GET() {
  const D1_API = 'https://api.cloudflare.com/client/v4/accounts/03bbff09eebb738294943ba14467fff9/d1/databases/6ef773d5-b683-48dc-953b-325d76bc4efa/query'
  const D1_TOKEN = 'cfut_WZJF1BNh4QH74e2kO3ZwF7oiQ60YayrV68IBQJkTcfd5e1b4'

  try {
    const res = await fetch(D1_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${D1_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql: 'SELECT id, google_id FROM users LIMIT 3',
        params: [],
      }),
    })

    const text = await res.text()
    let data
    try { data = JSON.parse(text) } catch { data = null }

    return Response.json({
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
      bodyLength: text.length,
      data,
      textPreview: text.substring(0, 300),
    })
  } catch (e) {
    return Response.json({
      error: String(e),
      message: e instanceof Error ? e.message : 'unknown',
    })
  }
}
