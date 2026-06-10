import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import IntelligencePreviewSection from '../components/IntelligencePreviewSection'
import UnitySection from '../components/UnitySection'
import FeaturesSection from '../components/FeaturesSection'
import ValidationSandboxSection from '../components/ValidationSandboxSection'
import WaitlistSection from '../components/WaitlistSection'
import Footer from '../components/Footer'
import PointerGlow from '../components/PointerGlow'
import FloatingDock from '../components/FloatingDock'

export default function LandingPage() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return

      window.setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView({ block: 'start' })
      }, 80)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [])

  return (
    <>
      <PointerGlow />
      <Navbar variant="dark" />
      <main>
        <Hero />
        <ProblemSection />
        <IntelligencePreviewSection />
        <FeaturesSection />
        <UnitySection />
        <ValidationSandboxSection />
        <WaitlistSection />
      </main>
      <Footer />
      <FloatingDock />
    </>
  )
}
