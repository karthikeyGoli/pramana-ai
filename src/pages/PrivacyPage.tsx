import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const contactEmail = import.meta.env.VITE_PUBLIC_CONTACT_EMAIL ?? 'hello@pramana.ai'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream px-6 py-24 text-ink">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-forest-light">
            Privacy Policy
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Pramana AI privacy principles
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Pramana AI is currently an early access product for anti-fake product
            validation. We collect only the information needed to understand demand,
            improve product scan flows, and contact early users.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-ink-muted">
            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Data we collect</h2>
              <p className="mt-3">
                Waitlist submissions may include your name, email, selected goal, product
                concern, consent choices, source, and timestamps. Product scan submissions
                may include product name, category, barcode, ingredient text, image metadata,
                scan result metadata, confidence, and source references.
              </p>
              <p className="mt-3">
                If you create an account and complete the intake, we may also store
                age range, body context, goals, skin/hair priorities, nutrition pattern,
                activity, sleep, stress, allergies, medications, known conditions, cycle
                context if relevant, Ayurveda preference, and explicit consent metadata.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">What we do not collect in v1</h2>
              <p className="mt-3">
                Production v1 does not collect exact date of birth, address, wearable imports,
                skin photos, lab reports, doctor exports, prescriptions as files, diagnosis
                documents, or medical records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">How we use data</h2>
              <p className="mt-3">
                We use submitted data to operate the waitlist, improve anti-fake product
                validation flows, understand product categories users care about, and send
                launch updates if you consent to marketing email. Health-adjacent intake is
                used to personalize product validation context and should not be treated as
                clinical assessment.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Your controls</h2>
              <p className="mt-3">
                You can request export or deletion of your early access data by emailing{' '}
                <a href={`mailto:${contactEmail}`} className="font-semibold text-forest">
                  {contactEmail}
                </a>
                . We will verify the request before changing records.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-ink">Medical disclaimer</h2>
              <p className="mt-3">
                Pramana AI is informational wellness software. It does not diagnose, treat,
                cure, prevent disease, or replace a qualified clinician.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
