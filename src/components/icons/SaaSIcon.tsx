import React from 'react'

interface SaaSIconProps {
  size?: number
  color?: string
}

const SaaSIcon: React.FC<SaaSIconProps> = ({ size = 100, color = '#00FF88' }) => {
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
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Cloud outline */}
      <path
        d="M 15 28 Q 12 12, 28 9 Q 38 2, 50 2 Q 62 2, 72 9 Q 88 12, 85 28 Q 88 35, 75 40 L 25 40 Q 12 35, 15 28 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
      />

      {/* SaaS text */}
      <text
        x="50"
        y="28"
        fontSize="20"
        fontWeight="bold"
        fontFamily="monospace"
        fill={color}
        textAnchor="middle"
      >
        SaaS
      </text>

      {/* Server/Module cards - 3 modules */}

      {/* Module 1 */}
      <rect
        x="15"
        y="58"
        width="20"
        height="28"
        rx="2"
        fill={color}
        opacity="0.7"
        filter={`url(#glow-${id})`}
      />
      <rect x="18" y="62" width="14" height="3" rx="1" fill="#fff" opacity="0.9" />
      <rect x="18" y="67" width="14" height="2" rx="1" fill="#fff" opacity="0.7" />
      <rect x="18" y="71" width="14" height="2" rx="1" fill="#fff" opacity="0.6" />
      <rect x="18" y="75" width="14" height="2" rx="1" fill="#fff" opacity="0.5" />
      <rect x="18" y="79" width="14" height="2" rx="1" fill="#fff" opacity="0.4" />

      {/* Module 2 */}
      <rect
        x="40"
        y="58"
        width="20"
        height="28"
        rx="2"
        fill={color}
        opacity="0.8"
        filter={`url(#glow-${id})`}
      />
      <rect x="43" y="62" width="14" height="3" rx="1" fill="#fff" opacity="0.9" />
      <rect x="43" y="67" width="14" height="2" rx="1" fill="#fff" opacity="0.7" />
      <rect x="43" y="71" width="14" height="2" rx="1" fill="#fff" opacity="0.6" />
      <rect x="43" y="75" width="14" height="2" rx="1" fill="#fff" opacity="0.5" />
      <rect x="43" y="79" width="14" height="2" rx="1" fill="#fff" opacity="0.4" />

      {/* Module 3 */}
      <rect
        x="65"
        y="58"
        width="20"
        height="28"
        rx="2"
        fill={color}
        opacity="0.7"
        filter={`url(#glow-${id})`}
      />
      <rect x="68" y="62" width="14" height="3" rx="1" fill="#fff" opacity="0.9" />
      <rect x="68" y="67" width="14" height="2" rx="1" fill="#fff" opacity="0.7" />
      <rect x="68" y="71" width="14" height="2" rx="1" fill="#fff" opacity="0.6" />
      <rect x="68" y="75" width="14" height="2" rx="1" fill="#fff" opacity="0.5" />
      <rect x="68" y="79" width="14" height="2" rx="1" fill="#fff" opacity="0.4" />

      {/* Connection lines - S-curves for left and right, straight for middle */}
      {/* Left line - S curve */}
      <path
        d="M 50 40 Q 45 48, 30 52 Q 25 56, 25 58"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Middle line - straight */}
      <line x1="50" y1="40" x2="50" y2="58" stroke={color} strokeWidth="2" opacity="0.6" />

      {/* Right line - S curve */}
      <path
        d="M 50 40 Q 55 48, 70 52 Q 75 56, 75 58"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

export default SaaSIcon
