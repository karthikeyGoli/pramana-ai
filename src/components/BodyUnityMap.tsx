import { PointerEvent, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Move, RefreshCw, Sparkles } from 'lucide-react'
import { bodySystems } from '../data/bodySystems'

interface BodyUnityMapProps {
  interactive?: boolean
  selectedId?: string | null
  onSelect?: (id: string) => void
  size?: 'sm' | 'lg'
}

const defaultPositions: Record<string, { x: number; y: number }> = {
  hair: { x: 50, y: 8 },
  skin: { x: 82, y: 22 },
  beauty: { x: 91, y: 50 },
  nutrition: { x: 78, y: 78 },
  fitness: { x: 50, y: 92 },
  sleep: { x: 22, y: 78 },
  mental: { x: 9, y: 50 },
  ayurveda: { x: 18, y: 22 },
  heart: { x: 50, y: 50 },
}

const bodyAnchors: Record<string, { x: number; y: number; label: string }> = {
  hair: { x: 50, y: 27, label: 'scalp signal' },
  skin: { x: 57, y: 34, label: 'skin barrier' },
  beauty: { x: 61, y: 45, label: 'routine layer' },
  nutrition: { x: 51, y: 57, label: 'gut and fuel' },
  fitness: { x: 50, y: 72, label: 'movement' },
  sleep: { x: 43, y: 35, label: 'recovery rhythm' },
  mental: { x: 43, y: 30, label: 'stress signal' },
  ayurveda: { x: 43, y: 58, label: 'prakriti context' },
  heart: { x: 50, y: 46, label: 'vitality' },
}

const constellationPoints = [
  { id: 'crown', x: 50, y: 21 },
  { id: 'brow', x: 50, y: 29 },
  { id: 'throat', x: 50, y: 38 },
  { id: 'heart', x: 50, y: 47 },
  { id: 'core', x: 50, y: 57 },
  { id: 'root', x: 50, y: 68 },
  { id: 'leftShoulder', x: 40, y: 42 },
  { id: 'rightShoulder', x: 60, y: 42 },
  { id: 'leftHand', x: 32, y: 61 },
  { id: 'rightHand', x: 68, y: 61 },
  { id: 'leftKnee', x: 42, y: 80 },
  { id: 'rightKnee', x: 58, y: 80 },
]

const constellationLines = [
  ['crown', 'brow'],
  ['brow', 'throat'],
  ['throat', 'heart'],
  ['heart', 'core'],
  ['core', 'root'],
  ['throat', 'leftShoulder'],
  ['throat', 'rightShoulder'],
  ['leftShoulder', 'leftHand'],
  ['rightShoulder', 'rightHand'],
  ['root', 'leftKnee'],
  ['root', 'rightKnee'],
]

const anchorToConstellation: Record<string, string[]> = {
  hair: ['crown', 'brow'],
  skin: ['brow', 'throat', 'heart'],
  beauty: ['brow', 'throat', 'rightShoulder'],
  nutrition: ['core', 'root'],
  fitness: ['leftShoulder', 'rightShoulder', 'leftKnee', 'rightKnee'],
  sleep: ['brow', 'heart'],
  mental: ['brow', 'throat'],
  ayurveda: ['core', 'root', 'heart'],
  heart: ['heart', 'core'],
}

const getConstellationPoint = (id: string) => {
  return constellationPoints.find((point) => point.id === id) ?? constellationPoints[0]
}

const clamp = (value: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, value))
}

const relationshipCopy: Record<string, string> = {
  'nutrition-skin': 'Food, digestion, and product ingredients can change how skin reacts.',
  'fitness-sleep': 'Training only works when recovery has enough room to repair.',
  'hair-ayurveda': 'Scalp dryness, oils, and routine rhythm can be reviewed together.',
  'beauty-skin': 'A product should match your skin context, not just a trend.',
  'mental-sleep': 'Stress and sleep shape cravings, recovery, and skin confidence.',
  'fitness-heart': 'Vitality signals make workout advice safer and more personal.',
}

function connectionKey(a: string, b: string) {
  return [a, b].sort().join('-')
}

export default function BodyUnityMap({
  interactive = false,
  selectedId,
  onSelect,
  size = 'lg',
}: BodyUnityMapProps) {
  const dim = size === 'lg' ? 460 : 300
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: string; moved: boolean } | null>(null)
  const [positions, setPositions] = useState(defaultPositions)
  const [internalSelectedId, setInternalSelectedId] = useState<string | null>(
    interactive ? 'skin' : null,
  )
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const activeId = selectedId ?? internalSelectedId
  const focusId = hoveredId ?? draggingId ?? activeId
  const selected = bodySystems.find((system) => system.id === activeId) ?? null
  const hovered = bodySystems.find((system) => system.id === hoveredId) ?? null
  const detailSystem = hovered ?? selected

  const connections = useMemo(() => {
    const next: [string, string][] = []

    bodySystems.forEach((system) => {
      system.connections.forEach((targetId) => {
        const key = connectionKey(system.id, targetId)
        if (!next.some(([a, b]) => connectionKey(a, b) === key)) {
          next.push([system.id, targetId])
        }
      })
    })

    return next
  }, [])

  const selectNode = (id: string) => {
    onSelect?.(id)
    if (!onSelect) {
      setInternalSelectedId(id)
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (!interactive) return

    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id, moved: false }
    setDraggingId(id)
    setHoveredId(id)
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const drag = dragRef.current
    const rect = containerRef.current?.getBoundingClientRect()

    if (!drag || !rect) return

    drag.moved = true
    const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 9, 91)
    const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 9, 91)

    setPositions((current) => ({
      ...current,
      [drag.id]: { x, y },
    }))
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>, id: string) => {
    if (!interactive) return

    event.currentTarget.releasePointerCapture(event.pointerId)

    if (!dragRef.current?.moved) {
      selectNode(id)
    }

    dragRef.current = null
    setDraggingId(null)
  }

  const resetLayout = () => {
    setPositions(defaultPositions)
    if (!onSelect) {
      setInternalSelectedId('skin')
    }
  }

  const activeConnection = connections.find(([from, to]) => {
    return focusId === from || focusId === to
  })
  const activeRelationship = activeConnection
    ? relationshipCopy[connectionKey(activeConnection[0], activeConnection[1])]
    : null
  const activeAnchor = focusId ? bodyAnchors[focusId] : null

  return (
    <div className="w-full">
      {interactive && size === 'lg' && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-pale px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-forest">
            <Move size={14} />
            Drag the signals
          </div>
          <button
            type="button"
            onClick={resetLayout}
            className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-white px-4 py-2 text-xs font-bold text-forest transition hover:border-forest/40"
          >
            <RefreshCw size={14} />
            Reset graph
          </button>
        </div>
      )}

      <div
        ref={containerRef}
        className="relative mx-auto touch-none select-none"
        style={{ width: `min(100%, ${dim}px)`, maxWidth: dim, aspectRatio: '1 / 1' }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.28" />
              <stop offset="55%" stopColor="#2E7D52" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#173C2B" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="edgeGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F7E8B5" />
              <stop offset="45%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#2E7D52" />
            </linearGradient>
            <linearGradient id="mandalaGold" x1="12%" y1="8%" x2="88%" y2="92%">
              <stop offset="0%" stopColor="#F7E8B5" stopOpacity="0.96" />
              <stop offset="45%" stopColor="#C9A84C" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#2E7D52" stopOpacity="0.7" />
            </linearGradient>
            <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="50" cy="50" r="30" fill="url(#coreGlow)" className="animate-pulse-slow" />
          {[16, 24, 32, 40].map((radius, index) => (
            <motion.circle
              key={radius}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={index % 2 === 0 ? '#E8F5EE' : '#F7E8B5'}
              strokeWidth={index === 3 ? 0.28 : 0.42}
              strokeOpacity={index === 3 ? 0.75 : 0.9}
              strokeDasharray={index % 2 === 0 ? '1 3' : '2 4'}
              animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
              style={{ transformOrigin: '50px 50px' }}
              transition={{ duration: 60 + index * 12, repeat: Infinity, ease: 'linear' }}
            />
          ))}

          {[0, 30, 60, 90, 120, 150].map((rotation) => (
            <motion.path
              key={rotation}
              d="M50 16 C58 30 70 42 84 50 C70 58 58 70 50 84 C42 70 30 58 16 50 C30 42 42 30 50 16Z"
              fill="none"
              stroke="url(#mandalaGold)"
              strokeWidth="0.35"
              strokeOpacity="0.42"
              transform={`rotate(${rotation} 50 50)`}
              animate={{ opacity: focusId ? 0.26 : 0.42 }}
              transition={{ duration: 0.3 }}
            />
          ))}

          {bodySystems.map((system) => {
            const node = positions[system.id]
            const anchor = bodyAnchors[system.id]
            const isFocused = focusId === system.id
            const selectedSystem = bodySystems.find((item) => item.id === focusId)
            const isRelated = Boolean(
              focusId &&
                (selectedSystem?.connections.includes(system.id) ||
                  system.connections.includes(focusId)),
            )
            const isMuted = Boolean(focusId) && !isFocused && !isRelated

            return (
              <motion.line
                key={`${system.id}-body-anchor`}
                x1={node.x}
                y1={node.y}
                x2={anchor.x}
                y2={anchor.y}
                stroke={isFocused ? 'url(#edgeGold)' : '#D9C78D'}
                strokeWidth={isFocused ? 0.62 : 0.22}
                strokeOpacity={isFocused ? 0.9 : isMuted ? 0.08 : 0.26}
                strokeDasharray={isFocused ? '0' : '0.9 1.5'}
                animate={{ pathLength: isMuted ? 0.75 : 1 }}
                transition={{ duration: 0.4 }}
              />
            )
          })}

          <motion.g filter="url(#softGlow)">
            {constellationLines.map(([from, to]) => {
              const start = getConstellationPoint(from)
              const end = getConstellationPoint(to)
              const activePoints = focusId ? anchorToConstellation[focusId] ?? [] : []
              const isActive = activePoints.includes(from) || activePoints.includes(to)

              return (
                <motion.line
                  key={`${from}-${to}`}
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke={isActive ? '#C9A84C' : '#173C2B'}
                  strokeWidth={isActive ? 0.75 : 0.42}
                  strokeOpacity={isActive ? 0.82 : 0.22}
                  transition={{ duration: 0.25 }}
                />
              )
            })}
            {constellationPoints.map((point) => {
              const activePoints = focusId ? anchorToConstellation[focusId] ?? [] : []
              const isActive = activePoints.includes(point.id)

              return (
                <motion.circle
                  key={point.id}
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? 1.95 : 1.25}
                  fill={isActive ? '#C9A84C' : '#FFFFFF'}
                  stroke={isActive ? '#173C2B' : '#C9A84C'}
                  strokeWidth="0.42"
                  animate={{
                    opacity: isActive ? 1 : 0.78,
                    scale: isActive ? [1, 1.28, 1] : 1,
                  }}
                  transition={{
                    duration: isActive ? 1.8 : 0.25,
                    repeat: isActive ? Infinity : 0,
                  }}
                />
              )
            })}
          </motion.g>

          <motion.g
            key={focusId ?? 'all-regions'}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: activeAnchor ? 1 : 0.45, scale: activeAnchor ? 1 : 0.95 }}
            transition={{ duration: 0.28 }}
            transform={`translate(${activeAnchor?.x ?? 50} ${activeAnchor?.y ?? 45})`}
          >
            <circle r="6.5" fill="#C9A84C" fillOpacity="0.3" />
            <circle r="3.2" fill="#C9A84C" fillOpacity="0.78" />
          </motion.g>

          {connections.map(([from, to], index) => {
            const p1 = positions[from]
            const p2 = positions[to]
            const isFocused = focusId === from || focusId === to
            const isMuted = Boolean(focusId) && !isFocused

            return (
              <motion.line
                key={`${from}-${to}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={isFocused ? 'url(#edgeGold)' : '#A8BFAE'}
                strokeWidth={isFocused ? 0.7 : 0.28}
                strokeOpacity={isFocused ? 0.95 : isMuted ? 0.16 : 0.48}
                strokeDasharray={isFocused ? '0' : '1.2 1.2'}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: index * 0.025 }}
              />
            )
          })}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-forest/95 shadow-green md:h-[4.5rem] md:w-[4.5rem]"
          >
            <span className="font-display text-sm font-bold text-white md:text-base">YOU</span>
          </motion.div>
        </div>

        {bodySystems.map((system, index) => {
          const pos = positions[system.id]
          const Icon = system.icon
          const isSelected = activeId === system.id
          const isHovered = hoveredId === system.id
          const isDragging = draggingId === system.id
          const selectedSystem = bodySystems.find((s) => s.id === focusId)
          const isConnected = Boolean(
            focusId &&
              (selectedSystem?.connections.includes(system.id) ||
                system.connections.includes(focusId)),
          )
          const isDimmed = Boolean(focusId) && !isSelected && !isHovered && !isConnected

          return (
            <motion.button
              key={system.id}
              type="button"
              disabled={!interactive}
              onPointerDown={(event) => handlePointerDown(event, system.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={(event) => handlePointerUp(event, system.id)}
              onPointerCancel={() => {
                dragRef.current = null
                setDraggingId(null)
              }}
              onMouseEnter={() => interactive && setHoveredId(system.id)}
              onMouseLeave={() => interactive && !draggingId && setHoveredId(null)}
              onKeyDown={(event) => {
                if (interactive && (event.key === 'Enter' || event.key === ' ')) {
                  event.preventDefault()
                  selectNode(system.id)
                }
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isDimmed ? 0.34 : 1,
                scale: isSelected || isHovered || isDragging ? 1.08 : 1,
              }}
              transition={{ delay: 0.07 * index, type: 'spring', stiffness: 260, damping: 20 }}
              className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 outline-none ${
                interactive ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
              }`}
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              aria-label={`${system.name}: ${system.description}`}
            >
              <div
                className={`flex items-center justify-center rounded-2xl border border-white shadow-soft transition-all ${
                  size === 'lg' ? 'h-12 w-12 md:h-14 md:w-14' : 'h-10 w-10'
                } ${
                  isSelected
                    ? 'ring-2 ring-gold ring-offset-2'
                    : isConnected
                      ? 'ring-1 ring-forest/50'
                      : ''
                }`}
                style={{ backgroundColor: system.bgColor }}
              >
                <Icon size={size === 'lg' ? 20 : 16} style={{ color: system.color }} />
              </div>
              {size === 'lg' && (
                <span
                  className={`rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-bold shadow-soft md:text-xs ${
                    isSelected || isHovered ? 'text-forest' : 'text-ink-muted'
                  }`}
                >
                  {system.shortName}
                </span>
              )}
            </motion.button>
          )
        })}

        {activeAnchor && size === 'lg' && (
          <motion.div
            key={`${focusId}-anchor-label`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="pointer-events-none absolute z-30 -translate-x-1/2 rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold shadow-green"
            style={{
              left: `${activeAnchor.x}%`,
              top: `${clamp(activeAnchor.y + 8, 10, 88)}%`,
            }}
          >
            {activeAnchor.label}
          </motion.div>
        )}
      </div>

      {interactive && size === 'lg' && detailSystem && (
        <motion.div
          key={detailSystem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-5 max-w-md rounded-2xl border border-forest/10 bg-white p-4 text-left shadow-soft"
        >
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: detailSystem.bgColor }}
            >
              <detailSystem.icon size={18} style={{ color: detailSystem.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {detailSystem.name}
                </h3>
                {draggingId === detailSystem.id && (
                  <Sparkles size={15} className="text-gold" />
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                {detailSystem.insight}
              </p>
              {activeRelationship && (
                <p className="mt-3 rounded-xl bg-pale px-3 py-2 text-xs font-semibold leading-relaxed text-forest">
                  {activeRelationship}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
