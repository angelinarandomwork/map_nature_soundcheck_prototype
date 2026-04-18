import type { CSSProperties, Dispatch, SetStateAction } from 'react'
import type { MotionValue } from 'framer-motion'

type FactCategory = 'Bioacoustics' | 'Ecoacoustics' | 'Plant acoustics'

export type ExternalLink = {
  label: string
  href: string
}

export type FactMedia =
  | {
      type: 'youtube'
      embedUrl: string
    }
  | {
      type: 'links'
      heading: string
      links: Array<ExternalLink>
    }

export type FactItem = {
  id: number
  category: FactCategory
  title: string
  description: string
  links: Array<ExternalLink>
  media: FactMedia
}

export type ContentProps = {
  content: Array<FactItem>
  isMobile: boolean
}

export type MediaRailProps = {
  content: Array<FactItem>
  scrollYProgress: MotionValue<number>
}

export type MediaCardProps = {
  item: FactItem
}

export type InteractiveAnchorProps = {
  href: string
  label: string
  baseStyle: CSSProperties
  interactiveStyle: CSSProperties
}

export type UseViewportMatchResult = {
  matches: boolean
}

export type UseInteractiveStateResult = {
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
}
