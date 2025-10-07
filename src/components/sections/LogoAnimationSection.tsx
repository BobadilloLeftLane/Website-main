import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import LogoIcon from '@/components/common/LogoIcon'

const LogoAnimationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2,
        staggerChildren: 0.3
      }
    }
  }

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotateY: -180
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        rotateY: {
          duration: 2,
          ease: "easeInOut"
        }
      }
    }
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 1, 0.7, 1, 0.8],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    }
  }

  return (
    <section className="py-32 lg:py-40 section-padding relative overflow-hidden">
      <div className="container-wide relative z-10">
        <motion.div
          ref={ref}
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Animated Logo */}
          <motion.div 
            className="relative inline-block mb-12"
            variants={logoVariants}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%)',
                filter: 'blur(30px)',
                transform: 'scale(1.5)'
              }}
              variants={glowVariants}
            />
            
            {/* Main Logo */}
            <motion.div
              whileHover={{ 
                scale: 1.1,
                rotateY: 360,
                transition: { duration: 0.8 }
              }}
              className="relative z-10"
            >
              <LogoIcon size={200} className="text-electric-blue drop-shadow-2xl" animated={true} />
            </motion.div>
          </motion.div>

          {/* Animated Text */}
          <motion.div variants={textVariants}>
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-space mb-6"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #8B5CF6, #00FF88)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              NOVA STUDIO
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl text-theme-secondary max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            >
              Kreiramo digitalnu budućnost kroz inovativna rešenja i avant-garde pristup razvoju softvera
            </motion.p>
          </motion.div>

          {/* Floating particles around logo */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-electric-blue"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: [0, Math.cos(i * Math.PI / 4) * 150],
                y: [0, Math.sin(i * Math.PI / 4) * 150],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeOut"
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LogoAnimationSection