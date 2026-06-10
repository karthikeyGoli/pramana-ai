import { useEffect, useState } from 'react'

export default function PointerGlow() {
  const [position, setPosition] = useState({ x: -300, y: -300 })

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden mix-blend-screen md:block"
      style={{
        background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, rgba(201,168,76,0.18), rgba(46,125,82,0.08) 36%, transparent 68%)`,
      }}
    />
  )
}
