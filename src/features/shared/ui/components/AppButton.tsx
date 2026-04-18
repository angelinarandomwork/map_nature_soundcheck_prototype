import type { ButtonHTMLAttributes, CSSProperties, JSX, ReactNode } from 'react'
import { uiVariants, type UiAppearance, type UiVariant } from '../styles/variants'

type AppButtonProps = {
  label: string
  variant?: UiVariant
  appearance?: UiAppearance
  fullWidth?: boolean
  leadingVisual?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const getBaseButtonStyle = (fullWidth: boolean, disabled: boolean): CSSProperties => ({
  width: fullWidth ? '100%' : 'auto',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  font: 'inherit',
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.6 : 1,
  transition: 'background-color 160ms ease, border-color 160ms ease, transform 160ms ease, opacity 160ms ease',
})

const getSolidButtonStyle = (variant: UiVariant): CSSProperties => {
  const selectedVariant = uiVariants[variant]

  return {
    minHeight: '44px',
    padding: '10px 14px',
    border: selectedVariant.border,
    borderRadius: '999px',
    background: selectedVariant.background,
    color: selectedVariant.color,
    boxShadow: selectedVariant.boxShadow,
  }
}

const getTextButtonStyle = (variant: UiVariant): CSSProperties => {
  const selectedVariant = uiVariants[variant]

  return {
    minHeight: 'auto',
    padding: 0,
    border: 'none',
    borderRadius: 0,
    background: 'transparent',
    color: selectedVariant.color,
    boxShadow: 'none',
  }
}

export const AppButton = ({
  label,
  variant = 'neutral',
  appearance = 'solid',
  fullWidth = false,
  leadingVisual,
  disabled = false,
  type = 'button',
  style,
  ...buttonProps
}: AppButtonProps): JSX.Element => {
  const composedStyle = {
    ...getBaseButtonStyle(fullWidth, disabled),
    ...(appearance === 'text' ? getTextButtonStyle(variant) : getSolidButtonStyle(variant)),
    ...style,
  }

  return (
    <button {...buttonProps} type={type} disabled={disabled} style={composedStyle}>
      {leadingVisual}
      <span>{label}</span>
    </button>
  )
}
