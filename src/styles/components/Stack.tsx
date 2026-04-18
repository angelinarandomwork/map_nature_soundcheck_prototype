import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveJustification, resolveSpacing, resolveStackAlignment } from './shared'
import type { PrimitiveProps, Spacing, StackAlignment, StackJustification } from '../types'

type StackProps<T extends ElementType> = PrimitiveProps<T> & {
  space?: Spacing
  align?: StackAlignment
  justify?: StackJustification
  reverse?: boolean
}

const StackComponent = <T extends ElementType = 'div'>(
  { as, space = 0, align, justify, reverse, style, ...rest }: StackProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? 'div'
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(
      {
        display: 'flex',
        flexDirection: reverse ? 'column-reverse' : 'column',
        gap: resolveSpacing(space),
        alignItems: resolveStackAlignment(align),
        justifyContent: resolveJustification(justify),
      },
      style,
    ),
  })
}

export const Stack = forwardRef(StackComponent) as <T extends ElementType = 'div'>(
  props: StackProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
