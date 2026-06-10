import { applyCors, handleOptions, requireMethod, sendJson, type ApiRequest, type ApiResponse } from '../src/server/apiUtils.js'
import { hasSupabaseServerConfig } from '../src/server/supabaseAdmin.js'

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (!applyCors(request, response)) return
  if (handleOptions(request, response)) return
  if (!requireMethod(request, response, 'GET')) return

  sendJson(response, 200, {
    ok: true,
    service: 'pramana-api',
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'local',
    supabaseConfigured: hasSupabaseServerConfig(),
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    checkedAt: new Date().toISOString(),
  })
}
