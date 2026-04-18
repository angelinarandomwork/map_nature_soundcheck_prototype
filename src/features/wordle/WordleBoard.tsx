import type { JSX } from 'react'
import { WORD_LENGTH } from './data'
import { activeBoardSurfaceStyle, createLetterRowStyle, getLetterTileStyle, letterGridStyle } from './styles'
import type { WordleBoardProps } from './types'

export const WordleBoard = ({ rows, activeRowIndex, cursorIndex, boardRef, onBoardKeyDown, onBoardFocus }: WordleBoardProps): JSX.Element => (
  <div
    ref={boardRef}
    tabIndex={0}
    role="group"
    aria-label="Wordle board"
    onKeyDown={onBoardKeyDown}
    onFocus={onBoardFocus}
    onClick={onBoardFocus}
    style={activeBoardSurfaceStyle}
  >
    <div style={letterGridStyle}>
      {rows.map((row, rowIndex) => {
        const isActiveRow = rowIndex === activeRowIndex

        return (
          <div key={rowIndex} style={createLetterRowStyle(WORD_LENGTH)}>
            {row.letters.map((letter, letterIndex) => {
              const result = row.isSubmitted ? row.evaluation[letterIndex] : undefined
              const isCursorCell = isActiveRow && !row.isSubmitted && (cursorIndex === letterIndex || (cursorIndex === WORD_LENGTH && letterIndex === WORD_LENGTH - 1))

              return (
                <div
                  key={letterIndex}
                  aria-label={`Row ${rowIndex + 1}, column ${letterIndex + 1}, ${letter || 'empty'}`}
                  style={getLetterTileStyle({
                    letter,
                    result,
                    isActiveRow,
                    isCursorCell,
                  })}
                >
                  {letter}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  </div>
)
