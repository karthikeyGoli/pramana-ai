import { z } from 'zod'
import {
  ApiError,
  type ApiRequest,
  type ApiResponse,
  applyCors,
  handleOptions,
  logApiEvent,
  readJsonBody,
  requireMethod,
  sendJson,
} from '../src/server/apiUtils.js'
import { enforceRateLimit } from '../src/server/rateLimit.js'
import { formatZodError, productConcernSchema } from '../src/server/schemas.js'
import { getSupabaseAdmin } from '../src/server/supabaseAdmin.js'

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const start = Date.now()

  try {
    if (!applyCors(request, response)) return
    if (handleOptions(request, response)) return
    if (!requireMethod(request, response, 'POST')) return
    if (!enforceRateLimit(request, response, { name: 'product-concerns', limit: 12, windowMs: 60_000 })) return

    const payload = productConcernSchema.parse(await readJsonBody(request))
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('product_concerns')
      .insert({
        product_name: payload.productName,
        category: payload.category,
        concern: payload.concern,
        source: payload.source,
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    logApiEvent('info', 'product_concern_saved', {
      route: '/api/product-concerns',
      ms: Date.now() - start,
      concernId: data.id,
    })

    sendJson(response, 201, {
      ok: true,
      concern: {
        id: data.id,
        createdAt: data.created_at,
      },
    })
  } catch (error) {
    handleError(response, error, start)
  }
}

function handleError(response: ApiResponse, error: unknown, start: number) {
  if (error instanceof z.ZodError) {
    sendJson(response, 400, {
      ok: false,
      error: 'validation_failed',
      issues: formatZodError(error),
    })
    return
  }

  if (error instanceof ApiError) {
    sendJson(response, error.statusCode, {
      ok: false,
      error: error.code,
    })
    return
  }

  logApiEvent('error', 'request_failed', {
    route: '/api/product-concerns',
    ms: Date.now() - start,
    error: error instanceof Error ? error.message : 'unknown',
  })

  sendJson(response, 500, {
    ok: false,
    error: 'internal_error',
  })
}
