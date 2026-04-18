import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveInlineAlignment, resolveJustification, resolveSpacing } from './shared'
import type { InlineAlignment, InlineJustification, PrimitiveProps, Spacing } from '../types'

type InlineProps<T extends ElementType> = PrimitiveProps<T> & {
  space?: Spacing
  align?: InlineAlignment
  justify?: InlineJustification
  wrap?: boolean
  reverse?: boolean
}

const InlineComponent = <T extends ElementType = 'div'>(
  { as, space = 0, align, justify, wrap, reverse, style, ...rest }: InlineProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? 'div'
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(
      {
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        gap: resolveSpacing(space),
        alignItems: resolveInlineAlignment(align),
        justifyContent: resolveJustification(justify),
        flexWrap: wrap ? 'wrap' : 'nowrap',
      },
      style,
    ),
  })
}

export const Inline = forwardRef(InlineComponent) as <T extends ElementType = 'div'>(
  props: InlineProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
