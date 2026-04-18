import { memo, type JSX } from 'react'
import { CROSSWORD_COLUMNS, CROSSWORD_ROWS } from './crosswordData'
import { getCellKey, getCellState } from './crosswordHelpers'
import type { CrosswordBoardProps } from './types'
import { getBoardStyle, getCellStyle, styles } from './styles'

export const CrosswordBoard = memo(
  ({
    cellMap,
    activeEntryCellKeys,
    activeCellKey,
    isCompactLayout,
    values,
    onCellSelect,
    onCellKeyDown,
  }: CrosswordBoardProps): JSX.Element => (
    <div style={getBoardStyle({ columnCount: CROSSWORD_COLUMNS, isCompact: isCompactLayout })}>
      {Array.from({ length: CROSSWORD_ROWS }).map((_, row) =>
        Array.from({ length: CROSSWORD_COLUMNS }).map((__, column) => {
          const key = getCellKey(row, column)
          const cell = cellMap.get(key)

          if (!cell) {
            return <div key={key} style={styles.crosswordSpacerCell} />
          }

          const { isCorrect, isIncorrect } = getCellState(cell, values)
          const isActiveEntryCell = activeEntryCellKeys.has(key)
          const isActiveCell = activeCellKey === key

          return (
            <label
              key={key}
              style={getCellStyle({
                isActiveEntryCell,
                isActiveCell,
                isSolvedCell: isCorrect,
                hasIncorrectValue: isIncorrect,
              })}
              onClick={() => onCellSelect(row, column)}
            >
              {cell.number ? <span style={styles.crosswordCellNumber}>{cell.number}</span> : null}
              <input
                style={styles.crosswordCellInput}
                value={values[key] ?? ''}
                onFocus={() => onCellSelect(row, column)}
                onKeyDown={onCellKeyDown}
                onChange={() => undefined}
                inputMode="text"
                maxLength={1}
                aria-label={`Row ${row + 1}, column ${column + 1}`}
              />
            </label>
          )
        })
      )}
    </div>
  )
)

CrosswordBoard.displayName = 'CrosswordBoard'
