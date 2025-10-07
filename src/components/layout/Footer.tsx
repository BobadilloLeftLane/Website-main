import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'

const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 1.2,
        ease: [0.215, 0.61, 0.355, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1]
      }
    }
  }

  return (
    <footer className="bg-transparent border-t-0 relative">
      <motion.div 
        className="container-wide section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "0px 0px -100px 0px" }}
      >
        {/* Bottom Bar */}
        <motion.div
          className="py-16 text-center"
          variants={itemVariants}
        >
          <div className="text-sm text-white/70">
            {(t?.footer?.copyright || "© {year} Nova Studio. All rights reserved.").replace('{year}', currentYear.toString())}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer