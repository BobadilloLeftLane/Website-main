export interface Service {
  id: string
  title: string
  tagline: string
  description: string
  features: string[]
  technologies: string[]
  caseStudy: string
  icon: string
  color: string
}

export interface Project {
  id: string
  title: string
  client: string
  description: string
  challenge: string
  solution: string[]
  results: string[]
  technologies: string[]
  category: 'saas' | 'web-app' | 'mobile' | 'iot' | 'e-commerce'
  image: string
  liveUrl?: string
  caseStudyUrl?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  experience: string
  specialties: string[]
  achievement: string
  image: string
  linkedin?: string
  github?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  readTime: string
  publishedAt: string
  author: string
  tags: string[]
  image: string
  slug: string
}

export interface ContactForm {
  projectType: 'SaaS Development' | 'Web Application' | 'Digital Transformation' | 'API Integration' | 'Mobile App' | 'Cloud Migration' | 'Other'
  budget: '<$50k' | '$50k-$100k' | '$100k-$250k' | '$250k-$500k' | '$500k+'
  timeline: '<3 months' | '3-6 months' | '6-12 months' | '12+ months'
  company: string
  name: string
  email: string
  phone?: string
  message: string
}

export interface AnimationVariants {
  hidden: any
  visible: any
  hover?: any
  tap?: any
}

export interface ThreeJSProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  color?: string
  animation?: 'float' | 'rotate' | 'pulse' | 'none'
}

export interface ParticleSystemProps {
  count: number
  color: string
  speed: number
  size: number
  interactive: boolean
}