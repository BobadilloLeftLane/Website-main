import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTranslation, type Language } from '@/hooks/useTranslation'

// Flag SVG Components
const FlagRS = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="5" fill="#C8102E"/>
    <rect y="5" width="20" height="5" fill="#003893"/>
    <rect y="10" width="20" height="5" fill="#FFFFFF"/>
  </svg>
)

const FlagGB = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#012169"/>
    <path d="M0 0L20 15M20 0L0 15" stroke="#FFFFFF" strokeWidth="1.5"/>
    <path d="M0 0L20 15M20 0L0 15" stroke="#C8102E" strokeWidth="1"/>
    <rect x="8" width="4" height="15" fill="#FFFFFF"/>
    <rect y="6" width="20" height="3" fill="#FFFFFF"/>
    <rect x="9" width="2" height="15" fill="#C8102E"/>
    <rect y="7" width="20" height="1" fill="#C8102E"/>
  </svg>
)

const FlagDE = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="5" fill="#000000"/>
    <rect y="5" width="20" height="5" fill="#DD0000"/>
    <rect y="10" width="20" height="5" fill="#FFCE00"/>
  </svg>
)

const FlagFR = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="6.67" height="15" fill="#002395"/>
    <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
    <rect x="13.33" width="6.67" height="15" fill="#ED2939"/>
  </svg>
)

const FlagES = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#AA151B"/>
    <rect y="3.75" width="20" height="7.5" fill="#F1BF00"/>
  </svg>
)

const FlagTR = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#E30A17"/>
    <circle cx="8" cy="7.5" r="3" fill="none" stroke="#FFFFFF" strokeWidth="0.8"/>
    <circle cx="9.5" cy="7.5" r="2.4" fill="#E30A17"/>
    <path d="M13 6L14 7.5L13 9L14.5 8.2L14.5 6.8Z" fill="#FFFFFF"/>
  </svg>
)

const FlagGR = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#0D5EAF"/>
    <rect y="0" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="3.33" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="6.67" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="10" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="13.33" width="20" height="1.67" fill="#FFFFFF"/>
    <rect width="8" height="8" fill="#0D5EAF"/>
    <rect x="3.5" y="0" width="1" height="8" fill="#FFFFFF"/>
    <rect x="0" y="3.5" width="8" height="1" fill="#FFFFFF"/>
  </svg>
)

const FlagNL = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="5" fill="#AE1C28"/>
    <rect y="5" width="20" height="5" fill="#FFFFFF"/>
    <rect y="10" width="20" height="5" fill="#21468B"/>
  </svg>
)

const FlagEE = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="5" fill="#0072CE"/>
    <rect y="5" width="20" height="5" fill="#000000"/>
    <rect y="10" width="20" height="5" fill="#FFFFFF"/>
  </svg>
)

const FlagSE = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#006AA7"/>
    <rect x="6" y="0" width="2" height="15" fill="#FECC00"/>
    <rect x="0" y="6" width="20" height="2" fill="#FECC00"/>
  </svg>
)

const FlagNO = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="20" height="15" fill="#EF2B2D"/>
    <rect x="6" y="0" width="2" height="15" fill="#FFFFFF"/>
    <rect x="0" y="6" width="20" height="3" fill="#FFFFFF"/>
    <rect x="7" y="0" width="1" height="15" fill="#002868"/>
    <rect x="0" y="7" width="20" height="1" fill="#002868"/>
  </svg>
)

const FlagIT = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="6.67" height="15" fill="#009246"/>
    <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
    <rect x="13.33" width="6.67" height="15" fill="#CE2B37"/>
  </svg>
)

const FlagPT = () => (
  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
    <rect width="8" height="15" fill="#046A38"/>
    <rect x="8" width="12" height="15" fill="#DA020E"/>
  </svg>
)

interface LanguageOption {
  code: Language
  name: string
  flag: React.ComponentType
}

const languages: LanguageOption[] = [
  { code: 'sr', name: 'Srpski', flag: FlagRS },
  { code: 'en', name: 'English', flag: FlagGB },
  { code: 'de', name: 'Deutsch', flag: FlagDE },
  { code: 'fr', name: 'Français', flag: FlagFR },
  { code: 'es', name: 'Español', flag: FlagES },
  { code: 'tr', name: 'Türkçe', flag: FlagTR },
  { code: 'el', name: 'Ελληνικά', flag: FlagGR },
  { code: 'nl', name: 'Nederlands', flag: FlagNL },
  { code: 'et', name: 'Eesti', flag: FlagEE },
  { code: 'sv', name: 'Svenska', flag: FlagSE },
  { code: 'no', name: 'Norsk', flag: FlagNO },
  { code: 'it', name: 'Italiano', flag: FlagIT },
  { code: 'pt', name: 'Português', flag: FlagPT }
]

const LanguageSelector = () => {
  const { currentLanguage, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLangData = languages.find(lang => lang.code === currentLanguage) || languages[0]

  const handleLanguageChange = (language: LanguageOption) => {
    setLanguage(language.code)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
      <div className="relative" ref={dropdownRef}>
      <motion.button
        className="flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg glass-morphism transition-colors touch-manipulation"
        style={{ backgroundColor: 'var(--bg-glass)' }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="inline-flex items-center justify-center rounded-sm overflow-hidden border border-white/10">
          <currentLangData.flag />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-theme-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 right-0 w-[180px] sm:w-[200px] glass-morphism rounded-lg border border-theme-primary overflow-hidden z-50 max-h-[70vh] sm:max-h-[60vh] overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-glass)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)'
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors touch-manipulation ${
                  currentLanguage === language.code ? 'bg-electric-blue/20' : ''
                }`}
                onClick={() => handleLanguageChange(language)}
                whileHover={{ backgroundColor: 'var(--bg-tertiary)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="inline-flex items-center justify-center rounded-sm overflow-hidden border border-white/10 flex-shrink-0">
                  <language.flag />
                </div>
                <span className="text-sm font-medium text-theme-primary whitespace-nowrap">{language.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
  )
}

export default LanguageSelector