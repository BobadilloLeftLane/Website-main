import { ReactNode } from 'react'
import { TranslationContext, useTranslationProvider } from '@/hooks/useTranslation'

interface TranslationProviderProps {
  children: ReactNode
}

const TranslationProvider = ({ children }: TranslationProviderProps) => {
  const translationValue = useTranslationProvider()

  // Show loading state while translation is loading
  if (translationValue.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-electric-blue mx-auto mb-4"></div>
          <p className="text-theme-primary text-xl">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <TranslationContext.Provider value={translationValue}>
      {children}
    </TranslationContext.Provider>
  )
}

export default TranslationProvider