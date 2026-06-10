import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, Home, ScanSearch, ShieldCheck, Sparkles, UserRound } from 'lucide-react'

const items = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Scan', href: '/modules/product-scanner', icon: ScanSearch },
  { label: 'Body', href: '#unity', icon: Brain },
  { label: 'Proof', href: '/modules/evidence-ai', icon: ShieldCheck },
  { label: 'Profile', href: '/auth', icon: UserRound },
]

export default function FloatingDock() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 rounded-full border border-white/12 bg-forest/82 px-2 py-2 shadow-pramana backdrop-blur-xl md:block"
      aria-label="Pramana quick navigation"
    >
      <div className="flex items-center gap-1">
        <div className="mr-1 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-forest">
          <Sparkles size={17} />
        </div>
        {items.map((item) => {
          const Icon = item.icon
          const content = (
            <span className="group relative flex h-10 w-10 items-center justify-center rounded-full text-white/72 transition hover:bg-white/10 hover:text-gold">
              <Icon size={18} />
              <span className="pointer-events-none absolute -top-9 rounded-full bg-cream px-2.5 py-1 text-xs font-bold text-forest opacity-0 shadow-soft transition group-hover:opacity-100">
                {item.label}
              </span>
            </span>
          )

          if (item.href.startsWith('#')) {
            return (
              <a key={item.label} href={item.href}>
                {content}
              </a>
            )
          }

          return (
            <Link key={item.label} to={item.href}>
              {content}
            </Link>
          )
        })}
      </div>
    </motion.nav>
  )
}
