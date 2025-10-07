export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80 // Height of fixed header
    const elementPosition = element.offsetTop - headerHeight
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}

export const initSmoothScroll = () => {
  // Add smooth scrolling to anchor links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const link = target.closest('a[href^="#"]')
    
    if (link) {
      e.preventDefault()
      const href = link.getAttribute('href')
      if (href && href.startsWith('#')) {
        const sectionId = href.substring(1)
        scrollToSection(sectionId)
      }
    }
  })
}

// Navigation sections (will get labels from translations)
export const navigationSections = [
  { id: 'home', key: 'nav.home' },
  { id: 'services', key: 'nav.services' },
  { id: 'process', key: 'nav.process' },
  { id: 'about', key: 'nav.about' },
  { id: 'contact', key: 'nav.contact' }
]