import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { useThrottledScroll } from '@/utils/useThrottledScroll'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300)
  }, [])

  useThrottledScroll(toggleVisibility, 200)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 0 20px rgba(249, 115, 22, 0.5)",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-red to-red-600 text-white shadow-lg"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          whileHover="hover"
          whileTap="tap"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop