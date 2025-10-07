import { useState, useEffect, createContext, useContext } from 'react'
// Import Serbian as default (no lazy loading for default language)
import { sr } from '@/translations/sr'

export type Language = 'sr' | 'en' | 'de' | 'fr' | 'es' | 'tr' | 'el' | 'nl' | 'et' | 'sv' | 'no' | 'it' | 'pt'

// Dynamic imports for translations (except Serbian which is always loaded)
const translationLoaders: Record<Language, () => Promise<{ [key: string]: any }>> = {
  sr: async () => ({ sr }), // Already loaded, return immediately
  en: () => import('@/translations/en').then(m => m),
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

export type TranslationKey = keyof typeof sr
export type Translation = typeof sr

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
  const [currentLanguage, setCurrentLanguage] = useState<Language>('sr')
  const [translation, setTranslation] = useState<Translation>(sr) // Initialize with Serbian
  const [isLoading, setIsLoading] = useState(false) // Start as false since we have Serbian

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
        // Fallback to Serbian
        if (currentLanguage !== 'sr') {
          const fallback = await translationLoaders.sr()
          setTranslation(Object.values(fallback)[0] as Translation)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslation()
  }, [currentLanguage])

  // Load saved language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && savedLanguage !== 'sr' && translationLoaders[savedLanguage]) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return {
    currentLanguage,
    setLanguage,
    t: translation,
    isLoading
  }
}