import { motion } from 'framer-motion'
import { memo, useState } from 'react'
import {
  Cloud,
  Code,
  Smartphone,
  Monitor
} from 'lucide-react'
import type { Service } from '@/types'
import MobileAppIcon from '@/components/icons/MobileAppIcon'
import DigitalTransformIcon from '@/components/icons/DigitalTransformIcon'
import SaaSIcon from '@/components/icons/SaaSIcon'
import WebIcon from '@/components/icons/WebIcon'
import APIIcon from '@/components/icons/APIIcon'
import CloudIcon from '@/components/icons/CloudIcon'

interface ServiceCardProps {
  service: Service
  index: number
  onClick?: () => void
}

const ServiceCard = ({ service, index, onClick }: ServiceCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect if it's a touch device on mount
  useState(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  })

  // Handle card flip for both mouse and touch
  const handleFlip = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFlipped(prev => !prev)
  }

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
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      className="flip-card-container"
      variants={cardVariants}
      onHoverStart={() => !isTouchDevice && setIsFlipped(true)}
      onHoverEnd={() => !isTouchDevice && setIsFlipped(false)}
      onClick={(e) => {
        if (isTouchDevice) {
          handleFlip(e)
        }
        onClick?.()
      }}
      onTouchEnd={(e) => {
        if (isTouchDevice) {
          handleFlip(e)
        }
      }}
      style={{ perspective: '1000px', WebkitTapHighlightColor: 'transparent' }}
    >
      <motion.div
        className="flip-card-content"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '400px'
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="flip-card-front"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            boxShadow: '0 10px 40px rgba(226, 232, 240, 0.1)'
          }}
        >
          {/* Icon */}
          <div style={{ marginBottom: '30px' }}>
            {service.icon === 'saas' ? (
              <SaaSIcon
                size={100}
                color={service.color}
              />
            ) : service.icon === 'web' ? (
              <WebIcon
                size={100}
                color={service.color}
              />
            ) : service.icon === 'mobile' ? (
              <MobileAppIcon
                size={100}
                color={service.color}
              />
            ) : service.icon === 'transformation' ? (
              <DigitalTransformIcon
                size={100}
                color={service.color}
              />
            ) : service.icon === 'api' ? (
              <APIIcon
                size={100}
                color={service.color}
              />
            ) : service.icon === 'cloud' ? (
              <CloudIcon
                size={100}
                color={service.color}
              />
            ) : IconComponent ? (
              <IconComponent
                size={100}
                style={{ color: service.color }}
              />
            ) : null}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '1.3'
          }}>
            {service.title}
          </h3>
        </div>

        {/* BACK SIDE */}
        <div
          className="flip-card-back"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000000'
          }}
        >
          {/* Animated rotating gradient border */}
          <motion.div
            className="rotating-border"
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            style={{
              position: 'absolute',
              content: ' ',
              display: 'block',
              width: '160px',
              height: '160%',
              background: `linear-gradient(90deg, transparent, ${service.color}, ${service.color}, ${service.color}, ${service.color}, transparent)`
            }}
          />

          {/* Back content */}
          <div className="back-content" style={{
            position: 'absolute',
            width: '99%',
            height: '99%',
            backgroundColor: '#000000',
            borderRadius: '12px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '30px 25px',
            overflow: 'hidden'
          }}>
            {/* Tagline/Description */}
            <p style={{
              color: 'rgba(255, 255, 255, 0.85)',
              fontSize: '14px',
              lineHeight: '1.6',
              textAlign: 'center',
              marginBottom: '20px'
            }}>
              {service.tagline}
            </p>

            {/* Features list */}
            <ul style={{
              width: '100%',
              textAlign: 'left',
              fontSize: '13px',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '20px',
              paddingLeft: '5px'
            }}>
              {service.features.slice(0, 5).map((feature, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: '10px',
                    paddingLeft: '0px'
                  }}
                >
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Technologies */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              width: '100%'
            }}>
              {service.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '5px 12px',
                    fontSize: '11px',
                    borderRadius: '5px',
                    backgroundColor: `${service.color}20`,
                    border: `1px solid ${service.color}40`,
                    color: service.color,
                    fontWeight: '500'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .flip-card-container {
          width: 100%;
          height: 400px;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          touch-action: manipulation;
        }

        @media (hover: none) and (pointer: coarse) {
          /* Touch devices - card stays flipped on tap */
          .flip-card-container:active {
            transform: scale(0.98);
            transition: transform 0.1s ease;
          }
        }

        /* Ensure smooth transitions on all devices */
        .flip-card-content {
          transition: transform 0.6s ease-in-out;
        }
      `}</style>
    </motion.div>
  )
}

export default memo(ServiceCard)
