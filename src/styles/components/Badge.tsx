import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveBadgeStyle } from './shared'
import type { BadgeSize, BadgeTone, PrimitiveProps } from '../types'

type BadgeProps<T extends ElementType> = PrimitiveProps<T> & {
  tone?: BadgeTone
  size?: BadgeSize
}

const BadgeComponent = <T extends ElementType = 'span'>(
  { as, tone = 'neutral', size = 'md', style, ...rest }: BadgeProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? 'span'
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(resolveBadgeStyle(tone, size), style),
  })
}

export const Badge = forwardRef(BadgeComponent) as <T extends ElementType = 'span'>(
  props: BadgeProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
