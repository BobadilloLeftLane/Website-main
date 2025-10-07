import type { Service } from '@/types'

// Service IDs that map to translation keys
export const serviceIds = ['saas', 'web', 'transformation', 'api', 'mobile', 'cloud'] as const

// Technologies remain the same across languages
export const serviceTechnologies = {
  saas: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
  web: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'GraphQL', 'Tailwind'],
  transformation: ['Microservices', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'AWS'],
  api: ['Node.js', 'Express', 'GraphQL', 'Socket.io', 'OpenAPI', 'Redis'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 'Firebase'],
  cloud: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Prometheus']
}

export const serviceIcons = {
  saas: 'saas',
  web: 'web',
  transformation: 'transformation',
  api: 'api',
  mobile: 'mobile',
  cloud: 'cloud'
}

export const serviceColors = {
  saas: '#00D4FF',
  web: '#8B5CF6',
  transformation: '#00FF88',
  api: '#F59E0B',
  mobile: '#EC4899',
  cloud: '#06B6D4'
}

// Helper function to get services with translations
export const getServicesWithTranslations = (translations: any): Service[] => {
  return serviceIds.map((id) => ({
    id: id === 'saas' ? 'saas-development' :
        id === 'web' ? 'web-applications' :
        id === 'transformation' ? 'digital-transformation' :
        id === 'api' ? 'api-integration' :
        id === 'mobile' ? 'mobile-development' : 'cloud-solutions',
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