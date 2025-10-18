import { motion, AnimatePresence } from 'framer-motion'
import { Construction, X } from 'lucide-react'

interface UnderConstructionModalProps {
  isOpen: boolean
  onClose: () => void
}

const UnderConstructionModal = ({ isOpen, onClose }: UnderConstructionModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[10000] p-4"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="relative max-w-2xl w-full glass-morphism rounded-3xl border border-electric-blue/50 shadow-2xl overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/20 via-cyber-purple/20 to-electric-blue/20 animate-pulse" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Content */}
              <div className="relative p-12 text-center">
                {/* Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-electric-blue to-cyber-purple mb-6"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Construction className="w-12 h-12 text-white" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Site Under Construction
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  className="text-xl text-silver/90 mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  We're working hard to bring you an amazing experience.
                  <br />
                  Our website will be launching soon!
                </motion.p>

                {/* Progress Bar */}
                <motion.div
                  className="w-full h-2 bg-dark-charcoal/50 rounded-full mb-8 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-electric-blue via-cyber-purple to-electric-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </motion.div>

                {/* Button */}
                <motion.button
                  onClick={onClose}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-electric-blue to-cyber-purple text-white font-semibold text-lg hover:shadow-lg hover:shadow-electric-blue/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter Site Preview
                </motion.button>

                {/* Additional Info */}
                <motion.p
                  className="text-sm text-silver/60 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Thank you for your patience
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default UnderConstructionModal
