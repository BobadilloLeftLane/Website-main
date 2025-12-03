import type { Service } from '@/types'

// Service IDs that map to translation keys
export const serviceIds = ['saas', 'web', 'transformation', 'mobile'] as const

// Technologies remain the same across languages
export const serviceTechnologies = {
  saas: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
  web: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind'],
  transformation: ['Microservices', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Firebase']
}

export const serviceIcons = {
  saas: 'saas',
  web: 'web',
  transformation: 'transformation',
  mobile: 'mobile'
}

export const serviceColors = {
  saas: '#00D4FF',
  web: '#8B5CF6',
  transformation: '#00FF88',
  mobile: '#EC4899'
}

// Helper function to get services with translations
export const getServicesWithTranslations = (translations: any): Service[] => {
  return serviceIds.map((id) => ({
    id: id === 'saas' ? 'saas-development' :
        id === 'web' ? 'web-applications' :
        id === 'transformation' ? 'digital-transformation' :
        'mobile-development',
    title: translations?.services?.cards?.[id]?.title || '',
    tagline: translations?.services?.cards?.[id]?.tagline || '',
    description: translations?.services?.cards?.[id]?.description || '',
    features: translations?.services?.cards?.[id]?.features || [],
    technologies: serviceTechnologies[id],
    caseStudy: translations?.services?.cards?.[id]?.caseStudy || '',
    icon: serviceIcons[id],
    color: serviceColors[id]
  }))
}