import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import { motion } from 'framer-motion'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const pageVariants = {
    initial: { 
      opacity: 0,
      x: -20
    },
    in: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-midnight text-white overflow-x-hidden flex flex-col">
      <Header />
      
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="in"
        className="relative flex-1"
      >
        {children}
      </motion.main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout