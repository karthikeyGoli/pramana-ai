import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, CheckCircle2, ScanLine, ShieldCheck } from 'lucide-react'
import { scanProducts } from '../data/pramana'
import { saveProductScan } from '../lib/pramanaBackend'

const toneStyles = {
  danger: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
}

const signalIcon = {
  flagged: AlertTriangle,
  mixed: ScanLine,
  clean: ShieldCheck,
}

export default function ScanDemo() {
  const [selectedId, setSelectedId] = useState(scanProducts[0].id)
  const [captureStatus, setCaptureStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const selected = scanProducts.find((product) => product.id === selectedId) ?? scanProducts[0]
  const SignalIcon = signalIcon[selected.signal]

  async function handleCaptureScan() {
    setCaptureStatus('saving')

    try {
      await saveProductScan({
        productName: selected.name,
        category: selected.category,
        imageMetadata: {
          demoImage: selected.image,
        },
        scanResult: {
          verdict: selected.verdict,
          signal: selected.signal,
          summary: selected.summary,
          action: selected.action,
          layers: selected.layers,
        },
        confidence: selected.signal === 'clean' ? 0.86 : selected.signal === 'mixed' ? 0.68 : 0.74,
        sources: selected.layers.map((layer) => layer.label),
      })
      setCaptureStatus('saved')
    } catch {
      setCaptureStatus('error')
    }
  }

  return (
    <div id="scanner" className="rounded-[2rem] border border-white/70 bg-white/90 p-4 shadow-pramana backdrop-blur-xl md:p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-light">
            Live scan demo
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">
            Validate before you trust
          </h3>
        </div>
        <motion.div
          animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-white shadow-green"
        >
          <ScanLine size={22} />
        </motion.div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {scanProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => {
              setSelectedId(product.id)
              setCaptureStatus('idle')
            }}
            className={`rounded-2xl border px-3 py-2 text-left text-xs font-semibold transition ${
              product.id === selectedId
                ? 'border-forest bg-pale text-forest'
                : 'border-stone-200 bg-white text-ink-muted hover:border-forest/40'
            }`}
          >
            {product.category}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mt-4 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-cream"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={selected.image}
              alt={selected.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">
                <SignalIcon size={14} />
                {selected.verdict}
              </div>
              <h4 className="mt-2 font-display text-2xl font-semibold text-white">
                {selected.name}
              </h4>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <p className="text-sm leading-relaxed text-ink-muted">{selected.summary}</p>
            <div className="grid gap-2">
              {selected.layers.map((layer) => (
                <div
                  key={layer.label}
                  className={`flex items-center justify-between rounded-2xl border px-3 py-2 text-xs font-semibold ${toneStyles[layer.tone]}`}
                >
                  <span>{layer.label}</span>
                  <span>{layer.value}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2 rounded-2xl bg-forest px-3 py-3 text-sm text-white">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-gold" />
              <span>{selected.action}</span>
            </div>
            <button
              type="button"
              onClick={handleCaptureScan}
              disabled={captureStatus === 'saving'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-forest/20 bg-white px-4 py-3 text-sm font-bold text-forest transition hover:border-forest/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {captureStatus === 'saving' ? 'Capturing...' : 'Capture this scan'}
            </button>
            {captureStatus === 'saved' && (
              <p className="text-xs font-semibold text-emerald-700">
                Scan captured for the production pipeline.
              </p>
            )}
            {captureStatus === 'error' && (
              <p className="text-xs font-semibold text-red-700">
                Scan capture is unavailable right now.
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
