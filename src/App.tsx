import { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import Homepage from '@/pages/Homepage'
import TranslationProvider from '@/components/providers/TranslationProvider'
import CookieConsent from '@/components/common/CookieConsent'
import LanguageModal from '@/components/common/LanguageModal'
import { initSmoothScroll } from '@/utils/smoothScroll'

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll()
  }, [])

  return (
    <TranslationProvider>
      <CookieConsent />
      <LanguageModal />
      <Layout>
        <Homepage />
      </Layout>
    </TranslationProvider>
  )
}

export default App