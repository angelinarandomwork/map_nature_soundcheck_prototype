import type { KeyboardEvent } from 'react'
import { getDirectionalOffset, getNormalisedLetterKey } from '../shared/letterGame/keyboard'
import type { ActiveCellDescriptor, CrosswordDirection, ValueMap } from './types'

const isEntryNavigationKey = (key: string, direction: CrosswordDirection): boolean => {
  if(direction === 'across') return key === 'ArrowLeft' || key === 'ArrowRight'
  return key === 'ArrowUp' || key === 'ArrowDown'
}

export type CrosswordKeyboardDependencies = {
  event: KeyboardEvent<HTMLInputElement>
  direction: CrosswordDirection
  activeCellIndex: number
  activeEntryCells: ActiveCellDescriptor[]
  values: ValueMap
  moveWithinEntry: (offset: number) => void
  clearCurrentCell: () => void
  setActiveCellIndex: (index: number) => void
  clearCellByKey: (cellKey: string) => void
  setCellValue: (letter: string) => void
}

export const handleCrosswordCellKeyDown = ({
  event,
  direction,
  activeCellIndex,
  activeEntryCells,
  values,
  moveWithinEntry,
  clearCurrentCell,
  setActiveCellIndex,
  clearCellByKey,
  setCellValue,
}: CrosswordKeyboardDependencies): void => {
  if(isEntryNavigationKey(event.key, direction)) {
    const directionalOffset = getDirectionalOffset(event.key)
    if(directionalOffset === null) return

    event.preventDefault()
    moveWithinEntry(directionalOffset)
    return
  }

  if(event.key === 'Backspace') {
    event.preventDefault()
    const currentCell = activeEntryCells[activeCellIndex]
    if(!currentCell) return

    if(values[currentCell.key]) {
      clearCurrentCell()
      return
    }

    const previousCellIndex = Math.max(activeCellIndex - 1, 0)
    const previousCell = activeEntryCells[previousCellIndex]
    if(!previousCell) return

    setActiveCellIndex(previousCellIndex)
    clearCellByKey(previousCell.key)
    return
  }

  const letter = getNormalisedLetterKey(event.key)
  if(!letter) return

  event.preventDefault()
  setCellValue(letter)
}
