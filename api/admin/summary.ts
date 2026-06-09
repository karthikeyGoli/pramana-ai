import {
  type ApiRequest,
  type ApiResponse,
  applyCors,
  getBearerToken,
  handleOptions,
  logApiEvent,
  requireMethod,
  sendJson,
} from '../../src/server/apiUtils'
import { getAdminEmails, getSupabaseAdmin, getSupabaseAuthClient } from '../../src/server/supabaseAdmin'

export default async function handler(request: ApiRequest, response: ApiResponse) {
  const start = Date.now()

  try {
    if (!applyCors(request, response)) return
    if (handleOptions(request, response)) return
    if (!requireMethod(request, response, 'GET')) return

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
    const email = authData.user?.email?.toLowerCase()

    if (authError || !email) {
      sendJson(response, 401, {
        ok: false,
        error: 'invalid_token',
      })
      return
    }

    if (!getAdminEmails().includes(email)) {
      sendJson(response, 403, {
        ok: false,
        error: 'admin_forbidden',
      })
      return
    }

    const supabase = getSupabaseAdmin()
    const [
      waitlistCount,
      concernCount,
      scanCount,
      intakeCount,
      latestWaitlist,
      latestConcerns,
      latestScans,
      latestIntakes,
    ] = await Promise.all([
      getCount('waitlist_leads'),
      getCount('product_concerns'),
      getCount('product_scans'),
      getCount('health_intake_profiles'),
      supabase.from('waitlist_leads').select('id, email, goal, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('product_concerns').select('id, product_name, category, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('product_scans').select('id, product_name, category, confidence, created_at').order('created_at', { ascending: false }).limit(5),
      supabase.from('health_intake_profiles').select('id, email, primary_goals, priority_areas, updated_at').order('updated_at', { ascending: false }).limit(5),
    ])

    await supabase.from('admin_audit_events').insert({
      actor_email: email,
      action: 'summary.read',
      metadata: {
        route: '/api/admin/summary',
      },
    })

    logApiEvent('info', 'admin_summary_read', {
      route: '/api/admin/summary',
      ms: Date.now() - start,
      actorEmail: email,
    })

    sendJson(response, 200, {
      ok: true,
      waitlistCount,
      productConcernCount: concernCount,
      productScanCount: scanCount,
      healthIntakeCount: intakeCount,
      latestWaitlist: latestWaitlist.data ?? [],
      latestProductConcerns: latestConcerns.data ?? [],
      latestProductScans: latestScans.data ?? [],
      latestHealthIntakes: latestIntakes.data ?? [],
    })
  } catch (error) {
    logApiEvent('error', 'admin_summary_failed', {
      route: '/api/admin/summary',
      ms: Date.now() - start,
      error: error instanceof Error ? error.message : 'unknown',
    })

    sendJson(response, 500, {
      ok: false,
      error: 'internal_error',
    })
  }
}

async function getCount(table: string) {
  const supabase = getSupabaseAdmin()
  const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true })

  if (error) throw error
  return count ?? 0
}
