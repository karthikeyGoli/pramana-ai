import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ProblemSection from '../components/ProblemSection'
import IntelligencePreviewSection from '../components/IntelligencePreviewSection'
import UnitySection from '../components/UnitySection'
import FeaturesSection from '../components/FeaturesSection'
import ValidationSandboxSection from '../components/ValidationSandboxSection'
import WaitlistSection from '../components/WaitlistSection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
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
    </>
  )
}
