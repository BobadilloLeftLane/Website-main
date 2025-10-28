import { useState, useEffect, createContext, useContext } from 'react'
// Import English as default (no lazy loading for default language)
import { en } from '@/translations/en'

export type Language = 'en' | 'sr'

// Dynamic imports for translations (English is always loaded)
const translationLoaders: Record<Language, () => Promise<{ [key: string]: any }>> = {
  en: async () => ({ en }), // Already loaded, return immediately
  sr: () => import('@/translations/sr').then(m => m)
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

      // Map browser language codes to supported languages (English or Serbian only)
      let detectedLang: Language = 'en' // Default to English

      if (browserLang.startsWith('sr')) {
        detectedLang = 'sr' // Serbian
      }
      // All other languages default to English

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