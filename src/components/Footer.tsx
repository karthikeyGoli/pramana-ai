import { Link } from 'react-router-dom'
import { ScanLine } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-forest/10 bg-cream py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-forest text-gold">
            <ScanLine size={16} />
          </div>
          <span className="font-display text-lg font-semibold text-ink">
            Pramana AI
          </span>
        </div>

        <p className="text-center text-sm text-ink-faint">
          Validate Before You Trust. Informational wellness only, not medical diagnosis.
        </p>

        <div className="flex gap-6 text-sm text-ink-muted">
          <Link to="/dashboard" className="transition hover:text-forest">
            Demo dashboard
          </Link>
          <Link to="/privacy" className="transition hover:text-forest">
            Privacy
          </Link>
          <Link to="/terms" className="transition hover:text-forest">
            Terms
          </Link>
          <Link to="/auth" className="transition hover:text-forest">
            Login
          </Link>
          <a href="#waitlist" className="transition hover:text-forest">
            Early access
          </a>
        </div>
      </div>
    </footer>
  )
}
