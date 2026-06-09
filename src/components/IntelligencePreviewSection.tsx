import { motion } from 'framer-motion'
import {
  Activity,
  CalendarDays,
  FileText,
  HeartPulse,
  LockKeyhole,
  Share2,
  Watch,
} from 'lucide-react'
import { doctorSummarySignals, doctorTimeline, evidenceCards } from '../data/pramana'

const evidenceLoop = [...evidenceCards, ...evidenceCards]

export default function IntelligencePreviewSection() {
  return (
    <section className="overflow-hidden bg-pale py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-forest shadow-soft">
              <Watch size={14} />
              Signals in motion
            </span>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink md:text-5xl text-balance">
              From daily body intelligence to a doctor-ready story.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
              Pramana can turn scattered product scans, skin logs, wearable signals,
              food context, and wellness patterns into one clean timeline. Useful for
              you today, shareable with a professional later.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              { icon: HeartPulse, label: 'Daily readiness' },
              { icon: Activity, label: 'Gut-skin-stress links' },
              { icon: LockKeyhole, label: 'Consent-first sharing' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white bg-white/80 p-4 shadow-soft"
              >
                <item.icon size={20} className="text-forest" />
                <p className="mt-3 text-sm font-bold text-ink">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-10 h-[360px] overflow-hidden rounded-[2rem] border border-white bg-cream p-4 shadow-pramana">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-cream to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-cream to-transparent" />
            <motion.div
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="grid gap-4"
            >
              {evidenceLoop.map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
                  whileHover={{ scale: 1.015 }}
                  className="group grid grid-cols-[112px_1fr] overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-soft"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-28 w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="flex min-w-0 flex-col justify-center p-4">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-pale px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-forest">
                        {card.tag}
                      </span>
                      <span className="truncate text-xs font-semibold text-ink-faint">
                        {card.status}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-muted">
                      Claim, context, and confidence move into the trust graph.
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-forest/10 bg-white p-5 shadow-pramana md:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-forest-light">
                Doctor Summary Mode
              </span>
              <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                30-day body intelligence card
              </h3>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold">
              <FileText size={22} />
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-cream p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink">Consult-ready overview</p>
                <p className="text-xs text-ink-faint">User-controlled export preview</p>
              </div>
              <span className="rounded-full bg-pale px-3 py-1 text-xs font-bold text-forest">
                Not diagnosis
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {doctorSummarySignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl border border-stone-200 bg-white p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
                    {signal.label}
                  </div>
                  <div className="mt-2 font-display text-2xl font-semibold text-forest">
                    {signal.value}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{signal.detail}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-stone-200 p-5">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-ink">
              <CalendarDays size={17} className="text-forest" />
              Pattern timeline
            </div>
            <div className="space-y-3">
              {doctorTimeline.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pale text-xs font-bold text-forest">
                      {index + 1}
                    </div>
                    {index < doctorTimeline.length - 1 && (
                      <div className="mt-1 h-7 w-px bg-stone-200" />
                    )}
                  </div>
                  <p className="pt-1 text-sm text-ink-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-forest px-5 py-3 text-sm font-bold text-white shadow-green"
            >
              <Share2 size={16} />
              Share link
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-forest/15 bg-white px-5 py-3 text-sm font-bold text-forest"
            >
              <FileText size={16} />
              Export PDF
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-ink-faint">
            Future version: time-limited sharing, hidden fields, consent log, and
            clinic-ready summaries using structured health data standards.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
