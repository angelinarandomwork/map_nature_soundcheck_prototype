import { memo, type JSX } from 'react'
import { getMiniCellStyle, styles } from './styles'
import type { ActiveClueCardProps } from './types'

export const ActiveClueCard = memo(
  ({ entry, entryCells, activeCellIndex, values, onCellSelect }: ActiveClueCardProps): JSX.Element => (
    <div style={styles.crosswordActiveClueCard}>
      <div style={styles.crosswordActiveClueMeta}>
        {entry.number} {entry.direction}
      </div>
      <div style={styles.crosswordActiveClueText}>{entry.clue}</div>
      <div style={styles.crosswordActiveClueAnswer}>
        {entryCells.map((cell, index) => {
          const isSolved = Boolean(values[cell.key] && values[cell.key] === entry.answer[index])

          return (
            <button
              key={cell.key}
              type="button"
              style={getMiniCellStyle({
                isActive: activeCellIndex === index,
                isSolved,
              })}
              onClick={() => onCellSelect(index)}
            >
              {values[cell.key] ?? ''}
            </button>
          )
        })}
      </div>
    </div>
  )
)

ActiveClueCard.displayName = 'ActiveClueCard'
