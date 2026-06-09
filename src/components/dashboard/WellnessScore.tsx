import { motion } from 'framer-motion'
import { bodySystems } from '../../data/bodySystems'

export default function WellnessScore() {
  const overallScore = Math.round(
    bodySystems.reduce((sum, s) => sum + s.score, 0) / bodySystems.length,
  )

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (overallScore / 100) * circumference

  return (
    <div className="rounded-[1.5rem] border border-white bg-white p-6 shadow-soft">
      <h2 className="font-display text-lg font-semibold text-ink">
        Trust Readiness Score
      </h2>
      <p className="mt-1 text-xs text-ink-faint">Prototype score across connected signals</p>

      <div className="relative mx-auto mt-6 flex h-36 w-36 items-center justify-center">
        <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#E8F5EE" strokeWidth="8" />
          <motion.circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#173C2B" />
              <stop offset="55%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#B85C38" />
            </linearGradient>
          </defs>
        </svg>
        <div className="text-center">
          <div className="font-display text-4xl font-bold text-ink">{overallScore}</div>
          <div className="text-xs text-ink-faint">/ 100</div>
        </div>
      </div>

      <div className="mt-6 space-y-2">
        {bodySystems.slice(0, 4).map((system) => (
          <div key={system.id} className="flex items-center gap-3">
            <system.icon size={14} style={{ color: system.color }} />
            <span className="flex-1 text-xs text-ink-muted">{system.shortName}</span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-pale">
              <div
                className="h-full rounded-full"
                style={{ width: `${system.score}%`, backgroundColor: system.color }}
              />
            </div>
            <span className="w-8 text-right text-xs font-semibold text-ink-muted">
              {system.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
