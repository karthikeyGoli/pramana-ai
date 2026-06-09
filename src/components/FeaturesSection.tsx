import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { capabilityCards, imageTiles, proofSignals } from '../data/pramana'

const categoryThemes = {
  All: {
    bg: 'bg-forest',
    text: 'text-white',
    soft: 'bg-pale',
    border: 'border-forest',
    icon: 'text-forest',
  },
  Beauty: {
    bg: 'bg-terracotta',
    text: 'text-white',
    soft: 'bg-terracotta-soft',
    border: 'border-terracotta',
    icon: 'text-terracotta',
  },
  Fitness: {
    bg: 'bg-forest',
    text: 'text-white',
    soft: 'bg-pale',
    border: 'border-forest',
    icon: 'text-forest',
  },
  Nutrition: {
    bg: 'bg-gold',
    text: 'text-ink',
    soft: 'bg-gold/20',
    border: 'border-gold',
    icon: 'text-ink',
  },
  Products: {
    bg: 'bg-ink',
    text: 'text-white',
    soft: 'bg-stone-100',
    border: 'border-ink',
    icon: 'text-ink',
  },
  Wellness: {
    bg: 'bg-forest-light',
    text: 'text-white',
    soft: 'bg-pale',
    border: 'border-forest-light',
    icon: 'text-forest-light',
  },
  Data: {
    bg: 'bg-stone-700',
    text: 'text-white',
    soft: 'bg-stone-100',
    border: 'border-stone-700',
    icon: 'text-stone-700',
  },
} as const

type FeatureCategory = keyof typeof categoryThemes
const filters = Object.keys(categoryThemes) as FeatureCategory[]

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>('All')
  const activeTheme = categoryThemes[activeCategory]
  const visibleCards = useMemo(() => {
    if (activeCategory === 'All') return capabilityCards
    return capabilityCards.filter((card) => card.category === activeCategory)
  }, [activeCategory])

  return (
    <section id="features" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-forest-light">
            This is all you need
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl text-balance">
            One platform for beauty, supplements, wellness, and body context.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-muted">
            Women-first, built for everyone. Pramana starts with the everyday things
            people actually buy, apply, eat, and trust.
          </p>
        </motion.div>

        <div className="-mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-4">
          {imageTiles.map((tile, i) => (
            <motion.div
              key={tile.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-72 w-[18rem] shrink-0 overflow-hidden rounded-[1.75rem] shadow-soft md:w-[22rem]"
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/75 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-forest">
                  {tile.label}
                </div>
                <p className="mt-3 max-w-xs text-sm font-semibold leading-relaxed text-white">
                  {tile.line}
                </p>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {filters.map((filter) => {
            const theme = categoryThemes[filter]
            const isActive = activeCategory === filter

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveCategory(filter)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  isActive
                    ? `${theme.bg} ${theme.text} ${theme.border} shadow-green`
                    : 'border-stone-200 bg-white text-ink-muted hover:border-forest/30'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleCards.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`group rounded-[1.75rem] border bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-pramana ${
                  activeCategory === 'All' ? 'border-stone-200' : activeTheme.border
                }`}
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition group-hover:scale-105 ${
                    activeCategory === 'All'
                      ? 'bg-pale text-forest'
                      : `${activeTheme.soft} ${activeTheme.icon}`
                  }`}
                >
                  <Icon size={22} />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                    activeCategory === 'All'
                      ? 'bg-pale text-forest'
                      : `${activeTheme.soft} ${activeTheme.icon}`
                  }`}
                >
                  {benefit.category}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {benefit.title}
                </h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{benefit.text}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-forest/10 bg-white p-8 shadow-pramana md:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.22em] text-forest-light">
                Backend-ready trust graph
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold text-ink md:text-4xl">
                Start light. Plug in real APIs when the keys arrive.
              </h3>
              <p className="mt-4 leading-relaxed text-ink-muted">
                The first version captures demand and product concerns. The next version
                can connect barcode databases, ingredient knowledge, seller checks,
                skin APIs, and wearable context.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {proofSignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl border border-stone-200 bg-cream p-4">
                  <signal.icon size={20} className="text-forest" />
                  <div className="mt-3 text-sm font-bold text-ink">{signal.label}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest-light">
                    {signal.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
