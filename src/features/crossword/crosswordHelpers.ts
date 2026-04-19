import type { CrosswordValidationIssue, ActiveCellDescriptor, CellMap, CrosswordCell, CrosswordEntry, ValueMap } from './types'

export const getCellKey = (row: number, column: number): string => `${row}:${column}`

export const getEntryCellPosition = (entry: CrosswordEntry, index: number): { row: number; column: number } => ({
  row: entry.direction === 'down' ? entry.row + index : entry.row,
  column: entry.direction === 'across' ? entry.column + index : entry.column,
})

export const createOverlapIssue = (
  existingCell: CrosswordCell,
  incomingEntry: CrosswordEntry,
  incomingLetter: string,
  cellKey: string
): CrosswordValidationIssue => ({
  cellKey,
  row: existingCell.row,
  column: existingCell.column,
  existingEntryId: existingCell.entryIds[0] ?? 'unknown',
  incomingEntryId: incomingEntry.id,
  existingLetter: existingCell.solution,
  incomingLetter,
})

export const validateCrosswordEntries = (entries: Array<CrosswordEntry>): Array<CrosswordValidationIssue> => {
  const cellMap: CellMap = new Map()
  const issues: Array<CrosswordValidationIssue> = []

  for (const entry of entries) {
    entry.answer.split('').forEach((letter, index) => {
      const { row, column } = getEntryCellPosition(entry, index)
      const cellKey = getCellKey(row, column)
      const existingCell = cellMap.get(cellKey)

      if (!existingCell) {
        cellMap.set(cellKey, {
          row,
          column,
          solution: letter,
          number: index === 0 ? entry.number : undefined,
          entryIds: [entry.id],
        })
        return
      }

      if (existingCell.solution !== letter) {
        issues.push(createOverlapIssue(existingCell, entry, letter, cellKey))
        return
      }

      cellMap.set(cellKey, {
        ...existingCell,
        number: existingCell.number ?? (index === 0 ? entry.number : undefined),
        entryIds: existingCell.entryIds.includes(entry.id) ? existingCell.entryIds : [...existingCell.entryIds, entry.id],
      })
    })
  }

  return issues
}

export const buildCellMap = (entries: Array<CrosswordEntry>): CellMap => {
  const issues = validateCrosswordEntries(entries)

  if (issues.length > 0) {
    const issueSummary = issues
      .map(
        (issue) =>
          `${issue.cellKey} ${issue.existingEntryId}=${issue.existingLetter} ${issue.incomingEntryId}=${issue.incomingLetter}`
      )
      .join(' | ')

    throw new Error(`Invalid crossword layout: ${issueSummary}`)
  }

  const cellMap: CellMap = new Map()

  for (const entry of entries) {
    entry.answer.split('').forEach((letter, index) => {
      const { row, column } = getEntryCellPosition(entry, index)
      const key = getCellKey(row, column)
      const existingCell = cellMap.get(key)

      if (!existingCell) {
        cellMap.set(key, {
          row,
          column,
          solution: letter,
          number: index === 0 ? entry.number : undefined,
          entryIds: [entry.id],
        })
        return
      }

      cellMap.set(key, {
        ...existingCell,
        number: existingCell.number ?? (index === 0 ? entry.number : undefined),
        entryIds: existingCell.entryIds.includes(entry.id) ? existingCell.entryIds : [...existingCell.entryIds, entry.id],
      })
    })
  }

  return cellMap
}

export const getInitialActiveEntryId = (entries: Array<CrosswordEntry>): string => entries[0]?.id ?? ''



export const getEntryCells = (entry: CrosswordEntry): Array<ActiveCellDescriptor> =>
  entry.answer.split('').map((_, index) => {
    const row = entry.direction === 'down' ? entry.row + index : entry.row
    const column = entry.direction === 'across' ? entry.column + index : entry.column

    return {
      row,
      column,
      key: getCellKey(row, column),
    }
  })

export const getEntryCompletion = (entry: CrosswordEntry, values: ValueMap): boolean =>
  getEntryCells(entry).every((cell, index) => values[cell.key] === entry.answer[index])

export const getPuzzleCompletion = (entries: Array<CrosswordEntry>, values: ValueMap): boolean =>
  entries.every((entry) => getEntryCompletion(entry, values))

export const getNextCellIndex = (entry: CrosswordEntry, values: ValueMap, fallbackIndex: number): number => {
  const entryCells = getEntryCells(entry)
  const emptyCellIndex = entryCells.findIndex((cell) => !values[cell.key])

  return emptyCellIndex >= 0 ? emptyCellIndex : Math.min(fallbackIndex, entryCells.length - 1)
}

const isFilledValue = (value: string | undefined): value is string => Boolean(value)

export const getCellState = (cell: CrosswordCell, values: ValueMap): { isCorrect: boolean; isIncorrect: boolean } => {
  const value = values[getCellKey(cell.row, cell.column)]

  if (!isFilledValue(value)) {
    return {
      isCorrect: false,
      isIncorrect: false,
    }
  }

  return {
    isCorrect: value === cell.solution,
    isIncorrect: value !== cell.solution,
  }
}

export const getBoardStats = (entries: Array<CrosswordEntry>, cellMap: CellMap, values: ValueMap) => {
  let correctCellCount = 0
  let incorrectCellCount = 0

  for (const cell of cellMap.values()) {
    const { isCorrect, isIncorrect } = getCellState(cell, values)
    if (isCorrect) correctCellCount += 1
    if (isIncorrect) incorrectCellCount += 1
  }

  const completedEntryCount = entries.filter((entry) => getEntryCompletion(entry, values)).length

  return {
    completedEntryCount,
    totalEntryCount: entries.length,
    correctCellCount,
    incorrectCellCount,
    totalCellCount: cellMap.size,
    isComplete: completedEntryCount === entries.length,
  }
}
