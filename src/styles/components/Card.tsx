import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveSurfaceStyle } from './shared'
import type { Padding, PrimitiveProps, Surface } from '../types'

type CardTone = Extract<Surface, 'base' | 'elevated' | 'brutalist' | 'floating' | 'accent' | 'danger'>

type CardProps<T extends ElementType> = PrimitiveProps<T> & {
  tone?: CardTone
  padding?: Padding
}

const CardComponent = <T extends ElementType = 'div'>(
  { as, tone = 'base', padding = 'md', style, ...rest }: CardProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? 'div'
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(
      {
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 160ms cubic-bezier(0.2, 0, 0, 1), border-color 160ms cubic-bezier(0.2, 0, 0, 1), color 160ms cubic-bezier(0.2, 0, 0, 1)',
      },
      resolveSurfaceStyle(tone, 'container', undefined, undefined, padding),
      style,
    ),
  })
}

export const Card = forwardRef(CardComponent) as <T extends ElementType = 'div'>(
  props: CardProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
