import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'

export const StyledConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 18,
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: 'var(--green-strong)',
        borderTopWidth: 2,
        borderRadius: 999,
    },
}))

export const sectionContainerSx = {
    display: 'grid',
    gap: 2,
    padding: 2,
    border: 'var(--border-green)',
    borderRadius: '20px',
    background: 'var(--greenish-gradient)',
    boxShadow: '0 10px 24px rgba(43, 167, 191, 0.08)',
} as const

export const transparentItemFrameSx = {
    display: 'grid',
    gap: 1.5,
    padding: 2,
    borderRadius: '18px',
    border: 'var(--border-green)',
    backgroundColor: 'transparent',
} as const

export const contentCardSx = {
    display: 'grid',
    gap: 1,
    padding: 2,
    borderRadius: '18px',
    border: '1px solid var(--green-dark-low-border)',
    backgroundColor: 'rgba(255, 255, 255, 0.52)',
} as const

export const sharedStepperSx = {
    '& .MuiStepLabel-label': {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 500,
    },
    '& .MuiStepLabel-label.Mui-active': {
        color: 'var(--color-text-primary)',
    },
    '& .MuiStepLabel-label.Mui-completed': {
        color: 'var(--green-strong)',
    },
    '& .MuiStepIcon-root': {
        color: 'var(--peach-strong)',
    },
    '& .MuiStepIcon-root.Mui-active': {
        color: 'var(--blue-strong)',
    },
    '& .MuiStepIcon-root.Mui-completed': {
        color: 'var(--green-strong)',
    },
    '& .MuiStepIcon-text': {
        fill: 'var(--white)',
    },
} as const

export const stepTitleSx = {
    color: 'var(--color-text-primary)',
    fontSize: '1rem',
} as const

export const stepDescriptionSx = {
    color: 'var(--color-text-secondary)',
    fontSize: '0.95rem',
} as const

export const stepOverlineSx = {
    color: 'var(--blue-strong)',
    letterSpacing: '0.08em',
} as const

