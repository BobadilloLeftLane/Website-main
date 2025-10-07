import { motion } from 'framer-motion'
import { ReactNode, memo } from 'react'
import { LucideIcon } from 'lucide-react'

interface AnimatedButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  icon?: LucideIcon
  loading?: boolean
  disabled?: boolean
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

const AnimatedButton = ({ 
  variant, 
  size, 
  icon: Icon, 
  loading, 
  disabled,
  children, 
  onClick,
  type = 'button',
  className = ''
}: AnimatedButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out transform focus-visible:focus disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-electric-blue to-cyber-purple text-white shadow-lg hover:shadow-xl hover:shadow-electric-blue/25',
    secondary: 'bg-transparent border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-midnight',
    ghost: 'text-silver hover:text-electric-blue bg-transparent'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  const hoverVariants = {
    hover: {
      scale: disabled ? 1 : 1.05,
      boxShadow: variant === 'primary' ? '0 0 30px rgba(0, 212, 255, 0.5)' : undefined,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: disabled ? 1 : 0.95,
      transition: { duration: 0.1 }
    }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      variants={hoverVariants}
      whileHover={!disabled ? 'hover' : undefined}
      whileTap={!disabled ? 'tap' : undefined}
    >
      {loading ? (
        <motion.div
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      
      <span>{children}</span>
      
      {variant === 'primary' && !loading && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-electric-blue to-cyber-purple opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}

export default memo(AnimatedButton)