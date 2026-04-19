import { Button, useMediaQuery } from '@mui/material'
import { useMemo, useState, type JSX, type KeyboardEvent } from 'react'
import { ActiveClueCard } from './ActiveClueCard'
import { ClueSection } from './ClueSection'
import { CrosswordBoard } from './CrosswordBoard'
import { CROSSWORD_ENTRIES } from './crosswordData'
import { handleCrosswordCellKeyDown } from './crosswordKeyboard'
import {
  buildCellMap,
  getBoardStats,
  getEntryCells,
  getEntryCompletion,
  getInitialActiveEntryId,
  getNextCellIndex,
} from './crosswordHelpers'
import { getClueSectionsStyle, getCrosswordLayoutStyle, getStatusStyle, styles } from './styles'
import type { CrosswordEntry, ValueMap } from './types'

export const CrosswordGame = (): JSX.Element => {
  const isCompactLayout = useMediaQuery('(max-width:1180px)')
  const isStackedClues = useMediaQuery('(max-width:760px)')

  const [values, setValues] = useState<ValueMap>({})
  const [activeEntryId, setActiveEntryId] = useState<string>(getInitialActiveEntryId(CROSSWORD_ENTRIES))
  const [activeCellIndex, setActiveCellIndex] = useState<number>(0)

  const cellMap = useMemo(() => buildCellMap(CROSSWORD_ENTRIES), [])
  const entryMap = useMemo(() => new Map(CROSSWORD_ENTRIES.map((entry) => [entry.id, entry])), [])
  const acrossEntries = useMemo(
    () => CROSSWORD_ENTRIES.filter((entry) => entry.direction === 'across'),
    []
  )
  const downEntries = useMemo(
    () => CROSSWORD_ENTRIES.filter((entry) => entry.direction === 'down'),
    []
  )

  const activeEntry = entryMap.get(activeEntryId) ?? CROSSWORD_ENTRIES[0]
  const activeEntryCells = useMemo(() => getEntryCells(activeEntry), [activeEntry])
  const activeEntryCellKeys = useMemo(() => new Set(activeEntryCells.map((cell) => cell.key)), [activeEntryCells])
  const activeCellKey = activeEntryCells[activeCellIndex]?.key
  const boardStats = useMemo(() => getBoardStats(CROSSWORD_ENTRIES, cellMap, values), [cellMap, values])
  const completedEntryIds = useMemo(
    () => new Set(CROSSWORD_ENTRIES.filter((entry) => getEntryCompletion(entry, values)).map((entry) => entry.id)),
    [values]
  )

  const selectEntry = (entryId: string, preferredCellIndex?: number): void => {
    const nextEntry = entryMap.get(entryId)
    if (!nextEntry) return

    setActiveEntryId(entryId)
    setActiveCellIndex(preferredCellIndex ?? getNextCellIndex(nextEntry, values, 0))
  }

  const getCellIndexForEntry = (entry: CrosswordEntry, row: number, column: number): number =>
    getEntryCells(entry).findIndex((entryCell) => entryCell.row === row && entryCell.column === column)

  const selectCell = (row: number, column: number): void => {
    const clickedCellKey = `${row}:${column}`
    const clickedCell = cellMap.get(clickedCellKey)
    if (!clickedCell) return

    if (clickedCell.entryIds.includes(activeEntryId)) {
      const clickedCellIndex = getCellIndexForEntry(activeEntry, row, column)
      if (clickedCellIndex >= 0) {
        setActiveCellIndex(clickedCellIndex)
        return
      }
    }

    const nextEntryId =
      clickedCell.entryIds.find((entryId) => entryMap.get(entryId)?.direction === activeEntry.direction) ?? clickedCell.entryIds[0]

    const nextEntry = entryMap.get(nextEntryId)
    if (!nextEntry) return

    const clickedCellIndex = getCellIndexForEntry(nextEntry, row, column)
    selectEntry(nextEntryId, Math.max(clickedCellIndex, 0))
  }

  const moveWithinEntry = (offset: number): void => {
    const nextIndex = activeCellIndex + offset
    if (nextIndex < 0 || nextIndex >= activeEntryCells.length) return
    setActiveCellIndex(nextIndex)
  }

  const setCellValue = (letter: string): void => {
    const currentCell = activeEntryCells[activeCellIndex]
    if (!currentCell) return

    setValues((currentValues) => ({
      ...currentValues,
      [currentCell.key]: letter.toUpperCase(),
    }))

    if (letter && activeCellIndex < activeEntryCells.length - 1) {
      setActiveCellIndex((currentIndex) => currentIndex + 1)
    }
  }

  const clearCurrentCell = (): void => {
    const currentCell = activeEntryCells[activeCellIndex]
    if (!currentCell) return

    setValues((currentValues) => ({
      ...currentValues,
      [currentCell.key]: '',
    }))
  }

  const clearCellByKey = (cellKey: string): void => {
    setValues((currentValues) => ({
      ...currentValues,
      [cellKey]: '',
    }))
  }

  const handleCellKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    handleCrosswordCellKeyDown({
      event,
      direction: activeEntry.direction,
      activeCellIndex,
      activeEntryCells,
      values,
      moveWithinEntry,
      clearCurrentCell,
      setActiveCellIndex,
      clearCellByKey,
      setCellValue,
    })
  }

  const resetPuzzle = (): void => {
    setValues({})
    setActiveEntryId(getInitialActiveEntryId(CROSSWORD_ENTRIES))
    setActiveCellIndex(0)
  }

  return (
    <div style={styles.crosswordGame}>
      <div style={styles.crosswordHeader}>
        <div style={styles.crosswordHeaderBlock}>
          <div style={styles.crosswordEyebrow}>Crossword</div>
          <div style={styles.crosswordTitle}>Nature sounds</div>
        </div>

        <div style={getStatusStyle({ isComplete: boardStats.isComplete })}>
          {boardStats.isComplete
            ? 'Wahoo! Well done!'
            : `${boardStats.completedEntryCount} of ${boardStats.totalEntryCount} answers complete · ${boardStats.correctCellCount} correct cells · ${boardStats.incorrectCellCount} incorrect cells`}
        </div>
      </div>

      <div style={getCrosswordLayoutStyle({ isCompact: isCompactLayout })}>
        <CrosswordBoard
          cellMap={cellMap}
          activeEntry={activeEntry}
          activeEntryCellKeys={activeEntryCellKeys}
          activeCellKey={activeCellKey}
          isCompactLayout={isCompactLayout}
          values={values}
          onCellSelect={selectCell}
          onCellKeyDown={handleCellKeyDown}
        />

        <div style={styles.crosswordSidebar}>
          <ActiveClueCard
            entry={activeEntry}
            entryCells={activeEntryCells}
            activeCellIndex={activeCellIndex}
            values={values}
            onCellSelect={setActiveCellIndex}
          />

          <div style={getClueSectionsStyle({ isStacked: isStackedClues })}>
            <ClueSection
              title="Across"
              entries={acrossEntries}
              activeEntryId={activeEntryId}
              completedEntryIds={completedEntryIds}
              onEntrySelect={selectEntry}
            />

            <ClueSection
              title="Down"
              entries={downEntries}
              activeEntryId={activeEntryId}
              completedEntryIds={completedEntryIds}
              onEntrySelect={selectEntry}
            />
          </div>

          <div style={styles.crosswordActions}>
            <Button onClick={resetPuzzle} variant="contained" disableElevation style={styles.resetButton}>
              Reset puzzle
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
