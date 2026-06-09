export interface WaitlistPayload {
  name: string
  email: string
  goal: string
  productConcern: string
  consentPrivacy: boolean
  consentMarketing: boolean
}

export interface ProductConcernPayload {
  productName: string
  category: string
  concern: string
}

export interface ProductScanPayload {
  productName: string
  brand?: string
  category: string
  barcode?: string
  ingredientsText?: string
  imageMetadata?: Record<string, unknown>
  scanResult?: Record<string, unknown>
  confidence?: number
  sources?: string[]
}

const storageKey = 'pramana-waitlist-leads'
const concernStorageKey = 'pramana-product-concerns'
const scanStorageKey = 'pramana-product-scans'

export async function saveWaitlistLead(payload: WaitlistPayload) {
  const endpoint = import.meta.env.VITE_WAITLIST_ENDPOINT ?? '/api/waitlist'
  const lead = {
    ...payload,
    privacyPolicyVersion: '2026-06-09',
    createdAt: new Date().toISOString(),
    source: 'pramana-ai-landing',
  }

  try {
    await postJson(endpoint, lead)
    return { ...lead, synced: true, syncError: null }
  } catch (error) {
    if (!canUseDevStorageFallback()) throw error

    appendLocal(storageKey, lead)
    return {
      ...lead,
      synced: false,
      syncError: error instanceof Error ? error.message : 'Waitlist endpoint unavailable',
    }
  }
}

export async function saveProductConcern(payload: ProductConcernPayload) {
  const endpoint = import.meta.env.VITE_PRODUCT_CONCERN_ENDPOINT ?? '/api/product-concerns'
  const concern = {
    ...payload,
    createdAt: new Date().toISOString(),
    source: 'pramana-ai-demo',
  }

  try {
    await postJson(endpoint, concern)
    return { ...concern, synced: true }
  } catch (error) {
    if (!canUseDevStorageFallback()) throw error

    appendLocal(concernStorageKey, concern)
    return { ...concern, synced: false }
  }
}

export async function saveProductScan(payload: ProductScanPayload) {
  const endpoint = import.meta.env.VITE_PRODUCT_SCAN_ENDPOINT ?? '/api/product-scans'
  const scan = {
    ...payload,
    createdAt: new Date().toISOString(),
    source: 'pramana-ai-demo',
  }

  try {
    await postJson(endpoint, scan)
    return { ...scan, synced: true }
  } catch (error) {
    if (!canUseDevStorageFallback()) throw error

    appendLocal(scanStorageKey, scan)
    return { ...scan, synced: false }
  }
}

async function postJson(endpoint: string, payload: unknown) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }
}

function canUseDevStorageFallback() {
  return import.meta.env.DEV && import.meta.env.VITE_ENABLE_LOCAL_STORAGE_FALLBACK !== 'false'
}

function appendLocal(key: string, record: unknown) {
  const existing = safeParseArray(localStorage.getItem(key))
  localStorage.setItem(key, JSON.stringify([...existing, record]))
}

function safeParseArray(value: string | null) {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
