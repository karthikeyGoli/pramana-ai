import { createServer } from 'node:http'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'

const __dirname = dirname(fileURLToPath(import.meta.url))
const storageDir = join(__dirname, 'storage')
const waitlistPath = join(storageDir, 'waitlist.json')
const concernsPath = join(storageDir, 'product-concerns.json')
const port = Number(process.env.PRAMANA_API_PORT ?? 8787)

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, 'utf8'))
  } catch (error) {
    if (error?.code === 'ENOENT') return []
    throw error
  }
}

async function appendJson(path, record) {
  await mkdir(storageDir, { recursive: true })
  const current = await readJson(path)
  const next = [
    ...current,
    {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...record,
    },
  ]
  await writeFile(path, `${JSON.stringify(next, null, 2)}\n`)
  return next.at(-1)
}

async function parseBody(request) {
  const chunks = []

  for await (const chunk of request) {
    chunks.push(chunk)
  }

  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

function send(response, statusCode, payload) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  })
  response.end(JSON.stringify(payload))
}

function validateLead(payload) {
  const errors = []

  if (!payload.name || String(payload.name).trim().length < 2) {
    errors.push('name is required')
  }

  if (!payload.email || !String(payload.email).includes('@')) {
    errors.push('valid email is required')
  }

  return errors
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url ?? '/', `http://${request.headers.host}`)

    if (request.method === 'OPTIONS') {
      send(response, 204, {})
      return
    }

    if (request.method === 'GET' && url.pathname === '/') {
      send(response, 200, {
        ok: true,
        service: 'pramana-api',
        message: 'Pramana API is running. Open the Vite app for the website UI.',
        appUrl: 'http://127.0.0.1:5177',
        routes: [
          'GET /api/health',
          'POST /api/waitlist',
          'POST /api/product-concerns',
          'GET /api/admin/summary',
        ],
      })
      return
    }

    if (request.method === 'GET' && url.pathname === '/api/health') {
      send(response, 200, {
        ok: true,
        service: 'pramana-api',
        storage: storageDir,
      })
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/waitlist') {
      const payload = await parseBody(request)
      const errors = validateLead(payload)

      if (errors.length) {
        send(response, 400, { ok: false, errors })
        return
      }

      const lead = await appendJson(waitlistPath, {
        name: String(payload.name).trim(),
        email: String(payload.email).trim().toLowerCase(),
        goal: String(payload.goal ?? '').trim(),
        productConcern: String(payload.productConcern ?? '').trim(),
        source: String(payload.source ?? 'pramana-ai-landing'),
      })

      send(response, 201, { ok: true, lead })
      return
    }

    if (request.method === 'POST' && url.pathname === '/api/product-concerns') {
      const payload = await parseBody(request)
      const concern = await appendJson(concernsPath, {
        productName: String(payload.productName ?? '').trim(),
        category: String(payload.category ?? '').trim(),
        concern: String(payload.concern ?? '').trim(),
        source: String(payload.source ?? 'pramana-ai-demo'),
      })

      send(response, 201, { ok: true, concern })
      return
    }

    if (request.method === 'GET' && url.pathname === '/api/admin/summary') {
      const [waitlist, concerns] = await Promise.all([
        readJson(waitlistPath),
        readJson(concernsPath),
      ])

      send(response, 200, {
        ok: true,
        waitlistCount: waitlist.length,
        productConcernCount: concerns.length,
        latestWaitlist: waitlist.slice(-5).reverse(),
        latestProductConcerns: concerns.slice(-5).reverse(),
      })
      return
    }

    send(response, 404, { ok: false, error: 'not found' })
  } catch (error) {
    send(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : 'unknown error',
    })
  }
})

server.listen(port, () => {
  console.log(`Pramana API listening on http://127.0.0.1:${port}`)
})
