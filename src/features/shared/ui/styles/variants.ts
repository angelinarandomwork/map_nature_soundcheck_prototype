export type UiVariant = 'neutral' | 'peachy' | 'greenish' | 'blueish' | 'green'
export type UiAppearance = 'solid' | 'text'

type UiVariantStyle = {
  background: string
  border: string
  boxShadow: string
  color: string
}

export const uiVariants: Record<UiVariant, UiVariantStyle> = {
  neutral: {
    background: 'var(--surface)',
    border: 'var(--border-default)',
    boxShadow: 'none',
    color: 'var(--text-primary)',
  },
  peachy: {
    background: 'var(--peach-low)',
    border: 'var(--border-peach)',
    boxShadow: 'none',
    color: 'var(--white)',
  },
  greenish: {
    background: 'var(--greenish-gradient)',
    border: 'var(--border-green)',
    boxShadow: 'none',
    color: 'var(--white)',
  },
  green: {
    background: 'var(--green-strong)',
    border: '1px solid var(green-dark-low)',
    boxShadow: 'none',
    color: 'var(--white)',
  },
  blueish: {
    background: 'var(--blueish-gradient)',
    border: 'var(--border-blue)',
    boxShadow: 'none',
    color: 'var(--white)',
  },
}
