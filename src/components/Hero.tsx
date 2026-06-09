import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  HeartPulse,
  Instagram,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import ScanDemo from './ScanDemo'

const fakeAds = [
  { label: '"Miracle collagen - 3 days to glass skin!"', tag: 'Sponsored' },
  { label: '"Doctors hate this fat burner"', tag: 'Ad' },
  { label: '"Ayurvedic hair growth in 7 days"', tag: 'Paid' },
]

const trustSignals = [
  { label: 'Ingredient proof', value: '82%', tone: 'bg-emerald-400' },
  { label: 'Body fit', value: '64%', tone: 'bg-gold' },
  { label: 'Seller trust', value: '41%', tone: 'bg-terracotta' },
]

const orbitNodes = [
  { label: 'Skin', className: 'left-[8%] top-[22%]' },
  { label: 'Gut', className: 'right-[9%] top-[25%]' },
  { label: 'Sleep', className: 'left-[12%] bottom-[24%]' },
  { label: 'Stress', className: 'right-[13%] bottom-[20%]' },
  { label: 'Products', className: 'left-1/2 top-[7%] -translate-x-1/2' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-deep text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(201,168,76,0.24),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(46,125,82,0.32),transparent_26%),linear-gradient(135deg,#071710_0%,#0B2118_48%,#173C2B_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:42px_42px]" />
      </div>

      <div className="relative pt-28">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-soft backdrop-blur-xl">
              <Instagram size={14} className="text-gold" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                Private anti-fake intelligence
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] text-cream md:text-6xl lg:text-7xl text-balance">
              Your body deserves proof before hype touches it.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
              One place to validate beauty, supplements, routines, food, sleep, skin,
              and subtle Indian wellness context. Not another recommendation engine.
              A trust layer for the fake product market.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/auth"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-forest shadow-glow transition hover:-translate-y-0.5"
              >
                Create body profile
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#scanner"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-soft backdrop-blur-xl transition hover:border-gold/50"
              >
                Try scan demo
              </a>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3"
            >
              {[
                ['0', 'blind trust'],
                ['6', 'body signals'],
                ['1', 'trust graph'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-soft backdrop-blur-xl">
                  <div className="font-display text-4xl font-bold text-gold">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/58">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-2xl">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.08] p-4 shadow-pramana backdrop-blur-2xl md:p-5">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-forest">
                      <Sparkles size={20} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                        Pramana OS
                      </p>
                      <h2 className="font-display text-2xl font-semibold text-cream">
                        Live trust console
                      </h2>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200">
                    active
                  </span>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[360px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-forest-deep">
                    <img
                      src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                      alt="Beauty and wellness products ready for validation"
                      className="absolute inset-0 h-full w-full object-cover opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest/35 to-transparent" />

                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/25"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
                      className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
                    />

                    <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/40 bg-forest/85 text-center shadow-glow backdrop-blur-xl">
                      <Brain className="text-gold" size={28} />
                      <span className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                        You
                      </span>
                    </div>

                    {orbitNodes.map((node, index) => (
                      <motion.div
                        key={node.label}
                        animate={{ y: [0, -6, 0] }}
                        transition={{ duration: 3.2, delay: index * 0.2, repeat: Infinity }}
                        className={`absolute ${node.className} rounded-full border border-white/15 bg-white/12 px-3 py-2 text-xs font-bold text-white backdrop-blur-xl`}
                      >
                        {node.label}
                      </motion.div>
                    ))}

                    <div className="absolute bottom-4 left-4 right-4 rounded-3xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">
                        <BadgeCheck size={14} />
                        Proof over popularity
                      </div>
                      <p className="font-display text-2xl font-semibold leading-tight text-white">
                        A product should earn trust before it touches your body.
                      </p>
                    </div>
                  </div>

                  <div className="grid content-between gap-4">
                    <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-cream">
                        <ScanSearch size={17} className="text-gold" />
                        Claim interrogation
                      </div>
                      <div className="mt-4 space-y-4">
                        {trustSignals.map((signal) => (
                          <div key={signal.label}>
                            <div className="mb-2 flex items-center justify-between text-xs font-bold text-white/68">
                              <span>{signal.label}</span>
                              <span>{signal.value}</span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: signal.value }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className={`h-full rounded-full ${signal.tone}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-white/10 bg-cream p-4 text-ink shadow-soft">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <h3 className="font-display text-xl font-semibold">Verdict</h3>
                          <p className="mt-1 text-sm leading-6 text-ink-muted">
                            High hype. Missing batch proof. Sensitive-skin caution.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.5rem] border border-gold/20 bg-gold/15 p-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-gold">
                        <LockKeyhole size={17} />
                        Consent locked
                      </div>
                      <p className="mt-2 text-sm leading-6 text-white/68">
                        Health context stays private and only strengthens validation confidence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative -mt-5 px-4 lg:-ml-8 lg:w-[430px]">
                <ScanDemo />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-y border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-gold">
              <HeartPulse size={18} className="text-gold" />
              Validate Before You Trust
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {fakeAds.map((ad, i) => (
                <motion.div
                  key={ad.label}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, delay: i * 0.35, repeat: Infinity }}
                  className="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-semibold text-red-800"
                >
                  <X size={13} />
                  {ad.label}
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] uppercase">
                    {ad.tag}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
