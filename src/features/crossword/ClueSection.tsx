import { memo, type JSX } from 'react'
import { getClueButtonStyle, styles } from './styles'
import type { ClueSectionProps } from './types'

export const ClueSection = memo(
  ({ title, entries, activeEntryId, completedEntryIds, onEntrySelect }: ClueSectionProps): JSX.Element => (
    <div style={styles.crosswordClueSection}>
      <div style={styles.crosswordClueHeading}>{title}</div>
      <div style={styles.crosswordClueList}>
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            style={getClueButtonStyle({
              isActive: activeEntryId === entry.id,
              isComplete: completedEntryIds.has(entry.id),
            })}
            onClick={() => onEntrySelect(entry.id)}
          >
            <span style={styles.crosswordClueNumber}>{entry.number}</span>
            <span style={styles.crosswordClueText}>{entry.clue}</span>
          </button>
        ))}
      </div>
    </div>
  )
)

ClueSection.displayName = 'ClueSection'
