import type { JSX } from 'react'
import { getKeyboardPreviewKeyStyle, keyboardPreviewContainerStyle } from './styles'
import type { WordleKeyboardPreviewProps } from './types'

const KEYBOARD_LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

export const WordleKeyboardPreview = ({ keyboardState }: WordleKeyboardPreviewProps): JSX.Element => (
  <div style={keyboardPreviewContainerStyle} aria-label="Keyboard letter hints">
    {KEYBOARD_LETTERS.map((letter) => (
      <div key={letter} style={getKeyboardPreviewKeyStyle(keyboardState[letter])}>
        {letter}
      </div>
    ))}
  </div>
)
