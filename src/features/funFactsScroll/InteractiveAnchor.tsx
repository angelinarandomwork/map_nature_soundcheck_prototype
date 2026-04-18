import { useState, type JSX } from 'react'
import type { InteractiveAnchorProps } from './types'


export const InteractiveAnchor = ({ href, label, baseStyle, interactiveStyle }: InteractiveAnchorProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false)

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={isActive ? { ...baseStyle, ...interactiveStyle } : baseStyle}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {label}
    </a>
  )
}
