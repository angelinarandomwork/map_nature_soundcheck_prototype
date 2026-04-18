import type { SharedLetterKeyboardAction } from './types'

export const isSingleLetterKey = (key: string): boolean => /^[a-z]$/i.test(key)

export const getNormalisedLetterKey = (key: string): string | null => {
  if(!isSingleLetterKey(key)) return null
  return key.toLowerCase()
}

export const getDirectionalOffset = (key: string): number | null => {
  if(key === 'ArrowLeft' || key === 'ArrowUp') return -1
  if(key === 'ArrowRight' || key === 'ArrowDown') return 1
  return null
}

export const createLinearLetterKeyboardAction = (key: string): SharedLetterKeyboardAction => {
  const directionalOffset = getDirectionalOffset(key)
  if(directionalOffset !== null) return { type: 'move-cursor', offset: directionalOffset }

  const normalisedLetterKey = getNormalisedLetterKey(key)
  if(normalisedLetterKey) return { type: 'append-letter', letter: normalisedLetterKey }
  if(key === 'Backspace' || key === 'Delete') return { type: 'remove-letter' }
  if(key === 'Enter') return { type: 'submit-row' }
  return { type: 'noop' }
}
