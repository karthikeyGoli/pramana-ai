import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const contactEmail = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL ?? 'hello@pramana.ai'

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-6 py-24 text-ink">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-light">
            Terms
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Early access terms
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Pramana AI is an early product experience for anti-fake beauty, wellness,
            supplement, and body-intelligence validation workflows.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-ink-muted">
            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Informational use only</h2>
              <p className="mt-3">
                Pramana AI provides product validation context and wellness information. It
                is not medical advice, diagnosis, treatment, or a replacement for a doctor,
                dermatologist, dietitian, pharmacist, or other qualified professional.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">No guaranteed product result</h2>
              <p className="mt-3">
                Product scan and validation outputs may be incomplete, especially when public
                databases have limited coverage. Users should verify important safety or
                health decisions with qualified professionals and official product sources.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Acceptable use</h2>
              <p className="mt-3">
                Do not submit content you do not have permission to share, attempt to abuse
                the API, bypass rate limits, or use Pramana AI outputs as a clinical
                decision system.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Contact</h2>
              <p className="mt-3">
                Questions about these terms can be sent to{' '}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-forest">
                  {contactEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
