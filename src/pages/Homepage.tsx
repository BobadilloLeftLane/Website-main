import { lazy, Suspense } from 'react'
import ServicesSection from '@/components/sections/ServicesSection'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutSection from '@/components/sections/AboutSection'

// Lazy load sections with 3D components
const HeroSection = lazy(() => import('@/components/sections/HeroSection'))
const ContactSection = lazy(() => import('@/components/sections/ContactSection'))

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-theme-bg">
    <div className="animate-pulse text-theme-primary text-xl">Loading...</div>
  </div>
)

const Homepage = () => {
  return (
    <div className="overflow-hidden">
      <section id="home">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="process">
        <ProcessSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="contact">
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </section>
    </div>
  )
}

export default Homepage