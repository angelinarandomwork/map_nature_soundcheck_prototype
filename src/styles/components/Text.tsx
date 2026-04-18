import { createElement, forwardRef, type ElementType, type ForwardedRef, type ReactElement } from 'react'
import { mergeStyles, resolveTextElement, resolveTextStyle } from './shared'
import type { PrimitiveProps, TextRole, TextTone } from '../types'

type TextProps<T extends ElementType> = PrimitiveProps<T> & {
  role?: TextRole
  tone?: TextTone
}

const TextComponent = <T extends ElementType = 'p'>(
  { as, role = 'body', tone = 'primary', style, ...rest }: TextProps<T>,
  ref: ForwardedRef<Element>,
) => {
  const Component = as ?? resolveTextElement(role)
  return createElement(Component, {
    ...rest,
    ref,
    style: mergeStyles(resolveTextStyle(role, tone), style),
  })
}

export const Text = forwardRef(TextComponent) as <T extends ElementType = 'p'>(
  props: TextProps<T> & { ref?: ForwardedRef<Element> },
) => ReactElement
