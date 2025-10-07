import { motion } from 'framer-motion'
import { memo } from 'react'
import {
  Cloud,
  Code,
  Smartphone,
  Monitor
} from 'lucide-react'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  index: number
  onClick?: () => void
}

const ServiceCard = ({ service, index, onClick }: ServiceCardProps) => {
  // Get appropriate icon based on service type
  const getServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'saas':
        return null // Special case - will render text instead
      case 'web':
        return null // Special case - will render WWW text instead
      case 'transformation':
        return Monitor
      case 'api':
        return Code
      case 'mobile':
        return Smartphone
      case 'cloud':
        return Cloud
      default:
        return Code
    }
  }

  const IconComponent = getServiceIcon(service.icon)
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -15 
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: { 
      scale: 1.03, 
      rotateY: 2,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hover: {
      rotateY: 10,
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.div
      className="relative p-6 rounded-xl glass-morphism group cursor-pointer overflow-hidden"
      variants={cardVariants}
      whileHover="hover"
      onClick={onClick}
    >
      {/* Background gradient effect */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${service.color}20, transparent)`
        }}
      />

      {/* Static Icon */}
      <motion.div 
        className="h-32 mb-6 relative flex items-center justify-center"
        variants={iconVariants}
      >
        <div className="relative">
          {service.icon === 'saas' ? (
            // SaaS text instead of icon
            <div 
              className="text-4xl font-bold font-space relative z-10"
              style={{ color: service.color }}
            >
              SaaS
            </div>
          ) : service.icon === 'web' ? (
            // WWW text instead of icon
            <div 
              className="text-4xl font-bold font-space relative z-10"
              style={{ color: service.color }}
            >
              WWW
            </div>
          ) : IconComponent ? (
            // Regular icon
            <IconComponent 
              size={64}
              style={{ color: service.color }}
              className="relative z-10"
            />
          ) : null}
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle, ${service.color}40, transparent 70%)`,
              filter: 'blur(20px)',
              transform: 'scale(2)'
            }}
          />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-electric-blue group-hover:to-cyber-purple group-hover:bg-clip-text transition-all duration-300">
          {service.title}
        </h3>
        
        <p className="text-silver/70 mb-4 text-sm leading-relaxed">
          {service.tagline}
        </p>

        {/* Features list */}
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 4).map((feature, i) => (
            <motion.li 
              key={i} 
              className="flex items-center text-sm text-silver/60"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + i * 0.05 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 rounded-full mr-3"
                style={{ backgroundColor: service.color }}
                whileHover={{ scale: 1.5 }}
              />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {service.technologies.slice(0, 3).map((tech, i) => (
            <motion.span 
              key={i}
              className="px-2 py-1 text-xs rounded border transition-colors duration-200"
              style={{ 
                backgroundColor: `${service.color}10`,
                borderColor: `${service.color}30`,
                color: service.color
              }}
              whileHover={{ 
                backgroundColor: `${service.color}20`,
                scale: 1.05 
              }}
            >
              {tech}
            </motion.span>
          ))}
          {service.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs text-silver/40">
              +{service.technologies.length - 3} more
            </span>
          )}
        </div>

      </div>

      {/* Hover border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
        whileHover={{
          borderColor: service.color,
          boxShadow: `0 0 20px ${service.color}40`
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default memo(ServiceCard)