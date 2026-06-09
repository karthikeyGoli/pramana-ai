/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WAITLIST_ENDPOINT?: string
  readonly VITE_PRODUCT_CONCERN_ENDPOINT?: string
  readonly VITE_PRODUCT_SCAN_ENDPOINT?: string
  readonly VITE_ENABLE_LOCAL_STORAGE_FALLBACK?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_PUBLIC_CONTACT_EMAIL?: string
}
