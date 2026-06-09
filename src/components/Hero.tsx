import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, HeartPulse, Instagram, X } from 'lucide-react'
import ScanDemo from './ScanDemo'

const fakeAds = [
  { label: '"Miracle collagen - 3 days to glass skin!"', tag: 'Sponsored' },
  { label: '"Doctors hate this fat burner"', tag: 'Ad' },
  { label: '"Ayurvedic hair growth in 7 days"', tag: 'Paid' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="relative bg-hero-mesh pt-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-4 py-2 shadow-soft">
              <Instagram size={14} className="text-terracotta" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-forest">
                Anti-fake body intelligence
              </span>
            </div>

            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] text-ink md:text-6xl lg:text-7xl text-balance">
              Tired of fake beauty, supplement, and wellness recommendations?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
              Pramana AI validates products, routines, ingredients, and body context
              before you trust them. Modern science, subtle Indian wellness, and zero
              patience for paid hype.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#scanner"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-forest px-7 py-4 text-sm font-bold text-white shadow-green transition hover:-translate-y-0.5"
              >
                Try the scan demo
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </a>
              <a
                href="#waitlist"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-forest/20 bg-white px-7 py-4 text-sm font-bold text-forest shadow-soft transition hover:border-forest/40"
              >
                Join early access
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
                ['3', 'proof layers'],
                ['1', 'connected body'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white bg-white/80 p-4 shadow-soft">
                  <div className="font-display text-4xl font-bold text-forest">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
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
            <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr] lg:grid-cols-1">
              <div className="relative min-h-[280px] overflow-hidden rounded-[2rem] shadow-pramana sm:min-h-[360px] lg:min-h-[420px]">
                <img
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80"
                  alt="Beauty and wellness products ready for validation"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-forest">
                    <BadgeCheck size={14} />
                    Proof over popularity
                  </div>
                  <p className="max-w-sm font-display text-2xl font-semibold leading-tight text-white">
                    A product should earn your trust before it touches your body.
                  </p>
                </div>
              </div>
              <div className="lg:absolute lg:-bottom-10 lg:-left-10 lg:w-[430px]">
                <ScanDemo />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-y border-forest/10 bg-white/70 px-6 py-5 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-forest">
              <HeartPulse size={18} className="text-terracotta" />
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
