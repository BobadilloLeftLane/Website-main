import React from 'react'

interface WebIconProps {
  size?: number
  color?: string
}

const WebIcon: React.FC<WebIconProps> = ({ size = 100, color = '#00FF88' }) => {
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

      {/* Browser window outer glow */}
      <rect
        x="8"
        y="13"
        width="84"
        height="74"
        rx="4"
        fill={color}
        opacity="0.2"
      />

      {/* Browser window frame */}
      <rect
        x="10"
        y="15"
        width="80"
        height="70"
        rx="3"
        fill="#000"
        stroke={color}
        strokeWidth="2"
      />

      {/* Browser header bar */}
      <rect
        x="10"
        y="15"
        width="80"
        height="10"
        rx="3"
        fill={color}
        opacity="0.8"
      />

      {/* Browser control buttons */}
      <circle cx="17" cy="20" r="1.5" fill="#FF5F56" opacity="0.9" />
      <circle cx="22" cy="20" r="1.5" fill="#FFBD2E" opacity="0.9" />
      <circle cx="27" cy="20" r="1.5" fill="#27C93F" opacity="0.9" />

      {/* URL bar */}
      <rect
        x="35"
        y="17.5"
        width="48"
        height="5"
        rx="2.5"
        fill="#000"
        opacity="0.6"
      />

      {/* WWW text in URL bar */}
      <text
        x="38"
        y="21.5"
        fontSize="3.5"
        fontFamily="monospace"
        fill={color}
        opacity="0.8"
      >
        www.
      </text>

      {/* Browser content area */}
      <rect
        x="13"
        y="28"
        width="74"
        height="54"
        rx="2"
        fill={`url(#screenGlow-${id})`}
      />

      {/* Web page content */}

      {/* Hero section */}
      <rect
        x="16"
        y="31"
        width="68"
        height="18"
        rx="2"
        fill={color}
        opacity="0.7"
        filter={`url(#glow-${id})`}
      />

      {/* Hero text lines */}
      <rect x="20" y="35" width="30" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="20" y="39" width="40" height="1.5" rx="0.75" fill="#fff" opacity="0.6" />
      <rect x="20" y="42.5" width="35" height="1.5" rx="0.75" fill="#fff" opacity="0.6" />

      {/* CTA Button */}
      <rect x="20" y="45" width="15" height="3" rx="1.5" fill="#fff" opacity="0.9" />

      {/* Feature cards grid */}

      {/* Card 1 */}
      <rect
        x="16"
        y="52"
        width="20"
        height="14"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <rect x="18" y="55" width="16" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="18" y="58" width="12" height="1" rx="0.5" fill="#fff" opacity="0.6" />
      <rect x="18" y="60" width="14" height="1" rx="0.5" fill="#fff" opacity="0.5" />
      <rect x="18" y="62" width="10" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 2 */}
      <rect
        x="39"
        y="52"
        width="20"
        height="14"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <rect x="41" y="55" width="16" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="41" y="58" width="12" height="1" rx="0.5" fill="#fff" opacity="0.6" />
      <rect x="41" y="60" width="14" height="1" rx="0.5" fill="#fff" opacity="0.5" />
      <rect x="41" y="62" width="10" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Card 3 */}
      <rect
        x="62"
        y="52"
        width="20"
        height="14"
        rx="2"
        fill={color}
        opacity="0.6"
      />
      <rect x="64" y="55" width="16" height="2" rx="1" fill="#fff" opacity="0.8" />
      <rect x="64" y="58" width="12" height="1" rx="0.5" fill="#fff" opacity="0.6" />
      <rect x="64" y="60" width="14" height="1" rx="0.5" fill="#fff" opacity="0.5" />
      <rect x="64" y="62" width="10" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Footer section */}
      <rect
        x="16"
        y="69"
        width="68"
        height="10"
        rx="2"
        fill={color}
        opacity="0.4"
      />
      <rect x="20" y="72" width="15" height="1" rx="0.5" fill="#fff" opacity="0.6" />
      <rect x="20" y="75" width="20" height="1" rx="0.5" fill="#fff" opacity="0.5" />

      {/* Code brackets decoration - representing web code */}
      <text
        x="8"
        y="50"
        fontSize="8"
        fontFamily="monospace"
        fill={color}
        opacity="0.4"
      >
        &lt;/&gt;
      </text>

      <text
        x="85"
        y="50"
        fontSize="8"
        fontFamily="monospace"
        fill={color}
        opacity="0.4"
      >
        { }
      </text>

    </svg>
  )
}

export default WebIcon
