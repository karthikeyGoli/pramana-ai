import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeAlert,
  BadgeCheck,
  Megaphone,
  ShieldQuestion,
  Sparkles,
} from 'lucide-react'
import { painCards } from '../data/pramana'
import SpotlightCard from './SpotlightCard'

const claimScenarios = [
  {
    label: 'Viral serum',
    claim: 'Clinically proven glow in 3 days',
    verdict: 'Marketing claim outruns visible proof',
    proof: 'Needs active concentration, trial source, and batch authenticity.',
    score: 38,
  },
  {
    label: 'Protein powder',
    claim: 'Clean mass gain with zero side effects',
    verdict: 'Nutrition label is not enough',
    proof: 'Needs contamination testing, allergen context, and seller traceability.',
    score: 52,
  },
  {
    label: 'Hair oil',
    claim: 'Ancient formula regrows hair naturally',
    verdict: 'Heritage is not evidence by itself',
    proof: 'Good ingredient clarity, but growth claims need careful wording.',
    score: 68,
  },
  {
    label: 'Clinic AI',
    claim: 'Instant skin diagnosis from one selfie',
    verdict: 'High-risk language detected',
    proof: 'Useful as context only. Professional care and non-diagnostic wording matter.',
    score: 44,
  },
]

const marketReceipts = [
  'Paid recommendation',
  'No source citation',
  'Influencer routine',
  'Fake clean label',
  'Missing batch proof',
  'Fear-based beauty',
]

export default function ProblemSection() {
  const [active, setActive] = useState(claimScenarios[0])

  return (
    <section id="problem" className="relative overflow-hidden bg-white py-24">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0d1210] to-transparent opacity-10" />
      <motion.div
        aria-hidden
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 top-10 flex min-w-max gap-4 opacity-60"
      >
        {[...marketReceipts, ...marketReceipts, ...marketReceipts].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="rounded-full border border-terracotta/15 bg-terracotta-soft px-4 py-2 text-xs font-bold text-terracotta"
          >
            {item}
          </span>
        ))}
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-pale px-4 py-2 text-xs font-bold uppercase text-forest">
            <Megaphone size={14} />
            You are not overthinking it
          </span>
          <h2 className="mt-5 font-display text-4xl font-normal text-ink md:text-6xl text-balance">
            The market learned your insecurities.
            <span className="block text-forest">Then sold them back to you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            A serum for glow. A powder for muscle. A hair oil for growth. A clinic for
            fixes. Every product talks loudly, but almost none of them connect the
            proof to your actual body.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {painCards.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <SpotlightCard className="h-full rounded-[1.75rem] border border-stone-200 bg-cream p-7 shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-pramana">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-pale text-forest">
                  <problem.icon size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {problem.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {problem.text}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        <div className="premium-ambient-soft relative mt-16 grid gap-6 overflow-hidden rounded-[2rem] border border-black/10 text-white shadow-pramana lg:grid-cols-[0.92fr_1.08fr]">
          <div className="premium-vignette absolute inset-0" />
          <div className="relative p-8 md:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <ShieldQuestion size={24} />
            </div>
            <h3 className="font-display text-3xl font-normal md:text-4xl">
              Pramana is not another recommendation engine.
            </h3>
            <p className="mt-4 leading-relaxed text-white/70">
              It is a validation layer. It asks what the product claims, what proof
              exists, whether it fits your context, and where uncertainty remains.
            </p>

            <div className="mt-7 grid gap-2 sm:grid-cols-2">
              {claimScenarios.map((scenario) => (
                <button
                  key={scenario.label}
                  type="button"
                  onClick={() => setActive(scenario)}
                  className={`rounded-2xl border p-4 text-left transition-colors duration-200 ${
                    active.label === scenario.label
                      ? 'border-gold bg-gold text-forest shadow-glow'
                      : 'border-white/10 bg-white/[0.06] text-white hover:border-gold/40'
                  }`}
                >
                  <span className="text-sm font-bold">{scenario.label}</span>
                  <span className="mt-1 block text-xs opacity-70">{scenario.claim}</span>
                </button>
              ))}
            </div>

            <a href="#scanner" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-gold">
              See validation in action
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="relative min-h-[520px] bg-white/[0.06] p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="relative h-full rounded-[1.75rem] border border-white/10 bg-black/25 p-5 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-100">
                      <BadgeAlert size={14} />
                      market claim
                    </span>
                    <h4 className="mt-4 font-display text-3xl font-normal text-white">
                      {active.claim}
                    </h4>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3 text-gold">
                    <Sparkles size={22} />
                  </div>
                </div>

                <div className="mt-8 rounded-[1.5rem] bg-cream p-5 text-ink">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-forest text-gold">
                        <BadgeCheck size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-forest-light">
                          Pramana verdict
                        </p>
                        <h5 className="font-display text-2xl font-normal">
                          {active.verdict}
                        </h5>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-4xl font-semibold text-terracotta">
                        {active.score}
                      </div>
                      <p className="text-xs font-bold uppercase text-ink-faint">trust</p>
                    </div>
                  </div>
                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-200">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${active.score}%` }}
                      className="h-full rounded-full bg-cta"
                      transition={{ duration: 0.55 }}
                    />
                  </div>
                  <p className="mt-5 leading-relaxed text-ink-muted">{active.proof}</p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Claim', 'Interrogate'],
                    ['Proof', 'Cite sources'],
                    ['Body', 'Personal context'],
                  ].map(([title, text]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                      <div className="font-display text-xl font-semibold text-gold">{title}</div>
                      <p className="mt-1 text-sm text-white/65">{text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
