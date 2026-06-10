import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, ScanLine, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false)
  const isDark = variant === 'dark'

  const linkClass = `text-sm font-semibold transition hover:opacity-70 ${
    isDark ? 'text-white/70' : 'text-ink-muted'
  }`

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6"
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl px-5 py-3 ${
          isDark ? 'glass-dark text-cream' : 'glass shadow-soft'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-forest text-gold">
            <ScanLine size={18} />
          </div>
          <span
            className={`font-display text-xl font-semibold ${isDark ? 'text-cream' : 'text-ink'}`}
          >
            Pramana AI
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#problem" className={linkClass}>
            Anti-fake
          </a>
          <a href="#scanner" className={linkClass}>
            Scan demo
          </a>
          <a href="#features" className={linkClass}>
            Intelligence
          </a>
          <Link to="/modules/product-scanner" className={linkClass}>
            Modules
          </Link>
          <Link to="/auth" className={linkClass}>
            Login
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-bold text-forest shadow-green transition hover:-translate-y-0.5"
          >
            Join early access
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            <a href="#problem" onClick={() => setOpen(false)} className="text-ink-muted">
              Anti-fake
            </a>
            <a href="#scanner" onClick={() => setOpen(false)} className="text-ink-muted">
              Scan demo
            </a>
            <a href="#features" onClick={() => setOpen(false)} className="text-ink-muted">
              Intelligence
            </a>
            <Link to="/modules/product-scanner" onClick={() => setOpen(false)} className="text-ink-muted">
              Modules
            </Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="text-ink-muted">
              Login / signup
            </Link>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="rounded-full bg-cta px-5 py-2.5 text-center font-bold text-forest"
            >
              Join early access
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
