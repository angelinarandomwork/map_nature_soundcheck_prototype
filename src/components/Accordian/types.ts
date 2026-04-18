import type { ReactNode } from "react"

export type AccordionSectionProps = {
    title?: string
    intro?: ReactNode
    children: ReactNode
}

export type AccordionItemProps = {
    title: string
    children: ReactNode
    defaultOpen?: boolean
    disabled?: boolean
}