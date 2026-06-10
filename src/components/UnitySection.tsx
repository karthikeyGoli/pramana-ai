import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'
import BodyUnityMap from './BodyUnityMap'

const headlineLines = [
  ['Your', 'skin,', 'food,', 'stress,'],
  ['sleep,', 'and', 'products'],
  ['are', 'not', 'separate.'],
]

const finalLines = [
  ['Your', 'app', 'should', 'not'],
  ['be', 'either.'],
]

const cosmicSignals = [
  'gut-brain axis',
  'skin barrier',
  'sleep rhythm',
  'product proof',
  'stress load',
  'wellness context',
]

export default function UnitySection() {
  return (
    <section
      id="unity"
      className="relative isolate overflow-hidden py-24 text-white"
      style={{ backgroundColor: '#08090d' }}
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_18%_18%,rgba(201,168,76,0.22),transparent_32%),radial-gradient(ellipse_at_82%_22%,rgba(107,77,138,0.26),transparent_34%),radial-gradient(ellipse_at_58%_88%,rgba(94,138,114,0.18),transparent_38%),linear-gradient(135deg,#08090d_0%,#14111b_48%,#0d1210_100%)]" />
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ['0px 0px', '220px -160px'] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 z-0 opacity-55 [background-image:radial-gradient(circle_at_20px_24px,rgba(255,255,255,.75)_1px,transparent_1.5px),radial-gradient(circle_at_80px_64px,rgba(201,168,76,.7)_1px,transparent_1.5px),radial-gradient(circle_at_140px_110px,rgba(255,255,255,.38)_1px,transparent_1.5px)] [background-size:180px_180px]"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(8,9,13,.72),transparent_28%,transparent_72%,rgba(8,9,13,.62)),linear-gradient(180deg,rgba(8,9,13,.26),transparent_45%,rgba(8,9,13,.78))]" />

      <motion.div
        aria-hidden
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 top-12 z-0 flex min-w-max gap-3 opacity-55"
      >
        {[...cosmicSignals, ...cosmicSignals, ...cosmicSignals].map((signal, index) => (
          <span
            key={`${signal}-${index}`}
            className="rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs font-bold uppercase text-white/58 backdrop-blur-xl"
          >
            {signal}
          </span>
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px' }}
            transition={{ duration: 0.55 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-gold backdrop-blur-xl">
              <Leaf size={16} />
              Subtle Indian wellness
            </span>

            <h2 className="mt-6 max-w-3xl font-display text-5xl font-normal leading-[1.02] text-cream md:text-6xl text-balance">
              {headlineLines.map((line, lineIndex) => (
                <span key={line.join(' ')} className="block">
                  {line.map((word, wordIndex) => (
                    <motion.span
                      key={`${word}-${wordIndex}`}
                      initial={{ opacity: 0, y: 34, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-12% 0px' }}
                      transition={{
                        duration: 0.52,
                        delay: lineIndex * 0.14 + wordIndex * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ marginRight: '0.18em' }}
                      className="inline-block bg-gradient-to-br from-white via-cream to-gold bg-clip-text text-transparent"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
              {finalLines.map((line, lineIndex) => (
                <span key={line.join(' ')} className="mt-2 block">
                  {line.map((word, wordIndex) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, margin: '-12% 0px' }}
                      transition={{
                        duration: 0.52,
                        delay: 0.48 + lineIndex * 0.12 + wordIndex * 0.055,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ marginRight: '0.18em' }}
                      className="inline-block bg-gradient-to-br from-gold via-cream to-[#c8b8ff] bg-clip-text text-transparent"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="mt-7 max-w-2xl text-lg leading-relaxed text-white/68"
            >
              Pramana uses a light wellness lens for heat, dryness, digestion,
              recovery, and routine rhythm. Modern medicine stays the safety base;
              Ayurveda adds human context without becoming the whole product.
            </motion.p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Informational insights, not diagnosis',
                'Prakriti-inspired body patterns later',
                'Product validation across beauty, supplements, hair, and food',
                'One connected body map for scan history and routines',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.34 + i * 0.08 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl"
                >
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span className="text-sm font-semibold leading-6 text-white/68">{item}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-forest shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
            >
              Join the early circle
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gold/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-white/14 bg-white/[0.88] p-5 shadow-pramana backdrop-blur-2xl md:p-8">
              <BodyUnityMap interactive size="lg" />
              <div className="mt-6 rounded-2xl border border-forest/10 bg-cream/90 p-4 text-center text-sm font-semibold text-ink-muted">
                Drag the orbiting signals to see how product trust, skin, fitness,
                nutrition, hair, sleep, and Indian wellness context light up the same
                inner constellation.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
