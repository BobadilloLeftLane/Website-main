import React from 'react'

interface CloudIconProps {
  size?: number
  color?: string
}

const CloudIcon: React.FC<CloudIconProps> = ({ size = 100, color = '#00FF88' }) => {
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

      {/* Large Cloud outline - top */}
      <path
        d="M 15 28 Q 12 12, 28 9 Q 38 2, 50 2 Q 62 2, 72 9 Q 88 12, 85 28 Q 88 35, 75 40 L 25 40 Q 12 35, 15 28 Z"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
      />

      {/* Cloud text */}
      <text
        x="50"
        y="28"
        fontSize="20"
        fontWeight="bold"
        fontFamily="monospace"
        fill={color}
        textAnchor="middle"
      >
        Cloud
      </text>

      {/* Server racks below - 3 stacked servers */}

      {/* Server 1 - Top */}
      <rect
        x="20"
        y="52"
        width="60"
        height="10"
        rx="2"
        fill={color}
        opacity="0.8"
        filter={`url(#glow-${id})`}
      />
      <circle cx="25" cy="57" r="1.5" fill="#27C93F" />
      <circle cx="29" cy="57" r="1.5" fill="#27C93F" />
      <circle cx="33" cy="57" r="1.5" fill="#F59E0B" />
      <rect x="40" y="55" width="35" height="4" rx="1" fill="#fff" opacity="0.3" />

      {/* Server 2 - Middle */}
      <rect
        x="20"
        y="65"
        width="60"
        height="10"
        rx="2"
        fill={color}
        opacity="0.7"
        filter={`url(#glow-${id})`}
      />
      <circle cx="25" cy="70" r="1.5" fill="#27C93F" />
      <circle cx="29" cy="70" r="1.5" fill="#27C93F" />
      <circle cx="33" cy="70" r="1.5" fill="#27C93F" />
      <rect x="40" y="68" width="35" height="4" rx="1" fill="#fff" opacity="0.3" />

      {/* Server 3 - Bottom */}
      <rect
        x="20"
        y="78"
        width="60"
        height="10"
        rx="2"
        fill={color}
        opacity="0.6"
        filter={`url(#glow-${id})`}
      />
      <circle cx="25" cy="83" r="1.5" fill="#27C93F" />
      <circle cx="29" cy="83" r="1.5" fill="#F59E0B" />
      <circle cx="33" cy="83" r="1.5" fill="#27C93F" />
      <rect x="40" y="81" width="35" height="4" rx="1" fill="#fff" opacity="0.3" />

      {/* Connection lines from cloud to servers */}
      <line x1="35" y1="40" x2="35" y2="52" stroke={color} strokeWidth="2" opacity="0.6" />
      <line x1="50" y1="40" x2="50" y2="52" stroke={color} strokeWidth="2" opacity="0.6" />
      <line x1="65" y1="40" x2="65" y2="52" stroke={color} strokeWidth="2" opacity="0.6" />

    </svg>
  )
}

export default CloudIcon
