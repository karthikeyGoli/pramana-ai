import { getClientIp, sendJson, type ApiRequest, type ApiResponse } from './apiUtils.js'

interface RateLimitOptions {
  name: string
  limit: number
  windowMs: number
}

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function enforceRateLimit(
  request: ApiRequest,
  response: ApiResponse,
  options: RateLimitOptions,
) {
  const now = Date.now()
  const key = `${options.name}:${getClientIp(request)}`
  const current = buckets.get(key)

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + options.windowMs })
    response.setHeader('X-RateLimit-Limit', String(options.limit))
    response.setHeader('X-RateLimit-Remaining', String(options.limit - 1))
    return true
  }

  if (current.count >= options.limit) {
    response.setHeader('Retry-After', String(Math.ceil((current.resetAt - now) / 1000)))
    sendJson(response, 429, {
      ok: false,
      error: 'rate_limit_exceeded',
    })
    return false
  }

  current.count += 1
  response.setHeader('X-RateLimit-Limit', String(options.limit))
  response.setHeader('X-RateLimit-Remaining', String(Math.max(options.limit - current.count, 0)))
  return true
}
