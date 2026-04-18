import type { ReactNode } from 'react'

export type LinkItem = {
  label: string
  href: string
}

export type MediaItem =
  | {
      kind: 'image'
      src: string
      alt: string
    }
  | {
      kind: 'video'
      src: string
      title: string
      thumbnailSrc?: string
    }

export type StepperStep = {
  id: string
  label: string
  description?: string
  optional?: boolean
  content?: ReactNode
}
export type StepNavigationProps = {
  activeStep: number
  isLastStep: boolean
  onBack: () => void
  onNext: () => void
  onReset: () => void
}

export type ListItemContent = {
  id: string
  number?: number
  title?: string
  description?: string
  links?: Array<LinkItem>
  media?: Array<MediaItem>
  badge?: string
  stepperSteps?: Array<StepperStep>
}

export type ResourceLink = {
  label: string
  href: string
}

export type ListSection = {
  id: string
  title: string
  subtitle?: string
  items: Array<ListItemContent>
}

export type HardwareListProps = {
  section: ListSection
}
export type SectionHeaderProps = {
  title: string
  subtitle?: string
}
export type HardwareItemProps = {
  item: ListItemContent
}
export type ResourceLinksProps = {
  links: Array<ResourceLink>
}
export type ListSectionStepperProps = {
  section: ListSection
  initialStep?: number
}
export type ListSectionViewProps = {
  section: ListSection
}
export type ItemFrameProps = {
  title: string
  description?: string
  children: ReactNode
}
export type SectionShellProps = {
  title: string
  subtitle?: string
  children: ReactNode
  gap?: number
}
export type StepDetailCardProps = {
  overline?: string
  title: string
  description?: string
  children?: ReactNode
}
export type BaseStepperProps<TStep> = {
  steps: Array<TStep>
  initialStep?: number
  getStepId: (step: TStep) => string
  getStepLabel: (step: TStep) => string
  renderStepPanel: (step: TStep, stepIndex: number) => ReactNode
  showCompletedMessage?: boolean
}