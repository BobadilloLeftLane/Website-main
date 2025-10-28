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
    primary: 'bg-gradient-to-r from-orange-500 via-orange-red to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25',
    secondary: 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
    ghost: 'text-silver hover:text-orange-500 bg-transparent'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  }

  const hoverVariants = {
    hover: {
      scale: disabled ? 1 : 1.05,
      boxShadow: variant === 'primary' ? '0 0 30px rgba(249, 115, 22, 0.5)' : undefined,
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
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 opacity-0"
          whileHover={{ opacity: 0.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}

export default memo(AnimatedButton)