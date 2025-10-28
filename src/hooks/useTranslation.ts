import { useState, useEffect, createContext, useContext } from 'react'
// Import English as default (no lazy loading for default language)
import { en } from '@/translations/en'

export type Language = 'sr' | 'en' | 'de' | 'fr' | 'es' | 'tr' | 'el' | 'nl' | 'et' | 'sv' | 'no' | 'it' | 'pt'

// Dynamic imports for translations (except English which is always loaded)
const translationLoaders: Record<Language, () => Promise<{ [key: string]: any }>> = {
  en: async () => ({ en }), // Already loaded, return immediately
  sr: () => import('@/translations/sr').then(m => m),
  de: () => import('@/translations/de').then(m => m),
  fr: () => import('@/translations/fr').then(m => m),
  es: () => import('@/translations/es').then(m => m),
  tr: () => import('@/translations/tr').then(m => m),
  el: () => import('@/translations/el').then(m => m),
  nl: () => import('@/translations/nl').then(m => m),
  et: () => import('@/translations/et').then(m => m),
  sv: () => import('@/translations/sv').then(m => m),
  no: () => import('@/translations/no').then(m => m),
  it: () => import('@/translations/it').then(m => m),
  pt: () => import('@/translations/pt').then(m => m)
}

export type TranslationKey = keyof typeof en
export type Translation = typeof en

interface TranslationContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
  t: Translation
  isLoading: boolean
}

export const TranslationContext = createContext<TranslationContextType | null>(null)

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}

export const useTranslationProvider = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en')
  const [translation, setTranslation] = useState<Translation>(en) // Initialize with English
  const [isLoading, setIsLoading] = useState(false) // Start as false since we have English

  // Load translation dynamically when language changes
  useEffect(() => {
    const loadTranslation = async () => {
      setIsLoading(true)
      try {
        const module = await translationLoaders[currentLanguage]()
        // Get the first export from the module (sr, en, de, etc.)
        const translationData = Object.values(module)[0] as Translation
        setTranslation(translationData)
      } catch (error) {
        console.error(`Failed to load translation for ${currentLanguage}`, error)
        // Fallback to English
        if (currentLanguage !== 'en') {
          const fallback = await translationLoaders.en()
          setTranslation(Object.values(fallback)[0] as Translation)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslation()
  }, [currentLanguage])

  // Auto-detect browser language on first visit, default to English otherwise
  useEffect(() => {
    const savedLanguage = localStorage.getItem('user-language') as Language

    if (savedLanguage && translationLoaders[savedLanguage]) {
      // User has manually selected a language before
      setCurrentLanguage(savedLanguage)
    } else {
      // First visit - auto-detect browser language
      const browserLang = navigator.language.toLowerCase()

      // Map browser language codes to supported languages
      let detectedLang: Language = 'en' // Default to English

      if (browserLang.startsWith('sr')) {
        detectedLang = 'sr' // Serbian
      } else if (browserLang.startsWith('de')) {
        detectedLang = 'de' // German
      } else if (browserLang.startsWith('fr')) {
        detectedLang = 'fr' // French
      } else if (browserLang.startsWith('es')) {
        detectedLang = 'es' // Spanish
      } else if (browserLang.startsWith('tr')) {
        detectedLang = 'tr' // Turkish
      } else if (browserLang.startsWith('el')) {
        detectedLang = 'el' // Greek
      } else if (browserLang.startsWith('nl')) {
        detectedLang = 'nl' // Dutch
      } else if (browserLang.startsWith('et')) {
        detectedLang = 'et' // Estonian
      } else if (browserLang.startsWith('sv')) {
        detectedLang = 'sv' // Swedish
      } else if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) {
        detectedLang = 'no' // Norwegian
      } else if (browserLang.startsWith('it')) {
        detectedLang = 'it' // Italian
      } else if (browserLang.startsWith('pt')) {
        detectedLang = 'pt' // Portuguese
      }

      console.log(`🌍 Auto-detected language: ${detectedLang} (from browser: ${browserLang})`)
      setCurrentLanguage(detectedLang)
      localStorage.setItem('user-language', detectedLang)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem('user-language', lang)
  }

  return {
    currentLanguage,
    setLanguage,
    t: translation,
    isLoading
  }
}