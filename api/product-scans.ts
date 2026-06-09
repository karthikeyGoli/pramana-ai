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
} from '../src/server/apiUtils'
import { enforceRateLimit } from '../src/server/rateLimit'
import { formatZodError, productScanSchema } from '../src/server/schemas'
import { getSupabaseAdmin } from '../src/server/supabaseAdmin'

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const start = Date.now()

  try {
    if (!applyCors(request, response)) return
    if (handleOptions(request, response)) return
    if (!requireMethod(request, response, 'POST')) return
    if (!enforceRateLimit(request, response, { name: 'product-scans', limit: 20, windowMs: 60_000 })) return

    const payload = productScanSchema.parse(await readJsonBody(request, 24_000))
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('product_scans')
      .insert({
        product_name: payload.productName,
        brand: payload.brand,
        category: payload.category,
        barcode: payload.barcode,
        ingredients_text: payload.ingredientsText,
        image_metadata: payload.imageMetadata,
        scan_result: payload.scanResult,
        confidence: payload.confidence,
        source_list: payload.sources,
        source: payload.source,
      })
      .select('id, created_at')
      .single()

    if (error) throw error

    logApiEvent('info', 'product_scan_saved', {
      route: '/api/product-scans',
      ms: Date.now() - start,
      scanId: data.id,
    })

    sendJson(response, 201, {
      ok: true,
      scan: {
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
    route: '/api/product-scans',
    ms: Date.now() - start,
    error: error instanceof Error ? error.message : 'unknown',
  })

  sendJson(response, 500, {
    ok: false,
    error: 'internal_error',
  })
}
