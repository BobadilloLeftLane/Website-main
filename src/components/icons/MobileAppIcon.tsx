import React from 'react'

interface MobileAppIconProps {
  size?: number
  color?: string
}

const MobileAppIcon: React.FC<MobileAppIconProps> = ({ size = 100, color = '#00FF88' }) => {
  // Generate unique IDs for this instance
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
        <linearGradient id={`screenGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1a2e" />
          <stop offset="100%" stopColor="#0f0f1e" />
        </linearGradient>

        {/* Glow effect */}
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Phone body */}
      <rect
        x="25"
        y="5"
        width="50"
        height="90"
        rx="8"
        fill={color}
        opacity="0.2"
      />

      <rect
        x="27"
        y="7"
        width="46"
        height="86"
        rx="7"
        fill="#000"
        stroke={color}
        strokeWidth="2"
      />

      {/* Notch */}
      <rect
        x="42"
        y="7"
        width="16"
        height="4"
        rx="2"
        fill={color}
      />

      {/* Screen */}
      <rect
        x="30"
        y="13"
        width="40"
        height="72"
        rx="4"
        fill={`url(#screenGradient-${id})`}
      />

      {/* Status bar icons - small dots */}
      <circle cx="35" cy="17" r="1" fill={color} opacity="0.8" />
      <circle cx="39" cy="17" r="1" fill={color} opacity="0.8" />
      <circle cx="43" cy="17" r="1" fill={color} opacity="0.8" />

      {/* App Interface Elements */}

      {/* Header Card */}
      <rect
        x="33"
        y="22"
        width="34"
        height="12"
        rx="2"
        fill={color}
        opacity="0.9"
        filter={`url(#glow-${id})`}
      />

      {/* Small icon on header card */}
      <circle cx="37" cy="28" r="2.5" fill="#fff" opacity="0.9" />
      <rect x="41" y="26" width="12" height="2" rx="1" fill="#fff" opacity="0.7" />
      <rect x="41" y="29" width="8" height="1.5" rx="0.75" fill="#fff" opacity="0.5" />

      {/* Grid of app cards */}

      {/* Card 1 */}
      <rect
        x="33"
        y="37"
        width="15"
        height="15"
        rx="2"
        fill={color}
        opacity="0.8"
      />
      <circle cx="40.5" cy="42" r="2" fill="#fff" opacity="0.9" />
      <rect x="36" y="46" width="9" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="37" y="48.5" width="7" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 2 */}
      <rect
        x="52"
        y="37"
        width="15"
        height="15"
        rx="2"
        fill={color}
        opacity="0.7"
      />
      <circle cx="59.5" cy="42" r="2" fill="#fff" opacity="0.9" />
      <rect x="55" y="46" width="9" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="56" y="48.5" width="7" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 3 */}
      <rect
        x="33"
        y="55"
        width="15"
        height="15"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <circle cx="40.5" cy="60" r="2" fill="#fff" opacity="0.9" />
      <rect x="36" y="64" width="9" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="37" y="66.5" width="7" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 4 */}
      <rect
        x="52"
        y="55"
        width="15"
        height="15"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <circle cx="59.5" cy="60" r="2" fill="#fff" opacity="0.9" />
      <rect x="55" y="64" width="9" height="1.5" rx="0.75" fill="#fff" opacity="0.7" />
      <rect x="56" y="66.5" width="7" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Bottom navigation bar */}
      <rect
        x="33"
        y="74"
        width="34"
        height="8"
        rx="2"
        fill={color}
        opacity="0.3"
      />

      {/* Nav icons */}
      <circle cx="40" cy="78" r="2" fill={color} opacity="0.9" />
      <circle cx="50" cy="78" r="2" fill={color} opacity="0.7" />
      <circle cx="60" cy="78" r="2" fill={color} opacity="0.7" />

      {/* Home button indicator */}
      <rect
        x="46"
        y="87"
        width="8"
        height="3"
        rx="1.5"
        fill={color}
        opacity="0.6"
      />
    </svg>
  )
}

export default MobileAppIcon
