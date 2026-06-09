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
import { getSupabaseAdmin } from '../src/server/supabaseAdmin'
import { formatZodError, waitlistSchema } from '../src/server/schemas'

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const start = Date.now()

  try {
    if (!applyCors(request, response)) return
    if (handleOptions(request, response)) return
    if (!requireMethod(request, response, 'POST')) return
    if (!enforceRateLimit(request, response, { name: 'waitlist', limit: 8, windowMs: 60_000 })) return

    const payload = waitlistSchema.parse(await readJsonBody(request))
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('waitlist_leads')
      .upsert(
        {
          name: payload.name,
          email: payload.email,
          goal: payload.goal,
          product_concern: payload.productConcern,
          consent_privacy: payload.consentPrivacy,
          consent_marketing: payload.consentMarketing,
          privacy_policy_version: payload.privacyPolicyVersion,
          source: payload.source,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' },
      )
      .select('id, created_at, updated_at')
      .single()

    if (error) throw error

    await supabase.from('consent_events').insert({
      email: payload.email,
      consent_type: 'waitlist_signup',
      consent_version: payload.privacyPolicyVersion,
      consented: true,
      source: payload.source,
    })

    logApiEvent('info', 'waitlist_saved', {
      route: '/api/waitlist',
      ms: Date.now() - start,
      leadId: data.id,
    })

    sendJson(response, 201, {
      ok: true,
      lead: {
        id: data.id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
    })
  } catch (error) {
    handleError(response, error, start, '/api/waitlist')
  }
}

function handleError(
  response: ApiResponse,
  error: unknown,
  start: number,
  route: string,
) {
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
    route,
    ms: Date.now() - start,
    error: error instanceof Error ? error.message : 'unknown',
  })

  sendJson(response, 500, {
    ok: false,
    error: 'internal_error',
  })
}
