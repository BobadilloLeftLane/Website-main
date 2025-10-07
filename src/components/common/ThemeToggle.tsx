import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    // Apply theme to document
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <motion.button
      className="relative w-12 h-6 rounded-full glass-morphism border border-white/20 flex items-center justify-between px-1"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        backgroundColor: isDark ? 'rgba(0, 212, 255, 0.2)' : 'rgba(255, 193, 7, 0.2)'
      }}
    >
      <Sun className="w-3 h-3 text-yellow-400" />
      <Moon className="w-3 h-3 text-blue-300" />
      
      <motion.div
        className="absolute w-4 h-4 rounded-full"
        style={{
          backgroundColor: isDark ? '#00D4FF' : '#FFC107'
        }}
        animate={{
          x: isDark ? 28 : 4
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
    </motion.button>
  )
}

export default ThemeToggle