interface LogoIconProps {
  size?: number
  className?: string
  animated?: boolean
}

const LogoIcon = ({ size = 80, className = "", animated = false }: LogoIconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back parts of orbits (behind planet) */}
      <path 
        d="M 55 88 A 55 12 0 0 1 145 112" 
        fill="none" 
        stroke="#00FF88" 
        strokeWidth="4" 
        opacity="0.4"
        transform="rotate(-25 100 100)"
      />
      
      <path 
        d="M 50 85 A 65 15 0 0 1 150 115" 
        fill="none" 
        stroke="#FFD700" 
        strokeWidth="4" 
        opacity="0.4"
        transform="rotate(25 100 100)"
      />
      
      {/* Blue Planet */}
      <circle cx="100" cy="100" r="40" fill="#00D4FF" />
      
      {/* Front parts of orbits (in front of planet) */}
      <path 
        d="M 145 112 A 55 12 0 0 1 55 88" 
        fill="none" 
        stroke="#00FF88" 
        strokeWidth="4" 
        opacity="0.8"
        transform="rotate(-25 100 100)"
      />
      
      <path 
        d="M 150 115 A 65 15 0 0 1 50 85" 
        fill="none" 
        stroke="#FFD700" 
        strokeWidth="4" 
        opacity="0.8"
        transform="rotate(25 100 100)"
      />
      
      {/* Animation paths for exact orbit tracking */}
      <defs>
        {/* Orbit 1 path - exactly matching the visible green orbit */}
        <path 
          id="orbit1-full"
          d="M 55 88 A 55 12 0 0 1 145 112 A 55 12 0 0 1 55 88"
          transform="rotate(-25 100 100)"
        />
        
        {/* Orbit 2 path - exactly matching the visible yellow orbit */}
        <path 
          id="orbit2-full"
          d="M 50 85 A 65 15 0 0 1 150 115 A 65 15 0 0 1 50 85"
          transform="rotate(25 100 100)"
        />
      </defs>

      {/* Animated white dots on orbits */}
      {animated ? (
        <>
          {/* Dot on green orbit - precise tracking */}
          <circle r="6" fill="#ffffff" opacity="1">
            <animateMotion dur="4s" repeatCount="indefinite">
              <mpath href="#orbit1-full" />
            </animateMotion>
          </circle>
          
          {/* Dot on yellow orbit - precise tracking */}
          <circle r="6" fill="#ffffff" opacity="1">
            <animateMotion dur="3s" repeatCount="indefinite">
              <mpath href="#orbit2-full" />
            </animateMotion>
          </circle>
        </>
      ) : (
        <>
          {/* Static white dots */}
          <circle cx="145" cy="100" r="6" fill="#ffffff" transform="rotate(-25 100 100)" />
          <circle cx="150" cy="100" r="6" fill="#ffffff" transform="rotate(25 100 100)" />
        </>
      )}
    </svg>
  )
}

export default LogoIcon