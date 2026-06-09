import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Apple,
  Dumbbell,
  FlaskConical,
  Moon,
  ShieldAlert,
  Sparkles,
  Watch,
} from 'lucide-react'

const scenarios = [
  {
    id: 'sleep',
    label: '5h sleep',
    icon: Moon,
    affects: ['skin', 'mind', 'recovery'],
    copy: 'Lower sleep can make skin and stress signals more reactive.',
  },
  {
    id: 'serum',
    label: 'New active serum',
    icon: Sparkles,
    affects: ['skin', 'product'],
    copy: 'A new active should be introduced carefully when the body is already stressed.',
  },
  {
    id: 'protein',
    label: 'Dairy protein scan',
    icon: FlaskConical,
    affects: ['gut', 'skin', 'fitness'],
    copy: 'Protein choice should be checked for ingredients, batch proof, and skin context.',
  },
  {
    id: 'workout',
    label: 'Heavy workout',
    icon: Dumbbell,
    affects: ['recovery', 'sleep', 'fitness'],
    copy: 'Workout strain needs recovery and nutrition context before adding more load.',
  },
  {
    id: 'meal',
    label: 'Gut-friendly meal',
    icon: Apple,
    affects: ['gut', 'mind', 'skin'],
    copy: 'Food quality becomes part of the gut-brain-skin pattern, not just calories.',
  },
  {
    id: 'wearable',
    label: 'Ring data synced',
    icon: Watch,
    affects: ['sleep', 'recovery', 'mind'],
    copy: 'Wearable trends can raise or lower the confidence of daily recommendations.',
  },
]

const signalLabels = ['skin', 'gut', 'mind', 'sleep', 'recovery', 'fitness', 'product']

export default function ValidationSandboxSection() {
  const [active, setActive] = useState(['sleep', 'serum', 'wearable'])

  const activeScenarios = scenarios.filter((scenario) => active.includes(scenario.id))
  const affectedSignals = useMemo(() => {
    const counts = new Map<string, number>()

    activeScenarios.forEach((scenario) => {
      scenario.affects.forEach((signal) => {
        counts.set(signal, (counts.get(signal) ?? 0) + 1)
      })
    })

    return counts
  }, [activeScenarios])

  const riskLevel =
    affectedSignals.get('skin') && affectedSignals.get('recovery')
      ? 'High reactivity day'
      : active.length >= 3
        ? 'Medium watch day'
        : 'Low concern day'

  const recommendation =
    riskLevel === 'High reactivity day'
      ? 'Avoid adding another active product today. Validate the protein and keep the routine stable.'
      : riskLevel === 'Medium watch day'
        ? 'Track one change at a time so Pramana can separate product hype from body response.'
        : 'Good day to test one small routine change with clear before and after notes.'

  const toggle = (id: string) => {
    setActive((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-pale px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-forest">
            <ShieldAlert size={14} />
            What-if body preview
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl text-balance">
            Choose what changed today. See what may react tomorrow.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
            This is a simple preview of Pramana&apos;s future intelligence loop: select
            daily events, watch affected body signals update, and get a safer next
            step before adding more chaos to your routine.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              ['1', 'Choose changes'],
              ['2', 'Signals update'],
              ['3', 'Act safer'],
            ].map(([step, label]) => (
              <div key={step} className="rounded-2xl border border-stone-200 bg-white p-4 shadow-soft">
                <div className="font-display text-2xl font-semibold text-forest">{step}</div>
                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                  {label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              const isActive = active.includes(scenario.id)

              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => toggle(scenario.id)}
                  className={`group rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-forest bg-forest text-white shadow-green'
                      : 'border-stone-200 bg-white text-ink hover:border-forest/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isActive ? 'bg-white/[0.12] text-gold' : 'bg-pale text-forest'
                      }`}
                    >
                      <Icon size={19} />
                    </span>
                    <span className="text-sm font-bold">{scenario.label}</span>
                  </div>
                  <p className={`mt-3 text-xs leading-relaxed ${isActive ? 'text-white/70' : 'text-ink-muted'}`}>
                    {scenario.copy}
                  </p>
                </button>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[2rem] border border-forest/10 bg-white p-5 shadow-pramana md:p-6"
        >
          <div className="rounded-[1.5rem] bg-hero-mesh p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-forest-light">
                  Live result
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                  {riskLevel}
                </h3>
                <p className="mt-1 text-sm text-ink-muted">
                  Based on {active.length} selected daily events
                </p>
              </div>
              <motion.div
                key={riskLevel}
                initial={{ rotate: -12, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forest text-gold shadow-green"
              >
                <ShieldAlert size={24} />
              </motion.div>
            </div>

            <div className="mt-5 rounded-2xl border border-forest/10 bg-white/82 p-4">
              <div className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
                Selected inputs
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeScenarios.length ? (
                  activeScenarios.map((scenario) => (
                    <span
                      key={scenario.id}
                      className="rounded-full bg-forest px-3 py-1 text-xs font-bold text-white"
                    >
                      {scenario.label}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full bg-pale px-3 py-1 text-xs font-bold text-forest">
                    Nothing selected
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {signalLabels.map((signal) => {
                const count = affectedSignals.get(signal) ?? 0
                const width = count === 0 ? 14 : Math.min(100, 34 + count * 24)

                return (
                  <div key={signal} className="rounded-2xl border border-white bg-white/82 p-4 shadow-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                        {signal}
                      </span>
                      <span className="text-xs font-bold text-forest">{count} links</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-pale">
                      <motion.div
                        className="h-full rounded-full bg-cta"
                        animate={{ width: `${width}%` }}
                        transition={{ duration: 0.35 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <motion.div
              key={recommendation}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 rounded-3xl bg-forest p-5 text-white"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Pramana recommendation
              </div>
              <p className="mt-3 text-lg leading-relaxed">{recommendation}</p>
              <p className="mt-4 text-xs leading-relaxed text-white/65">
                Simulation preview only. Real version would use consented wearable data,
                scan history, skin logs, food context, and professional-safe language.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
