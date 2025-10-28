interface LogoIconProps {
  size?: number
  className?: string
  animated?: boolean
}

const LogoIcon = ({ size = 80, className = "", animated = false }: LogoIconProps) => {
  return (
    <img
      src="/logos/blck.png"
      alt="Nova Studio Solutions Logo"
      width={size}
      height={size}
      className={className}
      style={{
        objectFit: 'contain',
        animation: animated ? 'pulse 3s ease-in-out infinite' : 'none'
      }}
    />
  )
}

export default LogoIcon
