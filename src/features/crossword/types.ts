import type { KeyboardEvent } from 'react'

export type CrosswordDirection = 'across' | 'down'
export type CellMap = Map<string, CrosswordCell>
export type ValueMap = Record<string, string>

export type CrosswordEntry = {
  id: string
  number: number
  direction: CrosswordDirection
  clue: string
  answer: string
  row: number
  column: number
}

export type CrosswordCell = {
  row: number
  column: number
  solution: string
  number?: number
  entryIds: Array<string>
}

export type ActiveCellDescriptor = {
  row: number
  column: number
  key: string
}


export type CrosswordLayoutStyleOptions = {
  isCompact: boolean
}

export type ClueSectionsStyleOptions = {
  isStacked: boolean
}

export type BoardStyleOptions = {
  columnCount: number
  isCompact: boolean
}

export type StatusStyleOptions = {
  isComplete: boolean
}

export type CellStyleOptions = {
  isActiveEntryCell: boolean
  isActiveCell: boolean
  isSolvedCell: boolean
  hasIncorrectValue: boolean
}

export type MiniCellStyleOptions = {
  isActive: boolean
  isSolved: boolean
}

export type ClueButtonStyleOptions = {
  isActive: boolean
  isComplete: boolean
}

export type ActiveClueCardProps = {
  entry: CrosswordEntry
  entryCells: Array<{ row: number; column: number; key: string }>
  activeCellIndex: number
  values: ValueMap
  onCellSelect: (cellIndex: number) => void
}

export type ClueSectionProps = {
  title: string
  entries: Array<CrosswordEntry>
  activeEntryId: string
  completedEntryIds: Set<string>
  onEntrySelect: (entryId: string) => void
}

export type CrosswordBoardProps = {
  cellMap: CellMap
  activeEntry: CrosswordEntry
  activeEntryCellKeys: Set<string>
  activeCellKey: string | undefined
  isCompactLayout: boolean
  values: ValueMap
  onCellSelect: (row: number, column: number) => void
  onCellKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}
