import { useState, useCallback, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { scrollToSection, navigationSections } from '@/utils/smoothScroll'
import { useTranslation } from '@/hooks/useTranslation'
import { useThrottledScroll } from '@/utils/useThrottledScroll'
import LanguageSelector from '@/components/common/LanguageSelector'
import ThemeToggle from '@/components/common/ThemeToggle'
import LogoIcon from '@/components/common/LogoIcon'

const Header = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Handle scroll effect and active section detection (throttled)
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50)

    // Detect active section
    const sections = navigationSections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id)
    })).filter(section => section.element)

    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      if (section.element) {
        const sectionTop = section.element.offsetTop
        const sectionBottom = sectionTop + section.element.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id)
          break
        }
      }
    }
  }, [])

  useThrottledScroll(handleScroll, 100)

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(2, 6, 23, 0)',
      backdropFilter: 'blur(0px)',
      borderColor: 'rgba(255, 255, 255, 0)'
    },
    scrolled: {
      backgroundColor: 'rgba(2, 6, 23, 0)',
      backdropFilter: 'blur(0px)',
      borderColor: 'rgba(255, 255, 255, 0)'
    }
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  }

  const navItemVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b-0 transition-all duration-300"
      style={{ backgroundColor: 'transparent' }}
      variants={headerVariants}
      animate={isScrolled ? 'scrolled' : 'top'}
    >
      <div className="container-wide section-padding">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button onClick={() => scrollToSection('home')} className="flex items-center">
            <motion.div
              variants={logoVariants}
              whileHover="hover"
            >
              <LogoIcon size={64} className="text-electric-blue" />
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleNavClick(section.id)}
                className="relative"
              >
                <motion.span
                  className={`text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? 'text-electric-blue' 
                      : 'text-theme-secondary hover:text-electric-blue'
                  }`}
                  variants={navItemVariants}
                  whileHover="hover"
                >
{t.nav[section.key.split('.')[1] as keyof typeof t.nav]}
                </motion.span>
                
                {/* Active indicator */}
                {activeSection === section.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-electric-blue"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Language and Theme Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 text-theme-secondary hover:text-electric-blue"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden py-4 border-t-0"
              style={{ backgroundColor: 'transparent' }}
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <nav className="flex flex-col space-y-4">
                {navigationSections.map((section) => (
                  <motion.div key={section.id} variants={mobileItemVariants}>
                    <button
                      onClick={() => handleNavClick(section.id)}
                      className={`block text-base font-medium transition-colors w-full text-left ${
                        activeSection === section.id
                          ? 'text-electric-blue' 
                          : 'text-theme-secondary hover:text-electric-blue'
                      }`}
                    >
    {t.nav[section.key.split('.')[1] as keyof typeof t.nav]}
                    </button>
                  </motion.div>
                ))}
                <motion.div variants={mobileItemVariants} className="pt-4 flex items-center justify-center space-x-4">
                  <ThemeToggle />
                  <LanguageSelector />
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default memo(Header)