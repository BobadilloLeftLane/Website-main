import { useEffect } from 'react'
import Layout from '@/components/layout/Layout'
import Homepage from '@/pages/Homepage'
import TranslationProvider from '@/components/providers/TranslationProvider'
import { initSmoothScroll } from '@/utils/smoothScroll'

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    initSmoothScroll()
  }, [])

  return (
    <TranslationProvider>
      <Layout>
        <Homepage />
      </Layout>
    </TranslationProvider>
  )
}

export default App