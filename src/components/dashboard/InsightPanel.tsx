import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Link2 } from 'lucide-react'
import { bodySystems, type BodySystem } from '../../data/bodySystems'

interface InsightPanelProps {
  selected: BodySystem | null
}

export default function InsightPanel({ selected }: InsightPanelProps) {
  const connectedSystems = selected
    ? bodySystems.filter((s) => selected.connections.includes(s.id))
    : []

  return (
    <div className="rounded-[1.5rem] border border-white bg-white p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold text-ink">
        Cross-System Insight
      </h2>

      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mt-4 rounded-2xl bg-cream p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-forest">
                <selected.icon size={16} />
                {selected.name}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {selected.insight}
              </p>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-faint">
                <Link2 size={12} />
                Connected signals
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {connectedSystems.map((sys) => (
                  <span
                    key={sys.id}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: sys.bgColor, color: sys.color }}
                  >
                    <sys.icon size={12} />
                    {sys.shortName}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl border border-forest/15 bg-pale p-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-cta"
                  style={{ width: `${selected.score}%` }}
                />
              </div>
              <span className="text-sm font-bold text-ink">{selected.score}%</span>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-ink-faint"
          >
            Select a body signal on the map to see how it connects to the trust graph.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-6 border-t border-stone-200 pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-ink-faint">
          Recent demo alerts
        </h3>
        <ul className="mt-3 space-y-2">
          {[
            { text: 'Hair oil claim needs seller and batch verification', type: 'warning' },
            { text: 'Nutrition and skin context linked for review', type: 'info' },
            { text: 'Sleep signal can improve future insight confidence', type: 'info' },
          ].map((alert) => (
            <li key={alert.text} className="flex items-start gap-2 text-xs text-ink-muted">
              <span
                className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                  alert.type === 'warning' ? 'bg-terracotta' : 'bg-forest'
                }`}
              />
              {alert.text}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="button"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-cream py-2.5 text-sm font-bold text-ink transition hover:bg-pale"
      >
        View validation path
        <ArrowRight size={14} />
      </button>
    </div>
  )
}
