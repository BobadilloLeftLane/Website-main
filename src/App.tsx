import { useEffect, useState } from 'react'
import Layout from '@/components/layout/Layout'
import Homepage from '@/pages/Homepage'
import TranslationProvider from '@/components/providers/TranslationProvider'
import CookieConsent from '@/components/common/CookieConsent'
import UnderConstructionModal from '@/components/common/UnderConstructionModal'
import { initSmoothScroll } from '@/utils/smoothScroll'

function App() {
  const [showConstructionModal, setShowConstructionModal] = useState(true)

  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll()
  }, [])

  return (
    <TranslationProvider>
      <UnderConstructionModal
        isOpen={showConstructionModal}
        onClose={() => setShowConstructionModal(false)}
      />
      <CookieConsent />
      <Layout>
        <Homepage />
      </Layout>
    </TranslationProvider>
  )
}

export default App