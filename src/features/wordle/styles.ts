import type { CSSProperties } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'
import { getSharedFeedbackBackground, getSharedLetterCellStyle, letterGameTheme, sharedStatusStyle } from '../shared/letterGame/styles'
import type { GameStatus, LetterGameStyleFactory, LetterResult, LetterTileState } from './types'

const tileSize = '48px'
const keyMinWidth = '28px'
const keyHeight = '28px'
const keyPadding = '0 6px'
const keyFontSize = 'var(--font-size-12)'

export const gameContainerStyle: CSSProperties = {
  display: 'grid',
  gap: letterGameTheme.layoutGap,
}

export const activeBoardSurfaceStyle: CSSProperties = {
  display: 'grid',
  gap: letterGameTheme.layoutGap,
  outline: 'none',
}

export const letterGridStyle: CSSProperties = {
  display: 'grid',
  gap: letterGameTheme.rowGap,
  justifyContent: 'center',
}

export const createLetterRowStyle = (columnCount: number): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${columnCount}, ${tileSize})`,
  gap: letterGameTheme.rowGap,
})

export const getLetterTileStyle: LetterGameStyleFactory<LetterTileState> = ({ letter, result, isActiveRow, isCursorCell }) => ({
  width: tileSize,
  height: tileSize,
  display: 'grid',
  placeItems: 'center',
  color: letterGameTheme.tileTextColour,
  textTransform: 'uppercase',
  fontWeight: letterGameTheme.tileFontWeight,
  opacity: isActiveRow || result || letter ? 1 : 0.9,
  ...getSharedLetterCellStyle({
    isActiveRow,
    isActiveCell: isCursorCell,
    isCorrect: result === 'correct',
    isPresent: result === 'present',
    isAbsent: result === 'absent',
  }),
})

export const keyboardPreviewContainerStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: letterGameTheme.keyboardGap,
  justifyContent: 'center',
}

export const getKeyboardPreviewKeyStyle: LetterGameStyleFactory<LetterResult | undefined> = (letterResult) => ({
  minWidth: keyMinWidth,
  height: keyHeight,
  display: 'grid',
  placeItems: 'center',
  padding: keyPadding,
  border: letterGameTheme.tileBorder,
  borderRadius: letterGameTheme.tileRadius,
  textTransform: 'uppercase',
  fontSize: keyFontSize,
  background: getSharedFeedbackBackground(letterResult) ?? letterGameTheme.interactiveBackground,
})

export const getStatusBannerStyle: LetterGameStyleFactory<GameStatus> = (status) => ({
  ...sharedStatusStyle,
  textAlign: 'center',
  background: status === 'won'
    ? letterGameTheme.solvedBackground
    : status === 'lost'
      ? letterGameTheme.warningBackground
      : letterGameTheme.interactiveBackground,
})

export const playAgainButtonSx: SxProps<Theme> = {
  color: 'inherit',
  border: letterGameTheme.tileBorder,
  borderRadius: letterGameTheme.tileRadius,
  background: letterGameTheme.interactiveBackground,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    background: letterGameTheme.activeRowBackground,
  },
}
