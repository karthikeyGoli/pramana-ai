import { motion } from 'framer-motion'
import type { BodySystem } from '../../data/bodySystems'

interface SystemCardProps {
  system: BodySystem
  isSelected: boolean
  onClick: () => void
}

export default function SystemCard({ system, isSelected, onClick }: SystemCardProps) {
  const Icon = system.icon

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full rounded-2xl p-5 text-left transition ${
        isSelected
          ? 'bg-emotional text-white shadow-card ring-2 ring-gold/60'
          : 'border border-stone-200 bg-white shadow-soft hover:shadow-card'
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: isSelected ? 'rgba(255,255,255,0.15)' : system.bgColor,
          }}
        >
          <Icon size={18} style={{ color: isSelected ? '#F7E8B5' : system.color }} />
        </div>
        <div
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
            system.score >= 75
              ? 'bg-pale text-forest'
              : system.score >= 60
                ? 'bg-gold/20 text-ink'
                : 'bg-terracotta-soft text-terracotta'
          }`}
        >
          {system.score}%
        </div>
      </div>
      <h3
        className={`mt-3 font-display text-base font-semibold ${isSelected ? 'text-white' : 'text-ink'}`}
      >
        {system.shortName}
      </h3>
      <p
        className={`mt-1 text-xs leading-relaxed ${isSelected ? 'text-white/70' : 'text-ink-faint'}`}
      >
        {system.description.slice(0, 60)}...
      </p>
    </motion.button>
  )
}
