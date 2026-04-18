import type { JSX } from 'react'
import { InteractiveAnchor } from './InteractiveAnchor'
import {
  mediaCardHeaderStyle,
  mediaCardStyle,
  mediaCategoryStyle,
  mediaTitleStyle,
  sourceCardStyle,
  sourceHeadingStyle,
  sourceLinkInteractiveStyle,
  sourceLinksStyle,
  sourceLinkStyle,
  videoFrameStyle,
  videoShellStyle
} from './style'
import type { MediaCardProps } from './types'

export const MediaCard = ({ item }: MediaCardProps): JSX.Element => {
  if (item.media.type === 'youtube') {
    return (
      <div style={mediaCardStyle}>
        <div style={mediaCardHeaderStyle}>
          <p style={mediaCategoryStyle}>{item.category}</p>
          <h4 style={mediaTitleStyle}>{item.title}</h4>
        </div>

        <div style={videoShellStyle}>
          <iframe
            src={item.media.embedUrl}
            title={item.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={videoFrameStyle}
          />
        </div>
      </div>
    )
  }

  return (
    <div style={mediaCardStyle}>
      <div style={mediaCardHeaderStyle}>
        <p style={mediaCategoryStyle}>{item.category}</p>
        <h4 style={mediaTitleStyle}>{item.title}</h4>
      </div>

      <div style={sourceCardStyle}>
        <p style={sourceHeadingStyle}>{item.media.heading}</p>

        <div style={sourceLinksStyle}>
          {item.media.links.map((link) => (
            <InteractiveAnchor
              key={link.href}
              href={link.href}
              label={link.label}
              baseStyle={sourceLinkStyle}
              interactiveStyle={sourceLinkInteractiveStyle}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
