import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveSurfaceStyle } from './shared'
import type { Border, Padding, PrimitiveProps, Radius, Shadow, Surface } from '../types'

type BoxProps<T extends ElementType> = PrimitiveProps<T> & {
  surface?: Surface
  radius?: Radius
  border?: Border
  shadow?: Shadow
  padding?: Padding
}

const BoxComponent = <T extends ElementType = 'div'>(
  {
    as,
    surface = 'transparent',
    radius = 'container',
    border,
    shadow,
    padding,
    style,
    ...rest
  }: BoxProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? 'div'
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(resolveSurfaceStyle(surface, radius, border, shadow, padding), style),
  })
}

export const Box = forwardRef(BoxComponent) as <T extends ElementType = 'div'>(
  props: BoxProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
