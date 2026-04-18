import type { CSSProperties, ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type Surface =
  | 'transparent'
  | 'page'
  | 'subtle'
  | 'base'
  | 'elevated'
  | 'accent'
  | 'danger'
  | 'brutalist'
  | 'floating'

export type Radius = 'none' | 'inline' | 'container' | 'overlay' | 'pill'
export type Border = 'none' | 'subtle' | 'default' | 'strong' | 'interactive' | 'danger'
export type Shadow = 'none' | 'brutalist' | 'floating'
export type Padding = 'none' | 'sm' | 'md' | 'lg'
export type InlineAlignment = 'start' | 'center' | 'end' | 'baseline' | 'stretch'
export type InlineJustification = 'start' | 'center' | 'end' | 'between'
export type StackAlignment = 'start' | 'center' | 'end' | 'stretch'
export type StackJustification = 'start' | 'center' | 'end' | 'between'
export type Spacing = 0 | 1 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 24 | 30 | 32 | 40 | 48 | 56 | 64
export type TextRole =
  | 'subheading'
  | 'featureLabel'
  | 'bodyLarge'
  | 'body'
  | 'cardTitle'
  | 'caption'
  | 'label'
export type TextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'inverse'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'disabled'
export type BadgeTone = 'neutral' | 'subtle' | 'accent' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'sm' | 'md' | 'lg'

export type PrimitiveProps<T extends ElementType> = {
  as?: T
  className?: string
  style?: CSSProperties
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'style' | 'children'>
