import type { CSSProperties } from 'react'

export const PANEL_HEIGHT = 550

export const oppoScrollRootStyle: CSSProperties = {
  ['--oppo-panel-height' as string]: `${PANEL_HEIGHT}px`
}

export const shellStyle: CSSProperties = {
  display: 'grid',
  gap: 0
}

export const scrollStyle: CSSProperties = {
  position: 'relative',
  height: 'var(--oppo-panel-height)',
  overflowY: 'auto',
  overflowX: 'hidden',
  border: 'var(--border-default)',
  borderRadius: 'var(--radius-4)',
  background: 'var(--greenish-gradient)',
  boxShadow: 'var(--shadow-none)'
}

export const innerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start'
}

export const contentStyle: CSSProperties = {
  flex: '1 1 50%',
  minWidth: 0
}

const panelBaseStyle: CSSProperties = {
  position: 'relative',
  isolation: 'isolate',
  height: 'var(--oppo-panel-height)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 32,
  padding: '24px 32px 48px',
  overflow: 'hidden',
  borderRight: 'var(--border-subtle)',
  color: 'var(--color-text-primary)'
}

const panelUnderlayBaseStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  transition: 'background 160ms ease, opacity 160ms ease',
  pointerEvents: 'none'
}

const panelTextureBaseStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  opacity: 0.18,
  transition: 'opacity 160ms ease',
  pointerEvents: 'none'
}

export const getPanelStyle = (isDark: boolean): CSSProperties => ({
  ...panelBaseStyle,
  background: isDark ? 'var(--greenish-gradient)' : 'var(--blueish-gradient)'
})

export const getPanelUnderlayStyle = (isDark: boolean): CSSProperties => ({
  ...panelUnderlayBaseStyle,
  zIndex: -2,
  opacity: 0.95,
  background: isDark
    ? 'linear-gradient(to top, rgba(55, 160, 123, 0.22) 0%, rgba(55, 160, 123, 0.14) 50%, rgba(55, 160, 123, 0.08) 100%)'
    : 'linear-gradient(to top, rgba(244, 162, 97, 0.22) 0%, rgba(244, 162, 97, 0.14) 50%, rgba(244, 162, 97, 0.08) 100%)'
})

export const getPanelTextureStyle = (isDark: boolean): CSSProperties => ({
  ...panelTextureBaseStyle,
  zIndex: -3,
  background: isDark
    ? 'radial-gradient(circle at top right, var(--blue-dark-low), transparent 42%), radial-gradient(circle at bottom left, rgba(55, 160, 123, 0.12), transparent 38%)'
    : 'radial-gradient(circle at top left, rgba(244, 162, 97, 0.14), transparent 42%), radial-gradient(circle at bottom right, rgba(231, 111, 81, 0.08), transparent 36%)'
})

export const panelHeaderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}

export const panelFooterStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16
}

export const categoryStyle: CSSProperties = {
  margin: 0,
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--line-height-100)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
  opacity: 0.9
}

export const titleStyle: CSSProperties = {
  margin: 0,
  maxWidth: '32rem',
  fontSize: 'clamp(2rem, 2.8vw, 3.75rem)',
  lineHeight: 1.02,
  fontWeight: 600,
  color: 'var(--color-text-primary)'
}

export const descriptionStyle: CSSProperties = {
  margin: 0,
  maxWidth: '34rem',
  fontSize: 'var(--font-size-16)',
  lineHeight: 1.7,
  fontWeight: 'var(--font-weight-regular)',
  color: 'var(--color-text-secondary)'
}

export const linksStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12
}

const actionLinkBaseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'transform 160ms ease, border-color 160ms ease, background-color 160ms ease, color 160ms ease, opacity 160ms ease'
}

export const actionLinkStyle: CSSProperties = {
  ...actionLinkBaseStyle,
  padding: '12px 16px',
  border: 'var(--border-default)',
  borderRadius: 'var(--radius-full)',
  background: 'rgba(255, 255, 255, 0.28)',
  color: 'var(--color-text-primary)'
}

export const actionLinkInteractiveStyle: CSSProperties = {
  transform: 'translateY(-2px)',
  background: 'rgba(55, 160, 123, 0.14)',
  borderColor: 'var(--peach-strong)',
  outline: 'none'
}

export const mediaRailStyle: CSSProperties = {
  position: 'sticky',
  top: 0,
  alignSelf: 'flex-start',
  flex: '1 1 50%',
  minWidth: 0,
  height: 'var(--oppo-panel-height)',
  overflow: 'hidden',
  background: 'var(--greenish-gradient)'
}

export const mediaTrackStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  willChange: 'transform'
}

export const mediaPanelStyle: CSSProperties = {
  position: 'relative',
  height: 'var(--oppo-panel-height)',
  padding: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden'
}

export const mediaPanelUnderlayStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  background: 'linear-gradient(to top, rgba(55, 160, 123, 0.18) 0%, rgba(55, 160, 123, 0.1) 50%, rgba(55, 160, 123, 0.04) 100%)',
  pointerEvents: 'none'
}

export const mediaPanelTextureStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  background: 'radial-gradient(circle at top right, rgba(43, 167, 191, 0.14), transparent 44%), radial-gradient(circle at bottom left, rgba(244, 162, 97, 0.1), transparent 36%)',
  opacity: 0.9,
  pointerEvents: 'none'
}

export const mediaCardStyle: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  width: 'min(100%, 720px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 20
}

export const mediaCardHeaderStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8
}

export const mediaCategoryStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-secondary)',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--line-height-100)',
  letterSpacing: '0.22em',
  textTransform: 'uppercase'
}

export const mediaTitleStyle: CSSProperties = {
  margin: 0,
  color: 'var(--color-text-primary)',
  fontSize: 'clamp(1.5rem, 2.2vw, 2.4rem)',
  lineHeight: 1.08,
  fontWeight: 600
}

export const videoShellStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  border: 'var(--border-default)',
  borderRadius: 16,
  background: 'rgba(31, 42, 42, 0.08)',
  boxShadow: 'var(--shadow-none)'
}

export const videoFrameStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  border: 0,
  display: 'block'
}

export const sourceCardStyle: CSSProperties = {
  border: 'var(--border-default)',
  borderRadius: 16,
  padding: 24,
  background: 'rgba(255, 255, 255, 0.34)',
  backdropFilter: 'blur(6px)'
}

export const sourceHeadingStyle: CSSProperties = {
  margin: '0 0 16px',
  color: 'var(--color-text-primary)',
  fontSize: 'var(--font-size-16)',
  fontWeight: 'var(--font-weight-medium)'
}

export const sourceLinksStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12
}

export const sourceLinkStyle: CSSProperties = {
  ...actionLinkBaseStyle,
  color: 'var(--color-text-primary)',
  border: 'var(--border-subtle)',
  borderRadius: 12,
  padding: '14px 16px',
  background: 'rgba(255, 255, 255, 0.22)'
}

export const sourceLinkInteractiveStyle: CSSProperties = {
  transform: 'translateY(-2px)',
  background: 'rgba(244, 162, 97, 0.16)',
  borderColor: 'var(--peach-strong)',
  outline: 'none'
}

export const mobileScrollStyle: CSSProperties = {
  height: 'auto',
  overflow: 'visible'
}

export const mobileInnerStyle: CSSProperties = {
  display: 'block'
}

export const mobilePanelStyle: CSSProperties = {
  height: 'auto',
  minHeight: 480,
  padding: 24,
  borderRight: 0,
  borderBottom: 'var(--border-subtle)'
}
