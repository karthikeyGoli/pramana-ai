import { z } from 'zod'
import {
  type ApiRequest,
  type ApiResponse,
  applyCors,
  getBearerToken,
  handleOptions,
  logApiEvent,
  readJsonBody,
  requireMethod,
  sendJson,
} from '../src/server/apiUtils.js'
import { enforceRateLimit } from '../src/server/rateLimit.js'
import { formatZodError, healthIntakeSchema } from '../src/server/schemas.js'
import { getSupabaseAdmin, getSupabaseAuthClient } from '../src/server/supabaseAdmin.js'

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const start = Date.now()

  try {
    if (!applyCors(request, response)) return
    if (handleOptions(request, response)) return
    if (!requireMethod(request, response, 'POST')) return
    if (!enforceRateLimit(request, response, { name: 'health-intake', limit: 6, windowMs: 60_000 })) return

    const token = getBearerToken(request)

    if (!token) {
      sendJson(response, 401, {
        ok: false,
        error: 'auth_required',
      })
      return
    }

    const authClient = getSupabaseAuthClient()
    const { data: authData, error: authError } = await authClient.auth.getUser(token)
    const user = authData.user

    if (authError || !user?.email) {
      sendJson(response, 401, {
        ok: false,
        error: 'invalid_token',
      })
      return
    }

    const payload = healthIntakeSchema.parse(await readJsonBody(request, 20_000))
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase
      .from('health_intake_profiles')
      .upsert(
        {
          user_id: user.id,
          email: user.email.toLowerCase(),
          display_name: payload.displayName,
          age_range: payload.ageRange,
          sex_context: payload.sexContext,
          primary_goals: payload.primaryGoals,
          priority_areas: payload.priorityAreas,
          skin_context: payload.skinContext,
          hair_context: payload.hairContext,
          nutrition_pattern: payload.nutritionPattern,
          activity_level: payload.activityLevel,
          sleep_quality: payload.sleepQuality,
          stress_level: payload.stressLevel,
          allergies: payload.allergies,
          medications: payload.medications,
          known_conditions: payload.knownConditions,
          cycle_context: payload.cycleContext,
          ayurveda_interest: payload.ayurvedaInterest,
          consent_health_intake: payload.consentHealthIntake,
          consent_version: payload.consentVersion,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' },
      )
      .select('id, updated_at')
      .single()

    if (error) throw error

    await supabase.from('consent_events').insert({
      email: user.email.toLowerCase(),
      consent_type: 'health_intake',
      consent_version: payload.consentVersion,
      consented: true,
      source: 'pramana-ai-auth',
    })

    logApiEvent('info', 'health_intake_saved', {
      route: '/api/health-intake',
      ms: Date.now() - start,
      userId: user.id,
      intakeId: data.id,
    })

    sendJson(response, 201, {
      ok: true,
      intake: {
        id: data.id,
        updatedAt: data.updated_at,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      sendJson(response, 400, {
        ok: false,
        error: 'validation_failed',
        issues: formatZodError(error),
      })
      return
    }

    logApiEvent('error', 'health_intake_failed', {
      route: '/api/health-intake',
      ms: Date.now() - start,
      error: error instanceof Error ? error.message : 'unknown',
    })

    sendJson(response, 500, {
      ok: false,
      error: 'internal_error',
    })
  }
}
