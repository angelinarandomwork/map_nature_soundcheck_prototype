import { motion, useTransform } from 'framer-motion'
import type { JSX } from 'react'
import { MediaCard } from './MediaCard'
import { mediaPanelStyle, mediaPanelTextureStyle, mediaPanelUnderlayStyle, mediaRailStyle, mediaTrackStyle, PANEL_HEIGHT } from './style'
import type { MediaRailProps } from './types'

export const MediaRail = ({ content, scrollYProgress }: MediaRailProps): JSX.Element => {
  const y = useTransform(scrollYProgress, [0, 1], [-(content.length - 1) * PANEL_HEIGHT, 0])

  return (
    <aside style={mediaRailStyle}>
      <motion.div style={{ ...mediaTrackStyle, y }}>
        {[...content].reverse().map((item) => (
          <div key={item.id} style={mediaPanelStyle}>
            <div style={mediaPanelUnderlayStyle} aria-hidden="true" />
            <div style={mediaPanelTextureStyle} aria-hidden="true" />
            <MediaCard item={item} />
          </div>
        ))}
      </motion.div>
    </aside>
  )
}
