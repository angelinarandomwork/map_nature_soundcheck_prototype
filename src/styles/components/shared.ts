import type { CSSProperties } from 'react'
import type {
  BadgeSize,
  BadgeTone,
  Border,
  InlineAlignment,
  InlineJustification,
  Padding,
  Radius,
  Shadow,
  Spacing,
  StackAlignment,
  StackJustification,
  Surface,
  TextRole,
  TextTone,
} from '../types'

export const mergeStyles = (...styleEntries: Array<CSSProperties | undefined>): CSSProperties => {
  return Object.assign({}, ...styleEntries)
}

export const resolveSpacing = (space: Spacing = 0): string => `var(--space-${space})`

export const resolveSurfaceStyle = (
  surface: Surface = 'transparent',
  radius: Radius = 'container',
  border?: Border,
  shadow?: Shadow,
  padding?: Padding,
): CSSProperties => {
  return {
    ...surfaceStyles[surface],
    borderRadius: radiusStyles[radius],
    ...(border ? { border: borderStyles[border] } : undefined),
    ...(shadow ? { boxShadow: shadowStyles[shadow] } : undefined),
    ...(padding ? { padding: paddingStyles[padding] } : undefined),
  }
}

const surfaceStyles: Record<Surface, CSSProperties> = {
  transparent: {
    backgroundColor: 'transparent',
    border: 'var(--border-width-0) var(--border-style-none) transparent',
    boxShadow: 'none',
  },
  page: {
    background: 'var(--background-gradient)',
    border: 'var(--border-width-0) var(--border-style-none) transparent',
    boxShadow: 'none',
  },
  subtle: {
    backgroundColor: 'var(--background-flat-peachy)',
    border: 'var(--border-subtle)',
    boxShadow: 'none',
    overflowY: 'auto',
  },
  base: {
    background: 'var(--greenish-gradient)',
    border: 'var(--border-default)',
    boxShadow: 'none',
  },
  elevated: {
    background: 'var(--color-surface)',
    border: 'var(--border-default)',
    boxShadow: 'none',
  },
  accent: {
    background: 'var(--blue-dark-low)',
    border: 'var(--border-default)',
    boxShadow: 'none',
  },
  danger: {
    background: 'var(--reddish-dark-low)',
    border: 'var(--border-danger)',
    boxShadow: 'none',
  },
  brutalist: {
    background: 'var(--color-surface)',
    border: 'var(--border-peach)',
    boxShadow: 'var(--shadow-brutalist)',
  },
  floating: {
    background: 'var(--color-surface)',
    border: 'var(--border-default)',
    boxShadow: 'var(--shadow-floating)',
  },
}

const radiusStyles: Record<Radius, string> = {
  none: 'var(--radius-0)',
  inline: 'var(--radius-2)',
  container: 'var(--radius-4)',
  overlay: 'var(--radius-8)',
  pill: 'var(--radius-full)',
}

const borderStyles: Record<Border, string> = {
  none: 'var(--border-width-0) var(--border-style-none) transparent',
  subtle: 'var(--border-subtle)',
  default: 'var(--border-default)',
  strong: 'var(--border-strong)',
  interactive: 'var(--border-interactive)',
  danger: 'var(--border-danger)',
}

const shadowStyles: Record<Shadow, string> = {
  none: 'var(--shadow-none)',
  brutalist: 'var(--shadow-brutalist)',
  floating: 'var(--shadow-floating)',
}

const paddingStyles: Record<Padding, string> = {
  none: 'var(--space-0)',
  sm: '12px',
  md: 'var(--space-16)',
  lg: 'var(--space-24)',
}

export const resolveInlineAlignment = (alignment?: InlineAlignment): CSSProperties['alignItems'] => {
  switch (alignment) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    case 'baseline':
      return 'baseline'
    case 'stretch':
      return 'stretch'
    default:
      return undefined
  }
}

export const resolveStackAlignment = (alignment?: StackAlignment): CSSProperties['alignItems'] => {
  switch (alignment) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    case 'stretch':
      return 'stretch'
    default:
      return undefined
  }
}

export const resolveJustification = (
  justification?: InlineJustification | StackJustification,
): CSSProperties['justifyContent'] => {
  switch (justification) {
    case 'start':
      return 'flex-start'
    case 'center':
      return 'center'
    case 'end':
      return 'flex-end'
    case 'between':
      return 'space-between'
    default:
      return undefined
  }
}

export const resolveTextElement = (role: TextRole): 'p' | 'h3' | 'h4' | 'h5' | 'span' | 'label' => {
  switch (role) {
    case 'subheading':
      return 'h3'
    case 'cardTitle':
      return 'h4'
    case 'featureLabel':
      return 'h5'
    case 'caption':
      return 'span'
    case 'label':
      return 'label'
    default:
      return 'p'
  }
}

export const resolveTextStyle = (role: TextRole = 'body', tone: TextTone = 'primary'): CSSProperties => {
  return {
    fontFamily: 'var(--font-family-sans)',
    letterSpacing: 'var(--letter-spacing-normal)',
    ...roleStyles[role],
    color: toneStyles[tone],
  }
}

const roleStyles: Record<TextRole, CSSProperties> = {
  subheading: {
    fontSize: 'var(--font-size-28)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-120)',
  },
  featureLabel: {
    fontSize: 'var(--font-size-20)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-120)',
  },
  bodyLarge: {
    fontSize: 'var(--font-size-18)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-120)',
  },
  body: {
    fontSize: 'var(--font-size-16)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-150)',
  },
  cardTitle: {
    fontSize: 'var(--font-size-24)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-120)',
  },
  caption: {
    fontSize: 'var(--font-size-14)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-163)',
  },
  label: {
    fontSize: 'var(--font-size-13)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-150)',
  },
}

const toneStyles: Record<TextTone, string> = {
  primary: 'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  muted: 'var(--color-text-muted)',
  inverse: 'var(--white)',
  accent: 'var(--blue-strong)',
  success: 'var(--green-strong)',
  warning: 'var(--amber-strong)',
  danger: 'var(--reddish-strong)',
  info: 'var(--blue-strong)',
  disabled: 'var(--color-text-disabled)',
}

export const resolveBadgeStyle = (tone: BadgeTone = 'neutral', size: BadgeSize = 'md'): CSSProperties => {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-family-sans)',
    fontWeight: 'var(--font-weight-medium)',
    letterSpacing: 'var(--letter-spacing-overline)',
    borderRadius: 'var(--radius-full)',
    ...badgeSizeStyles[size],
    ...badgeToneStyles[tone],
  }
}

const badgeSizeStyles: Record<BadgeSize, CSSProperties> = {
  sm: {
    height: 'var(--space-16)',
    padding: '0 6px',
    fontSize: '11px',
    lineHeight: 'var(--line-height-100)',
  },
  md: {
    height: 'var(--space-20)',
    padding: '0 8px',
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--line-height-100)',
  },
  lg: {
    height: 'var(--space-24)',
    padding: '0 10px',
    fontSize: 'var(--font-size-13)',
    lineHeight: 'var(--line-height-100)',
  },
}

const badgeToneStyles: Record<BadgeTone, CSSProperties> = {
  neutral: {
    background: 'var(--greenish-gradient)',
    border: 'var(--border-default)',
    color: 'var(--color-text-secondary)',
  },
  subtle: {
    background: 'var(--background-flat-peachy)',
    border: 'var(--border-subtle)',
    color: 'var(--color-text-muted)',
  },
  accent: {
    background: 'var(--blue-dark-low)',
    border: 'var(--border-peach)',
    color: 'var(--blue-strong)',
  },
  success: {
    background: 'var(--green-strong)',
    border: 'var(--border-strong)',
    color: 'var(--white)',
  },
  warning: {
    background: 'var(--amber-dark-low-strong)',
    border: 'var(--border-peach)',
    color: 'var(--white)',
  },
  danger: {
    background: 'var(--reddish-dark-low-strong)',
    border: 'var(--border-peach)',
    color: 'var(--white)',
  },
  info: {
    background: 'var(--color-state-info)',
    border: 'var(--border-interactive)',
    color: 'var(--white)',
  },
}
