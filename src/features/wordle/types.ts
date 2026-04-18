import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, RefObject } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import type { LetterFeedbackState, SharedLetterKeyboardAction } from '../shared/letterGame/types'

export type LetterResult = LetterFeedbackState
export type GameStatus = 'playing' | 'won' | 'lost'

export type EvaluatedLetter = {
  letter: string
  state: LetterResult
}

export type EvaluatedGuess = {
  raw: string
  letters: Array<EvaluatedLetter>
}

export type KeyboardLetterState = Partial<Record<string, LetterResult>>

export type WordleRow = {
  letters: Array<string>
  evaluation: Array<LetterResult | undefined>
  isSubmitted: boolean
}

export type WordleState = {
  rows: Array<WordleRow>
  activeRowIndex: number
  cursorIndex: number
  status: GameStatus
  answer: string
}

export type WordleAction =
  | { type: 'append-letter'; letter: string }
  | { type: 'remove-letter' }
  | { type: 'submit-row' }
  | { type: 'move-cursor'; offset: number }
  | { type: 'reset-game'; answer: string }

export type WordleKeyboardAction = SharedLetterKeyboardAction

export type LetterTileState = {
  letter: string
  result?: LetterResult
  isActiveRow: boolean
  isCursorCell: boolean
}

export type WordleBoardProps = {
  rows: Array<WordleRow>
  activeRowIndex: number
  cursorIndex: number
  boardRef: RefObject<HTMLDivElement | null>
  onBoardKeyDown: (event: ReactKeyboardEvent<HTMLDivElement>) => void
  onBoardFocus: () => void
}

export type WordleKeyboardPreviewProps = {
  keyboardState: KeyboardLetterState
}

export type StatusBannerProps = {
  status: GameStatus
  answer: string
}

export type LetterGameStyleFactory<TArg> = (argument: TArg) => CSSProperties
export type LetterGameSxFactory<TArg> = (argument: TArg) => SxProps<Theme>
