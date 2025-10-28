import React from 'react'

interface APIIconProps {
  size?: number
  color?: string
}

const APIIcon: React.FC<APIIconProps> = ({ size = 100, color = '#00FF88' }) => {
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

      {/* Terminal/Code window */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="4"
        fill="#000"
        stroke={color}
        strokeWidth="2.5"
      />

      {/* Terminal header */}
      <rect
        x="10"
        y="10"
        width="80"
        height="10"
        rx="4"
        fill={color}
        opacity="0.8"
      />

      {/* Terminal buttons */}
      <circle cx="17" cy="15" r="1.5" fill="#FF5F56" />
      <circle cx="22" cy="15" r="1.5" fill="#FFBD2E" />
      <circle cx="27" cy="15" r="1.5" fill="#27C93F" />

      {/* Screen area */}
      <rect
        x="13"
        y="23"
        width="74"
        height="64"
        rx="2"
        fill={`url(#screenGlow-${id})`}
      />

      {/* API Text - large */}
      <text
        x="50"
        y="48"
        fontSize="24"
        fontWeight="bold"
        fontFamily="monospace"
        fill={color}
        textAnchor="middle"
      >
        API
      </text>

      {/* API Endpoints - code lines */}
      <g opacity="0.8">
        {/* GET endpoint */}
        <rect x="18" y="56" width="8" height="3" rx="1" fill="#27C93F" opacity="0.9" />
        <rect x="28" y="56" width="50" height="3" rx="1" fill={color} opacity="0.7" />

        {/* POST endpoint */}
        <rect x="18" y="62" width="8" height="3" rx="1" fill="#00D4FF" opacity="0.9" />
        <rect x="28" y="62" width="45" height="3" rx="1" fill={color} opacity="0.7" />

        {/* PUT endpoint */}
        <rect x="18" y="68" width="8" height="3" rx="1" fill="#F59E0B" opacity="0.9" />
        <rect x="28" y="68" width="40" height="3" rx="1" fill={color} opacity="0.7" />

        {/* DELETE endpoint */}
        <rect x="18" y="74" width="8" height="3" rx="1" fill="#FF5F56" opacity="0.9" />
        <rect x="28" y="74" width="35" height="3" rx="1" fill={color} opacity="0.7" />
      </g>

      {/* Code brackets decoration */}
      <text
        x="8"
        y="58"
        fontSize="10"
        fontFamily="monospace"
        fill={color}
        opacity="0.4"
      >
        {'{'}
      </text>

      <text
        x="88"
        y="58"
        fontSize="10"
        fontFamily="monospace"
        fill={color}
        opacity="0.4"
      >
        {'}'}
      </text>

    </svg>
  )
}

export default APIIcon
