import { motion } from 'framer-motion'
import { ArrowRight, ShieldQuestion } from 'lucide-react'
import { painCards } from '../data/pramana'

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-bold uppercase tracking-[0.22em] text-forest-light">
            You are not overthinking it
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl text-balance">
            The market learned your insecurities.
            <br />
            <span className="text-forest">Then sold them back to you.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">
            A serum for glow. A powder for muscle. A hair oil for growth. A clinic for
            fixes. Every product talks loudly, but almost none of them connect the proof
            to your actual body.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {painCards.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-[1.75rem] border border-stone-200 bg-cream p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-pramana"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-pale text-forest">
                <problem.icon size={22} />
              </div>
              <h3 className="font-display text-xl font-semibold text-ink">
                {problem.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {problem.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 overflow-hidden rounded-[2rem] border border-forest/10 bg-forest text-white shadow-pramana lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="p-8 md:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-gold">
              <ShieldQuestion size={24} />
            </div>
            <h3 className="font-display text-3xl font-semibold">Pramana is not another recommendation engine.</h3>
            <p className="mt-4 leading-relaxed text-white/70">
              It is a validation layer. It asks what the product is, what it claims,
              what proof exists, whether it fits your context, and where uncertainty
              remains.
            </p>
            <a href="#scanner" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold">
              See how validation feels
              <ArrowRight size={16} />
            </a>
          </div>
          <div className="grid bg-white/[0.07] p-6 sm:grid-cols-2">
            {[
              ['Claim', 'What does the brand promise?'],
              ['Proof', 'Can the claim be validated?'],
              ['Body', 'Does it fit your skin, routine, goals, and lifestyle?'],
              ['Action', 'Trust, avoid, replace, or ask for more proof.'],
            ].map(([title, text]) => (
              <div key={title} className="border border-white/10 bg-white/5 p-5">
                <div className="font-display text-2xl font-semibold text-gold">{title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
