import type { CSSProperties } from 'react'

export type LetterFeedbackState = 'correct' | 'present' | 'absent'

export type SharedLetterCellVisualState = {
  isActiveRow: boolean
  isActiveCell: boolean
  isCorrect: boolean
  isPresent: boolean
  isAbsent: boolean
}

export type SharedLetterKeyboardAction =
  | { type: 'append-letter'; letter: string }
  | { type: 'remove-letter' }
  | { type: 'submit-row' }
  | { type: 'move-cursor'; offset: number }
  | { type: 'noop' }

export type SharedStyleFactory<TArgument> = (argument: TArgument) => CSSProperties
