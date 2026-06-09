import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import BodyUnityMap from '../components/BodyUnityMap'
import SystemCard from '../components/dashboard/SystemCard'
import InsightPanel from '../components/dashboard/InsightPanel'
import WellnessScore from '../components/dashboard/WellnessScore'
import ProductVerifier from '../components/dashboard/ProductVerifier'
import { bodySystems } from '../data/bodySystems'

export default function DashboardPage() {
  const [selectedId, setSelectedId] = useState<string | null>('nutrition')

  const selected = bodySystems.find((s) => s.id === selectedId) ?? null

  return (
    <div className="min-h-screen bg-pale">
      <Navbar variant="light" />

      <main className="mx-auto max-w-7xl px-6 pb-12 pt-28">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Link
              to="/"
              className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-faint transition hover:text-forest"
            >
              <ArrowLeft size={14} />
              Back to Pramana AI
            </Link>
            <h1 className="font-display text-4xl font-semibold text-ink">
              Body Intelligence Demo
            </h1>
            <p className="mt-2 max-w-2xl text-ink-muted">
              A prototype view for connected product, skin, fitness, nutrition, hair,
              sleep, and Indian wellness context.
            </p>
          </div>
          <div className="rounded-2xl border border-forest/15 bg-white px-4 py-2 text-sm font-bold text-forest shadow-soft">
            Demo mode - backend integrations coming later
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
              {bodySystems.map((system) => (
                <SystemCard
                  key={system.id}
                  system={system}
                  isSelected={selectedId === system.id}
                  onClick={() => setSelectedId(system.id)}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-[2rem] border border-white bg-white p-8 shadow-pramana lg:col-span-5"
          >
            <BodyUnityMap
              interactive
              selectedId={selectedId}
              onSelect={setSelectedId}
              size="lg"
            />
            {selected && (
              <motion.p
                key={selected.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 max-w-sm text-center text-sm text-ink-muted"
              >
                <span className="font-semibold text-ink">{selected.name}</span>{' '}
                connects to {selected.connections.length} other signals in the Pramana
                trust graph.
              </motion.p>
            )}
          </motion.div>

          <div className="space-y-6 lg:col-span-4">
            <WellnessScore />
            <InsightPanel selected={selected} />
            <ProductVerifier />
          </div>
        </div>
      </main>
    </div>
  )
}
