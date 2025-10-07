import { useEffect, useRef } from 'react'

export const useThrottledScroll = (callback: () => void, delay = 100) => {
  const timeoutRef = useRef<number>()

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) return

      timeoutRef.current = window.setTimeout(() => {
        callback()
        timeoutRef.current = undefined
      }, delay)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [callback, delay])
}
