import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Network, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PointerGlow from '../components/PointerGlow'
import SpotlightCard from '../components/SpotlightCard'
import { capabilityCards, moduleDetails } from '../data/pramana'

export default function ModulePage() {
  const { slug } = useParams()
  const card = capabilityCards.find((item) => item.slug === slug)
  const details = slug ? moduleDetails[slug as keyof typeof moduleDetails] : undefined

  if (!card || !details) return <Navigate to="/" replace />

  const Icon = card.icon

  return (
    <>
      <PointerGlow />
      <Navbar variant="dark" />
      <main className="overflow-hidden bg-forest-deep text-white">
        <section className="relative min-h-screen px-6 pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(201,168,76,0.22),transparent_30%),radial-gradient(circle_at_80%_12%,rgba(46,125,82,0.24),transparent_28%),linear-gradient(135deg,#071710_0%,#0B2118_48%,#173C2B_100%)]" />
          <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:44px_44px]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 pb-24 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-gold">
                <ArrowLeft size={16} />
                Back to Pramana
              </Link>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                <Icon size={15} />
                {details.eyebrow}
              </div>
              <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.98] text-cream md:text-7xl">
                {details.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                {details.summary}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-forest shadow-glow transition hover:-translate-y-0.5"
                >
                  Build my profile
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:border-gold/50"
                >
                  Demo dashboard
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/20 blur-3xl" />
              <SpotlightCard className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.08] p-4 shadow-pramana backdrop-blur-2xl">
                <div className="relative min-h-[520px] overflow-hidden rounded-[1.75rem]">
                  <img
                    src={details.image}
                    alt={details.headline}
                    className="absolute inset-0 h-full w-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest/45 to-transparent" />

                  <div className="absolute left-5 right-5 top-5 grid gap-3 sm:grid-cols-2">
                    {details.metrics.map((metric, index) => (
                      <motion.div
                        key={metric}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, delay: index * 0.18, repeat: Infinity }}
                        className="rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-gold">
                          <Sparkles size={13} />
                          signal
                        </div>
                        <p className="mt-2 font-display text-xl font-semibold text-white">{metric}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.75rem] border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
                    <div className="flex items-center gap-2 text-sm font-bold text-gold">
                      <Network size={17} />
                      How this module works
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {details.steps.map((step, index) => (
                        <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-forest">
                            {index + 1}
                          </div>
                          <span className="text-sm font-semibold text-white/80">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </section>

        <section className="bg-cream px-6 py-20 text-ink">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-forest-light">
                Premium v1 behavior
              </span>
              <h2 className="mt-3 font-display text-4xl font-semibold">
                Built to feel interactive now, ready for real data later.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                'Interactive product surface, not static copy',
                'Consent-first health context',
                'Evidence and uncertainty stay visible',
                'Separate module pages for deeper flows',
              ].map((item) => (
                <SpotlightCard key={item} className="rounded-[1.5rem] border border-forest/10 bg-white p-5 shadow-soft">
                  <CheckCircle2 className="text-forest" size={20} />
                  <p className="mt-3 text-sm font-bold leading-6 text-ink-muted">{item}</p>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
