import { CSSProperties, ReactNode, useState } from 'react'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const [style, setStyle] = useState<CSSProperties>({
    '--spotlight-x': '50%',
    '--spotlight-y': '50%',
  } as CSSProperties)

  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setStyle({
          '--spotlight-x': `${event.clientX - rect.left}px`,
          '--spotlight-y': `${event.clientY - rect.top}px`,
        } as CSSProperties)
      }}
      style={style}
      className={`spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}
