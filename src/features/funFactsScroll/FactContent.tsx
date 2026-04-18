import type { JSX } from 'react'
import { InteractiveAnchor } from './InteractiveAnchor'
import {
  actionLinkInteractiveStyle,
  actionLinkStyle,
  categoryStyle,
  contentStyle,
  descriptionStyle,
  getPanelStyle,
  getPanelTextureStyle,
  getPanelUnderlayStyle,
  linksStyle,
  mobilePanelStyle,
  panelFooterStyle,
  panelHeaderStyle,
  titleStyle
} from './style'
import type { ContentProps } from './types'

export const FactContent = ({ content, isMobile }: ContentProps): JSX.Element => {
  return (
    <div style={contentStyle}>
      {content.map(({ id, category, title, description, links }, index) => {
        const isDark = index % 2 === 0
        const panelStyle = isMobile ? { ...getPanelStyle(isDark), ...mobilePanelStyle } : getPanelStyle(isDark)

        return (
          <article key={id} style={panelStyle}>
            <div style={getPanelUnderlayStyle(isDark)} aria-hidden="true" />
            <div style={getPanelTextureStyle(isDark)} aria-hidden="true" />

            <div style={panelHeaderStyle}>
              <p style={categoryStyle}>{category}</p>
              <h3 style={titleStyle}>{title}</h3>
            </div>

            <div style={panelFooterStyle}>
              <p style={descriptionStyle}>{description}</p>

              <div style={linksStyle}>
                {links.map((link) => (
                  <InteractiveAnchor
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    baseStyle={actionLinkStyle}
                    interactiveStyle={actionLinkInteractiveStyle}
                  />
                ))}
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
