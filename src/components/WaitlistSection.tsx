import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Mail, ShieldCheck } from 'lucide-react'
import { waitlistGoals } from '../data/pramana'
import { saveWaitlistLead } from '../lib/pramanaBackend'

export default function WaitlistSection() {
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [goal, setGoal] = useState(waitlistGoals[0])
  const [synced, setSynced] = useState(true)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('saving')

    const formData = new FormData(event.currentTarget)

    try {
      const result = await saveWaitlistLead({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        goal,
        productConcern: String(formData.get('productConcern') ?? ''),
        consentPrivacy: formData.get('consentPrivacy') === 'on',
        consentMarketing: formData.get('consentMarketing') === 'on',
      })
      setSynced(result.synced)
      setStatus('saved')
      event.currentTarget.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="waitlist" className="bg-forest px-6 py-24 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
            <ShieldCheck size={14} />
            Early access
          </span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-tight md:text-5xl">
            Help build the anti-fake body intelligence layer India deserves.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Join the first Pramana AI circle. We will use early signups to decide which
            products, routines, and verification flows matter first.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-white/80 sm:grid-cols-2">
            {['No medical diagnosis claims', 'Subtle Ayurveda context', 'Women-first trust design', 'B2C now, B2B later'].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-gold" />
                  {item}
                </div>
              ),
            )}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/15 bg-white p-5 text-ink shadow-pramana md:p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pale text-forest">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold">Get early access</h3>
              <p className="text-sm text-ink-muted">Light backend capture is active locally.</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-ink">
              Name
              <input
                required
                name="name"
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-cream px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
              />
            </label>
            <label className="text-sm font-semibold text-ink">
              Email
              <input
                required
                name="email"
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-stone-200 bg-cream px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
              />
            </label>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-ink">What do you want Pramana to validate first?</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {waitlistGoals.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setGoal(item)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    goal === item
                      ? 'border-forest bg-forest text-white'
                      : 'border-stone-200 bg-white text-ink-muted hover:border-forest/40'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-5 block text-sm font-semibold text-ink">
            Product or routine you do not trust
            <textarea
              name="productConcern"
              rows={3}
              placeholder="Example: viral serum, protein powder, hair oil, whitening cream..."
              className="mt-2 w-full resize-none rounded-2xl border border-stone-200 bg-cream px-4 py-3 text-sm outline-none transition focus:border-forest focus:ring-4 focus:ring-forest/10"
            />
          </label>

          <div className="mt-5 space-y-3 rounded-2xl border border-stone-200 bg-cream p-4 text-sm text-ink-muted">
            <label className="flex gap-3">
              <input
                required
                name="consentPrivacy"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-stone-300 text-forest focus:ring-forest"
              />
              <span>
                I agree to Pramana AI storing my signup and product concern for early access.
                This is informational wellness only, not medical advice.
              </span>
            </label>
            <label className="flex gap-3">
              <input
                name="consentMarketing"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-stone-300 text-forest focus:ring-forest"
              />
              <span>Email me product updates and launch invites.</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === 'saving'}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cta px-6 py-4 text-sm font-bold text-forest shadow-green transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'saving' ? 'Saving...' : 'Join Pramana AI'}
            <ArrowRight size={18} />
          </button>

          {status === 'saved' && (
            <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              {synced
                ? 'You are in. Your signup has been captured for early access.'
                : 'Saved in local development mode. Connect the production API to sync it.'}
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
              We could not save this yet. Please try again in a moment.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
