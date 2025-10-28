import { useEffect } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Layout from '@/components/layout/Layout'
import Homepage from '@/pages/Homepage'
import TranslationProvider from '@/components/providers/TranslationProvider'
import CookieConsent from '@/components/common/CookieConsent'
import { initSmoothScroll } from '@/utils/smoothScroll'

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll()
  }, [])

  return (
    <HelmetProvider>
      <TranslationProvider>
        <CookieConsent />
        <Layout>
          <Homepage />
        </Layout>
      </TranslationProvider>
    </HelmetProvider>
  )
}

export default App