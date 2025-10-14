import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Globe } from 'lucide-react'
import { useTranslation, type Language } from '@/hooks/useTranslation'

// Flag SVG Components (reuse from LanguageSelector)
const FlagRS = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="5" fill="#C8102E"/>
    <rect y="5" width="20" height="5" fill="#003893"/>
    <rect y="10" width="20" height="5" fill="#FFFFFF"/>
  </svg>
)

const FlagGB = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
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
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="5" fill="#000000"/>
    <rect y="5" width="20" height="5" fill="#DD0000"/>
    <rect y="10" width="20" height="5" fill="#FFCE00"/>
  </svg>
)

const FlagFR = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="6.67" height="15" fill="#002395"/>
    <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
    <rect x="13.33" width="6.67" height="15" fill="#ED2939"/>
  </svg>
)

const FlagES = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#AA151B"/>
    <rect y="3.75" width="20" height="7.5" fill="#F1BF00"/>
  </svg>
)

const FlagTR = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#E30A17"/>
    <circle cx="8" cy="7.5" r="3" fill="none" stroke="#FFFFFF" strokeWidth="0.8"/>
    <circle cx="9.5" cy="7.5" r="2.4" fill="#E30A17"/>
    <path d="M13 6L14 7.5L13 9L14.5 8.2L14.5 6.8Z" fill="#FFFFFF"/>
  </svg>
)

const FlagIT = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="6.67" height="15" fill="#009246"/>
    <rect x="6.67" width="6.67" height="15" fill="#FFFFFF"/>
    <rect x="13.33" width="6.67" height="15" fill="#CE2B37"/>
  </svg>
)

const FlagNL = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="5" fill="#AE1C28"/>
    <rect y="5" width="20" height="5" fill="#FFFFFF"/>
    <rect y="10" width="20" height="5" fill="#21468B"/>
  </svg>
)

const FlagGR = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#0D5EAF"/>
    <rect y="0" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="3.33" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="6.67" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="10" width="20" height="1.67" fill="#FFFFFF"/>
    <rect y="13.33" width="20" height="1.67" fill="#FFFFFF"/>
  </svg>
)

const FlagEE = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="5" fill="#0072CE"/>
    <rect y="5" width="20" height="5" fill="#000000"/>
    <rect y="10" width="20" height="5" fill="#FFFFFF"/>
  </svg>
)

const FlagSE = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#006AA7"/>
    <rect x="6" width="2" height="15" fill="#FECC00"/>
    <rect y="7" width="20" height="2" fill="#FECC00"/>
  </svg>
)

const FlagNO = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#BA0C2F"/>
    <rect x="6" width="2" height="15" fill="#FFFFFF"/>
    <rect y="7" width="20" height="2" fill="#FFFFFF"/>
    <rect x="6.5" width="1" height="15" fill="#00205B"/>
    <rect y="7.5" width="20" height="1" fill="#00205B"/>
  </svg>
)

const FlagPT = () => (
  <svg width="48" height="36" viewBox="0 0 20 15" preserveAspectRatio="xMidYMid">
    <rect width="20" height="15" fill="#FF0000"/>
    <rect width="8" height="15" fill="#006600"/>
  </svg>
)

interface LanguageOption {
  code: Language
  name: string
  nativeName: string
  flag: React.ComponentType
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: FlagGB },
  { code: 'sr', name: 'Serbian', nativeName: 'Srpski', flag: FlagRS },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: FlagDE },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: FlagFR },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: FlagES },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: FlagIT },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: FlagTR },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: FlagNL },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: FlagGR },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: FlagEE },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: FlagSE },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: FlagNO },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: FlagPT },
]

const LanguageModal = () => {
  const { setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already selected a language
    const hasSelectedLanguage = localStorage.getItem('language-selected')
    // Check if cookie consent has been given
    const hasCookieConsent = localStorage.getItem('cookie-consent')

    if (!hasSelectedLanguage && hasCookieConsent) {
      // Show modal after a short delay for better UX (only if cookies accepted)
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1500) // Longer delay to ensure cookie banner is gone first

      return () => clearTimeout(timer)
    }
  }, [])

  const handleLanguageSelect = (languageCode: Language) => {
    setLanguage(languageCode)
    localStorage.setItem('language-selected', 'true')
    localStorage.setItem('user-language', languageCode)
    setIsOpen(false)
  }

  const handleClose = () => {
    // If user closes without selecting, default to English
    if (!localStorage.getItem('language-selected')) {
      setLanguage('en')
      localStorage.setItem('language-selected', 'true')
      localStorage.setItem('user-language', 'en')
    }
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="relative max-w-2xl w-full glass-morphism rounded-2xl border border-electric-blue/30 overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-electric-blue/20 to-cyber-purple/20 p-8 text-center border-b border-white/10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-electric-blue/20 mb-4"
                >
                  <Globe className="w-8 h-8 text-electric-blue" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Choose Your Language</h2>
                <p className="text-silver/70">Select your preferred language to continue</p>
              </div>

              {/* Language Grid */}
              <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {languages.map((language, index) => (
                    <motion.button
                      key={language.code}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl glass-morphism border border-white/10 hover:border-electric-blue/50 transition-all group"
                      onClick={() => handleLanguageSelect(language.code)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="rounded-lg overflow-hidden border-2 border-white/20 group-hover:border-electric-blue/50 transition-colors shadow-lg">
                        <language.flag />
                      </div>
                      <span className="text-sm font-medium text-white group-hover:text-electric-blue transition-colors">
                        {language.nativeName}
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-silver/50 mt-6">
                  You can change the language anytime using the selector in the navigation
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default LanguageModal
