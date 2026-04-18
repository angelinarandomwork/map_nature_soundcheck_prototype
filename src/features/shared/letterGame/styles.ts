import type { CSSProperties } from 'react'
import type { LetterFeedbackState, SharedLetterCellVisualState, SharedStyleFactory } from './types'

const interactiveBackground = 'var(--greenish-gradient)'
const solvedBackground = 'rgba(55,160,123,0.22)'
const warningBackground = 'rgba(244,162,97,0.22)'
const inactiveFeedbackBackground = 'rgba(31, 42, 42, 0.08)'
const activeOutline = '2px solid var(--peach-strong)'
const activeRowBackground = 'linear-gradient(0deg, rgba(0,0,0,0.06), rgba(0,0,0,0.06)), var(--greenish-gradient)'
const activeCellBackground = 'linear-gradient(0deg, rgba(0,0,0,0.12), rgba(0,0,0,0.12)), var(--greenish-gradient)'
const activeSolvedBackground = 'color-mix(in srgb, rgba(55,160,123,0.22) 74%, var(--peach-strong))'
const activeWarningBackground = 'color-mix(in srgb, rgba(244,162,97,0.22) 74%, var(--peach-strong))'

export const letterGameTheme = {
  interactiveBackground,
  solvedBackground,
  warningBackground,
  inactiveFeedbackBackground,
  activeOutline,
  activeRowBackground,
  activeCellBackground,
  activeSolvedBackground,
  activeWarningBackground,
  tileBorder: 'var(--border-default)',
  tileRadius: 'var(--radius-4)',
  tileTextColour: 'inherit',
  tileFontWeight: 600,
  layoutGap: '16px',
  rowGap: '8px',
  keyboardGap: '6px',
  statusPadding: '8px 12px',
} as const

export const getSharedFeedbackBackground = (state?: LetterFeedbackState): string | undefined => {
  if(state === 'correct') return letterGameTheme.solvedBackground
  if(state === 'present') return letterGameTheme.warningBackground
  if(state === 'absent') return letterGameTheme.inactiveFeedbackBackground
  return undefined
}

export const getSharedLetterCellStyle: SharedStyleFactory<SharedLetterCellVisualState> = ({
  isActiveRow,
  isActiveCell,
  isCorrect,
  isPresent,
  isAbsent,
}): CSSProperties => {
  const background = isActiveCell
    ? isCorrect
      ? letterGameTheme.activeSolvedBackground
      : isPresent
        ? letterGameTheme.activeWarningBackground
        : letterGameTheme.activeCellBackground
    : isCorrect
      ? letterGameTheme.solvedBackground
      : isPresent
        ? letterGameTheme.warningBackground
        : isAbsent
          ? letterGameTheme.inactiveFeedbackBackground
          : isActiveRow
            ? letterGameTheme.activeRowBackground
            : letterGameTheme.interactiveBackground

  return {
    border: letterGameTheme.tileBorder,
    borderRadius: letterGameTheme.tileRadius,
    background,
    boxSizing: 'border-box',
    outline: isActiveCell ? letterGameTheme.activeOutline : 'none',
    outlineOffset: 0,
  }
}

export const sharedStatusStyle: CSSProperties = {
  padding: letterGameTheme.statusPadding,
  border: letterGameTheme.tileBorder,
  borderRadius: letterGameTheme.tileRadius,
  background: letterGameTheme.interactiveBackground,
}

export const getSharedCompletionStatusStyle = (isComplete: boolean): CSSProperties => ({
  ...sharedStatusStyle,
  background: isComplete ? letterGameTheme.solvedBackground : letterGameTheme.interactiveBackground,
})
