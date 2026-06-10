import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  ChevronRight,
  CircleDashed,
  ClipboardCheck,
  HeartPulse,
  LockKeyhole,
  Radar,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'
import ScanDemo from './ScanDemo'

const marketNoise = [
  { label: 'Paid routine', tag: 'Influencer' },
  { label: 'No batch proof', tag: 'Seller' },
  { label: 'Miracle claim', tag: 'Ad' },
  { label: 'Fake clean label', tag: 'Beauty' },
]

const liveChecks = [
  { label: 'Ingredient proof', value: '82', status: 'source found', tone: 'bg-emerald-300' },
  { label: 'Seller trust', value: '41', status: 'verify batch', tone: 'bg-terracotta' },
  { label: 'Body fit', value: '64', status: 'sensitive day', tone: 'bg-gold' },
  { label: 'Evidence strength', value: '71', status: 'medium confidence', tone: 'bg-sage' },
]

const proofSteps = ['Scan', 'Parse', 'Verify', 'Body fit', 'Verdict']

const bodySignals = [
  { label: 'Skin', x: '12%', y: '24%', delay: 0 },
  { label: 'Gut', x: '78%', y: '27%', delay: 0.2 },
  { label: 'Sleep', x: '16%', y: '72%', delay: 0.4 },
  { label: 'Stress', x: '74%', y: '70%', delay: 0.6 },
  { label: 'Product', x: '50%', y: '11%', delay: 0.8 },
]

const activity = [
  ['Claim', 'Retinol concentration missing'],
  ['Source', 'Seller page needs batch proof'],
  ['Body', 'Heat-prone skin caution'],
  ['Action', 'Ask for lab proof before daily use'],
]

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#071710] text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(201,168,76,0.22),transparent_26%),radial-gradient(circle_at_84%_12%,rgba(46,125,82,0.3),transparent_28%),radial-gradient(circle_at_50%_90%,rgba(184,92,56,0.18),transparent_34%),linear-gradient(135deg,#071710_0%,#0B2118_46%,#143726_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.75)_1px,transparent_1px)] [background-size:54px_54px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071710] to-transparent" />
      </div>

      <motion.div
        aria-hidden
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
        className="absolute top-24 flex min-w-max gap-3 opacity-70"
      >
        {[...marketNoise, ...marketNoise, ...marketNoise].map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="inline-flex items-center gap-2 rounded-full border border-red-200/20 bg-red-500/10 px-4 py-2 text-xs font-bold text-red-100 backdrop-blur-xl"
          >
            <X size={13} />
            {item.label}
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase text-red-50/70">
              {item.tag}
            </span>
          </div>
        ))}
      </motion.div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-10 px-6 pb-16 pt-36 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 shadow-soft backdrop-blur-xl">
            <Radar size={14} className="text-gold" />
            <span className="text-xs font-bold uppercase text-gold">
              Anti-fake body intelligence
            </span>
          </div>

          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-cream md:text-6xl lg:text-7xl text-balance">
            Validate before the market gets inside your body.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72 md:text-xl">
            Pramana AI connects product proof, skin context, supplements, fitness,
            food, sleep, wearables, and subtle Indian wellness signals into one trust
            layer for the fake product era.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/auth"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-bold text-forest shadow-glow transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Create body profile
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#scanner"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-7 py-4 text-sm font-bold text-white shadow-soft backdrop-blur-xl transition-colors duration-200 hover:border-gold/50 hover:bg-white/15 active:scale-[0.98]"
            >
              Try scan demo
            </a>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {[
              ['0', 'blind trust'],
              ['6', 'body signals'],
              ['1', 'private graph'],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-white/[0.08] p-4 shadow-soft backdrop-blur-xl"
              >
                <div className="font-display text-4xl font-bold text-gold">{value}</div>
                <div className="mt-1 text-xs font-bold uppercase text-white/58">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gold/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-white/[0.08] p-3 shadow-pramana backdrop-blur-2xl md:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold text-forest">
                  <Sparkles size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-gold">Pramana OS</p>
                  <h2 className="font-display text-2xl font-semibold text-cream">
                    Validation command center
                  </h2>
                </div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.9)]" />
                live preview
              </span>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-forest-deep">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1300&q=80"
                  alt="Beauty product being validated by Pramana AI"
                  className="absolute inset-0 h-full w-full object-cover opacity-42"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071710] via-forest/45 to-transparent" />
                <div className="absolute inset-0 opacity-[0.16] [background-image:linear-gradient(rgba(247,232,181,.45)_1px,transparent_1px),linear-gradient(90deg,rgba(247,232,181,.45)_1px,transparent_1px)] [background-size:34px_34px]" />

                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-gold/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                    className="absolute -inset-10 rounded-full border border-white/15 border-dashed"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-gold/45 bg-forest/88 text-center shadow-glow backdrop-blur-xl"
                  >
                    <Brain className="text-gold" size={28} />
                    <span className="mt-2 text-xs font-bold uppercase text-white/70">
                      You
                    </span>
                  </motion.div>
                </div>

                {bodySignals.map((signal) => (
                  <motion.div
                    key={signal.label}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.2, delay: signal.delay, repeat: Infinity }}
                    className="absolute rounded-full border border-white/15 bg-white/12 px-3 py-2 text-xs font-bold text-white shadow-soft backdrop-blur-xl"
                    style={{ left: signal.x, top: signal.y }}
                  >
                    {signal.label}
                  </motion.div>
                ))}

                <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">
                    <BadgeCheck size={14} />
                    Proof over popularity
                  </div>
                  <p className="font-display text-2xl font-semibold leading-tight text-white">
                    Viral serum flagged: missing proof, sensitive-skin caution.
                  </p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-bold text-cream">
                      <ScanSearch size={17} className="text-gold" />
                      Trust score
                    </div>
                    <span className="font-display text-3xl font-semibold text-gold">64</span>
                  </div>
                  <div className="space-y-4">
                    {liveChecks.map((check, index) => (
                      <div key={check.label}>
                        <div className="mb-2 flex items-center justify-between gap-3 text-xs font-bold text-white/68">
                          <span>{check.label}</span>
                          <span>{check.status}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${check.value}%` }}
                            transition={{ delay: 0.3 + index * 0.08, duration: 0.8 }}
                            className={`h-full rounded-full ${check.tone}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-4">
                  <div className="mb-4 flex items-center gap-2 text-sm font-bold text-cream">
                    <ClipboardCheck size={17} className="text-gold" />
                    Live interrogation
                  </div>
                  <div className="space-y-2">
                    {activity.map(([label, text], index) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.12 }}
                        className="flex items-start gap-3 rounded-2xl bg-white/[0.07] p-3"
                      >
                        <span className="mt-0.5 rounded-full bg-gold/15 px-2 py-1 text-[10px] font-bold uppercase text-gold">
                          {label}
                        </span>
                        <p className="text-sm leading-6 text-white/70">{text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-gold/20 bg-gold/15 p-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-gold">
                    <LockKeyhole size={17} />
                    Consent locked
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/68">
                    Health context strengthens confidence without turning Pramana into
                    a diagnosis engine.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-gold">
                <CircleDashed size={14} />
                Validation pipeline
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-5">
                {proofSteps.map((step, index) => (
                  <div key={step} className="relative rounded-2xl bg-white/[0.07] p-3">
                    {index < proofSteps.length - 1 && (
                      <ChevronRight
                        size={16}
                        className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold/70 sm:block"
                      />
                    )}
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-xs font-bold text-forest">
                      {index + 1}
                    </div>
                    <p className="mt-2 text-sm font-bold text-white/80">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative -mt-5 px-3 lg:-ml-8 lg:w-[430px]">
            <ScanDemo />
          </div>
        </motion.div>
      </div>

      <div className="relative border-y border-white/10 bg-white/[0.06] px-6 py-5 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-gold">
            <HeartPulse size={18} />
            Validate Before You Trust
          </div>
          <div className="grid gap-3 text-sm text-white/72 sm:grid-cols-3">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck size={16} className="text-gold" />
              Evidence-first verdicts
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldAlert size={16} className="text-gold" />
              Fake-market defense
            </span>
            <span className="inline-flex items-center gap-2">
              <LockKeyhole size={16} className="text-gold" />
              Private body context
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
