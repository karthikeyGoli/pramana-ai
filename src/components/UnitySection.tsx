import { motion } from 'framer-motion'
import { ArrowRight, Leaf } from 'lucide-react'
import BodyUnityMap from './BodyUnityMap'

export default function UnitySection() {
  return (
    <section id="unity" className="bg-pale py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-forest-light">
              <Leaf size={16} />
              Subtle Indian wellness
            </span>
            <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl text-balance">
              Your skin, food, stress, sleep, and products are not separate.
              <br />
              <span className="text-forest">Your app should not be either.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              Pramana uses a light wellness lens for heat, dryness, digestion,
              recovery, and routine rhythm. Modern medicine stays the safety base;
              Ayurveda adds human context without becoming the whole product.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                'Informational insights, not diagnosis',
                'Prakriti-inspired body patterns later',
                'Product validation across beauty, supplements, hair, and food',
                'One connected body map for scan history and routines',
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-forest" />
                  <span className="text-ink-muted">{item}</span>
                </motion.li>
              ))}
            </ul>

            <a
              href="#waitlist"
              className="mt-8 inline-flex items-center gap-2 font-bold text-forest transition hover:gap-3"
            >
              Join the early circle
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-[2rem] border border-white bg-white p-6 shadow-pramana md:p-10">
              <BodyUnityMap interactive size="lg" />
              <div className="mt-6 rounded-2xl bg-cream p-4 text-center text-sm font-semibold text-ink-muted">
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
