import { createClient } from '@supabase/supabase-js'

const clientOptions = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'pramana-ai-vercel-api',
    },
  },
}

export function hasSupabaseServerConfig() {
  return Boolean(process.env.SUPABASE_URL && getSupabaseServiceKey())
}

export function getSupabaseAdmin() {
  const supabaseUrl = getRequiredEnv('SUPABASE_URL')
  const serviceKey = getSupabaseServiceKey()

  if (!serviceKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is required')
  }

  return createClient(supabaseUrl, serviceKey, clientOptions)
}

export function getSupabaseAuthClient() {
  return createClient(
    getRequiredEnv('SUPABASE_URL'),
    getRequiredEnv('SUPABASE_ANON_KEY'),
    clientOptions,
  )
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

function getRequiredEnv(name: string) {
  const value = process.env[name]

  if (!value) {
    throw new Error(`${name} is required`)
  }

  return value
}

function getSupabaseServiceKey() {
  return process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY
}
