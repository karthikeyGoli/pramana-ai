import type { IncomingMessage, ServerResponse } from 'node:http'

export interface ApiRequest extends IncomingMessage {
  body?: unknown
}

export interface ApiResponse extends ServerResponse {
  status(statusCode: number): ApiResponse
  json(payload: unknown): void
}

const defaultDevOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5177',
]

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
  ) {
    super(message)
  }
}

export function sendJson(response: ApiResponse, statusCode: number, payload: unknown) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.status(statusCode).json(payload)
}

export function applyCors(request: ApiRequest, response: ApiResponse) {
  const origin = request.headers.origin

  response.setHeader('Vary', 'Origin')
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.setHeader('Access-Control-Max-Age', '86400')

  if (!origin) return true

  if (getAllowedOrigins().has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    return true
  }

  sendJson(response, 403, {
    ok: false,
    error: 'origin_not_allowed',
  })
  return false
}

export function handleOptions(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'OPTIONS') return false
  response.status(204).end()
  return true
}

export function requireMethod(
  request: ApiRequest,
  response: ApiResponse,
  method: 'GET' | 'POST',
) {
  if (request.method === method) return true

  response.setHeader('Allow', method)
  sendJson(response, 405, {
    ok: false,
    error: 'method_not_allowed',
  })
  return false
}

export async function readJsonBody(request: ApiRequest, maxBytes = 16_384) {
  const contentLength = Number(request.headers['content-length'] ?? 0)

  if (contentLength > maxBytes) {
    throw new ApiError(413, 'payload_too_large', 'Payload is too large')
  }

  if (typeof request.body === 'string') {
    return request.body ? JSON.parse(request.body) : {}
  }

  if (Buffer.isBuffer(request.body)) {
    return request.body.length ? JSON.parse(request.body.toString('utf8')) : {}
  }

  if (request.body && typeof request.body === 'object') {
    return request.body
  }

  const chunks: Buffer[] = []
  let size = 0

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length

    if (size > maxBytes) {
      throw new ApiError(413, 'payload_too_large', 'Payload is too large')
    }

    chunks.push(buffer)
  }

  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export function getClientIp(request: ApiRequest) {
  const forwardedFor = request.headers['x-forwarded-for']
  const firstForwarded = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor
  return firstForwarded?.split(',')[0]?.trim() || request.socket.remoteAddress || 'unknown'
}

export function getBearerToken(request: ApiRequest) {
  const authHeader = request.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  return authHeader.slice('Bearer '.length).trim()
}

export function logApiEvent(
  level: 'info' | 'error',
  message: string,
  metadata: Record<string, unknown>,
) {
  const writer = level === 'error' ? console.error : console.log
  writer(
    JSON.stringify({
      level,
      message,
      at: new Date().toISOString(),
      ...metadata,
    }),
  )
}

function getAllowedOrigins() {
  const configured = splitEnvList(process.env.ALLOWED_ORIGINS)
  const publicUrl = process.env.PUBLIC_SITE_URL ? [process.env.PUBLIC_SITE_URL] : []
  const vercelUrl = process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []

  return new Set([...defaultDevOrigins, ...configured, ...publicUrl, ...vercelUrl])
}

function splitEnvList(value: string | undefined) {
  return (value ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}
