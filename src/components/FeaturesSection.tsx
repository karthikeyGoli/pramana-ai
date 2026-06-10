import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Layers3, MousePointer2 } from 'lucide-react'
import { capabilityCards, imageTiles, moduleDetails, proofSignals } from '../data/pramana'
import SpotlightCard from './SpotlightCard'

const categoryThemes = {
  All: {
    bg: 'bg-gold',
    text: 'text-forest',
    border: 'border-gold',
    glow: 'shadow-glow',
  },
  Beauty: {
    bg: 'bg-terracotta',
    text: 'text-white',
    border: 'border-terracotta',
    glow: 'shadow-rose',
  },
  Fitness: {
    bg: 'bg-forest-light',
    text: 'text-white',
    border: 'border-forest-light',
    glow: 'shadow-green',
  },
  Nutrition: {
    bg: 'bg-gold',
    text: 'text-forest',
    border: 'border-gold',
    glow: 'shadow-glow',
  },
  Products: {
    bg: 'bg-ink',
    text: 'text-white',
    border: 'border-ink',
    glow: 'shadow-card',
  },
  Wellness: {
    bg: 'bg-sage',
    text: 'text-white',
    border: 'border-sage',
    glow: 'shadow-green',
  },
  Data: {
    bg: 'bg-stone-700',
    text: 'text-white',
    border: 'border-stone-700',
    glow: 'shadow-card',
  },
} as const

type FeatureCategory = keyof typeof categoryThemes
const filters = Object.keys(categoryThemes) as FeatureCategory[]

export default function FeaturesSection() {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory>('All')
  const [activeSlug, setActiveSlug] = useState(capabilityCards[0].slug)

  const visibleCards = useMemo(() => {
    if (activeCategory === 'All') return capabilityCards
    return capabilityCards.filter((card) => card.category === activeCategory)
  }, [activeCategory])

  const selectedCard = visibleCards.find((card) => card.slug === activeSlug) ?? visibleCards[0]
  const activeDetails = moduleDetails[selectedCard.slug as keyof typeof moduleDetails]

  const setCategory = (filter: FeatureCategory) => {
    setActiveCategory(filter)
    const firstCard =
      filter === 'All'
        ? capabilityCards[0]
        : capabilityCards.find((card) => card.category === filter) ?? capabilityCards[0]
    setActiveSlug(firstCard.slug)
  }

  return (
    <section id="features" className="relative overflow-hidden bg-[#071710] py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(201,168,76,0.2),transparent_28%),radial-gradient(circle_at_86%_26%,rgba(46,125,82,0.22),transparent_30%),linear-gradient(180deg,#071710_0%,#0B2118_100%)]" />
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase text-gold">
              <Layers3 size={14} />
              This is all you need
            </span>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-cream md:text-6xl text-balance">
              One body intelligence layer for the products people actually use.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-white/68">
            Women-first, built for everyone. Beauty, supplements, food, fitness,
            wearables, skin, hair, and subtle Ayurveda context sit inside one proof
            graph instead of six disconnected apps.
          </p>
        </motion.div>

        <div className="-mx-6 overflow-x-auto px-6 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max snap-x gap-4">
            {imageTiles.map((tile, i) => (
              <motion.div
                key={tile.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="group relative h-80 w-[18.5rem] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 shadow-pramana md:w-[23rem]"
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="h-full w-full object-cover opacity-82 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/22 to-transparent" />
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

        <div className="mt-5 flex flex-wrap gap-2">
          {filters.map((filter) => {
            const theme = categoryThemes[filter]
            const isActive = activeCategory === filter

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors duration-200 ${
                  isActive
                    ? `${theme.bg} ${theme.text} ${theme.border} ${theme.glow}`
                    : 'border-white/10 bg-white/10 text-white/65 hover:border-gold/40 hover:text-white'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {visibleCards.map((benefit, i) => {
              const Icon = benefit.icon
              const isActive = selectedCard.slug === benefit.slug
              return (
                <motion.button
                  key={benefit.title}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onMouseEnter={() => setActiveSlug(benefit.slug)}
                  onFocus={() => setActiveSlug(benefit.slug)}
                  onClick={() => setActiveSlug(benefit.slug)}
                  className={`group rounded-[1.5rem] border p-5 text-left transition-colors duration-200 ${
                    isActive
                      ? 'border-gold bg-gold text-forest shadow-glow'
                      : 'border-white/10 bg-white/[0.07] text-white hover:border-gold/35'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isActive ? 'bg-forest text-gold' : 'bg-white/10 text-gold'
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span className={`text-xs font-bold uppercase ${isActive ? 'text-forest/70' : 'text-white/45'}`}>
                      {benefit.category}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className={`mt-3 text-sm leading-relaxed ${isActive ? 'text-forest/72' : 'text-white/62'}`}>
                    {benefit.text}
                  </p>
                </motion.button>
              )
            })}
          </div>

          <SpotlightCard className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] p-4 shadow-pramana backdrop-blur-xl md:p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCard.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28 }}
                className="relative h-full min-h-[520px] overflow-hidden rounded-[1.6rem]"
              >
                <img
                  src={activeDetails.image}
                  alt={activeDetails.headline}
                  className="absolute inset-0 h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-forest/50 to-black/12" />
                <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold uppercase text-forest">
                    <MousePointer2 size={14} />
                    {activeDetails.eyebrow}
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white/75">
                    module
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white md:text-5xl text-balance">
                    {activeDetails.headline}
                  </h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
                    {activeDetails.summary}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {activeDetails.metrics.map((metric) => (
                      <div key={metric} className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                        <div className="text-xs font-bold uppercase text-gold">Signal</div>
                        <p className="mt-1 font-display text-xl font-semibold text-white">{metric}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={`/modules/${selectedCard.slug}`}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-forest shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Open module
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </SpotlightCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 shadow-pramana backdrop-blur-xl md:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase text-gold">
                Backend-ready trust graph
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold text-cream md:text-4xl">
                Start light. Plug in real APIs when the keys arrive.
              </h3>
              <p className="mt-4 leading-relaxed text-white/66">
                The first version captures demand and product concerns. The next version
                can connect barcode databases, ingredient knowledge, seller checks,
                skin APIs, and wearable context.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {proofSignals.map((signal) => (
                <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <signal.icon size={20} className="text-gold" />
                  <div className="mt-3 text-sm font-bold text-white">{signal.label}</div>
                  <div className="mt-1 text-xs font-semibold uppercase text-white/45">
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
