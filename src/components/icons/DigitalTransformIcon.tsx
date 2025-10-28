import React from 'react'

interface DigitalTransformIconProps {
  size?: number
  color?: string
}

const DigitalTransformIcon: React.FC<DigitalTransformIconProps> = ({ size = 100, color = '#00FF88' }) => {
  const id = React.useId()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`screenGlow-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1e" />
        </linearGradient>

        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Monitor outer glow */}
      <rect
        x="15"
        y="10"
        width="70"
        height="60"
        rx="4"
        fill={color}
        opacity="0.2"
      />

      {/* Monitor frame */}
      <rect
        x="17"
        y="12"
        width="66"
        height="56"
        rx="3"
        fill="#000"
        stroke={color}
        strokeWidth="2"
      />

      {/* Screen */}
      <rect
        x="20"
        y="15"
        width="60"
        height="50"
        rx="2"
        fill={`url(#screenGlow-${id})`}
      />

      {/* Dashboard header bar */}
      <rect
        x="23"
        y="18"
        width="54"
        height="8"
        rx="1"
        fill={color}
        opacity="0.9"
        filter={`url(#glow-${id})`}
      />

      {/* Header icons/dots */}
      <circle cx="27" cy="22" r="1.5" fill="#fff" opacity="0.9" />
      <circle cx="31" cy="22" r="1.5" fill="#fff" opacity="0.9" />
      <circle cx="35" cy="22" r="1.5" fill="#fff" opacity="0.9" />

      {/* Dashboard cards/widgets */}

      {/* Large chart card - top */}
      <rect
        x="23"
        y="29"
        width="54"
        height="15"
        rx="2"
        fill={color}
        opacity="0.7"
      />
      {/* Chart bars inside */}
      <rect x="26" y="38" width="3" height="8" rx="1" fill="#fff" opacity="0.8" />
      <rect x="31" y="35" width="3" height="11" rx="1" fill="#fff" opacity="0.8" />
      <rect x="36" y="33" width="3" height="13" rx="1" fill="#fff" opacity="0.8" />
      <rect x="41" y="36" width="3" height="10" rx="1" fill="#fff" opacity="0.8" />
      <rect x="46" y="34" width="3" height="12" rx="1" fill="#fff" opacity="0.8" />

      {/* Trend line */}
      <path
        d="M 53 40 L 58 37 L 63 38 L 68 35 L 73 36"
        stroke="#fff"
        strokeWidth="1.5"
        fill="none"
        opacity="0.7"
      />

      {/* Small cards grid - bottom */}

      {/* Card 1 */}
      <rect
        x="23"
        y="47"
        width="16"
        height="15"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <circle cx="31" cy="52" r="2.5" fill="#fff" opacity="0.9" />
      <rect x="27" y="56" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="28" y="58.5" width="6" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 2 */}
      <rect
        x="42"
        y="47"
        width="16"
        height="15"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <circle cx="50" cy="52" r="2.5" fill="#fff" opacity="0.9" />
      <rect x="46" y="56" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="47" y="58.5" width="6" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 3 */}
      <rect
        x="61"
        y="47"
        width="16"
        height="15"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <circle cx="69" cy="52" r="2.5" fill="#fff" opacity="0.9" />
      <rect x="65" y="56" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="66" y="58.5" width="6" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Monitor neck/stand */}
      <rect
        x="47"
        y="68"
        width="6"
        height="8"
        fill={color}
        opacity="0.6"
        rx="1"
      />

      {/* Stand base - wider part */}
      <rect
        x="44"
        y="76"
        width="12"
        height="3"
        fill={color}
        opacity="0.7"
        rx="1"
      />

      {/* Base platform */}
      <ellipse
        cx="50"
        cy="82"
        rx="15"
        ry="3"
        fill={color}
        opacity="0.4"
      />
      <ellipse
        cx="50"
        cy="81"
        rx="15"
        ry="2"
        fill={color}
        opacity="0.6"
      />

    </svg>
  )
}

export default DigitalTransformIcon
