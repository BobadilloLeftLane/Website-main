import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import AnimatedButton from '@/components/common/AnimatedButton'
import { useTranslation } from '@/hooks/useTranslation'
import { useThrottledScroll } from '@/utils/useThrottledScroll'
import { Globe } from '@/components/ui/Globe'
import PageSEO from '@/components/seo/PageSEO'

const HeroSection = () => {
  const { t } = useTranslation()
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY)
  }, [])

  useThrottledScroll(handleScroll, 50)
  
  // Calculate opacity based on scroll (same for both themes)
  const planetOpacity = Math.max(1 - scrollY / 1200, 0.4) // Min opacity of 0.4 (more visible)

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.2 }
    }
  }

  return (
    <>
      <PageSEO
        title="Nova Studio Solutions"
        description="Nova Studio Solutions - Professional software development agency in Novi Sad, Serbia. SaaS platforms, web & mobile apps, MVP development. Affordable prices, fast delivery. Izrada web sajta i aplikacija po povoljnim cenama. Besplatna konsultacija."
        keywords="software development novi sad, web development serbia, izrada web sajta, izrada aplikacija, saas development, mvp development, mobilne aplikacije, web sajt cena, koliko kosta web sajt, izrada web stranica, programiranje novi sad, software agency serbia, affordable web development, startup development, digitalizacija, react development, node.js, cloud solutions, api integration, digital transformation"
        canonicalUrl="https://www.novastudiosolutions.com/"
      />
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Globe Background */}
      <div
        className="fixed z-0 left-0 right-0 flex items-center justify-center globe-container"
        style={{
          opacity: planetOpacity,
          transition: 'opacity 0.3s ease-out'
        }}
      >
        <Globe className="w-full h-full" />
      </div>


      {/* Main Content */}
      <motion.div
        className="hero-content relative z-20 text-center section-padding max-w-7xl mx-auto pt-56 md:pt-64"
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Main Headlines with Cyberpunk Styling */}
        <motion.div className="mb-8">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-hypik mb-4 tracking-wider"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.8 }
              }
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-orange-500 via-orange-red to-red-600 bg-clip-text text-transparent animate-gradient">
                NOVA{' '}
              </span>
              <span className="bg-gradient-to-r from-green-brown via-yellow-600 to-green-700 bg-clip-text text-transparent animate-gradient">
                STUDIO
              </span>
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-electric-blue via-cyber-purple to-neon-green bg-clip-text text-transparent animate-gradient"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              SOLUTIONS
            </motion.span>
          </motion.h1>

          {/* SEO-Optimized H2 Subtitle */}
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-theme-primary mt-8 mb-4 max-w-4xl mx-auto"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.8, duration: 0.8 }
              }
            }}
          >
            {t?.hero?.seoTitle || "Izrada Web Sajta i Aplikacija u Novom Sadu"}
          </motion.h2>

        </motion.div>

        {/* Spacer */}
        <div className="my-40 md:my-52"></div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.5, duration: 0.8 }
            }
          }}
        >
          <AnimatedButton
            variant="primary"
            size="lg"
            className="group flex items-center space-x-2 px-8 py-4 text-lg"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>{t?.hero?.cta?.primary || "Start Your Project"}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </AnimatedButton>
        </motion.div>

      </motion.div>

      {/* CSS for animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        /* Globe positioning - centered behind "STUDIO" text */
        .globe-container {
          top: 10% !important;
          transform: translateY(-50%) !important;
        }

        /* Desktop - tačno iza STUDIO - DOBRO */
        @media (min-width: 1280px) {
          .globe-container {
            top: 80px !important;
            transform: none !important;
          }
        }

        /* Laptop - tačno iza STUDIO */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .globe-container {
            top: 70px !important;
            transform: none !important;
          }
        }

        /* Tablet - tačno iza STUDIO */
        @media (min-width: 768px) and (max-width: 1023px) {
          .globe-container {
            top: 100px !important;
            transform: none !important;
          }
        }

        /* Large mobile (iPhone 12 Pro, iPhone 14, iPhone 15) - centrirano iza STUDIO */
        @media (min-width: 390px) and (max-width: 767px) {
          .globe-container {
            top: 115px !important;
            transform: none !important;
          }
        }

        /* Medium mobile (iPhone SE, iPhone 8) - centrirano iza STUDIO */
        @media (min-width: 375px) and (max-width: 389px) {
          .globe-container {
            top: 105px !important;
            transform: none !important;
          }
        }

        /* Small mobile - centrirano iza STUDIO */
        @media (max-width: 374px) {
          .globe-container {
            top: 95px !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
    </>
  )
}

export default HeroSection