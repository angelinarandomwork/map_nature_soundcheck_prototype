import { MAX_GUESSES, WORD_LENGTH } from './data'
import type { EvaluatedGuess, EvaluatedLetter, KeyboardLetterState, LetterResult, WordleRow, WordleState } from './types'

const createEmptyRow = (): WordleRow => ({
  letters: Array.from({ length: WORD_LENGTH }, () => ''),
  evaluation: Array.from({ length: WORD_LENGTH }, () => undefined),
  isSubmitted: false,
})

const createRows = (): Array<WordleRow> => Array.from({ length: MAX_GUESSES }, createEmptyRow)

export const selectRandomWord = (words: Array<string>): string => {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

export const createInitialState = (answer: string): WordleState => ({
  rows: createRows(),
  activeRowIndex: 0,
  cursorIndex: 0,
  status: 'playing',
  answer,
})

export const isRowComplete = (row: WordleRow): boolean => row.letters.every((letter) => letter.length === 1)

export const getRowRawGuess = (row: WordleRow): string => row.letters.join('')

export const evaluateGuess = (guess: string, answer: string): Array<LetterResult> => {
  const result: Array<LetterResult> = Array.from({ length: guess.length }, () => 'absent')
  const answerLetters = answer.split('')

  for(let index = 0; index < guess.length; index += 1) {
    if(guess[index] !== answer[index]) continue
    result[index] = 'correct'
    answerLetters[index] = ''
  }

  for(let index = 0; index < guess.length; index += 1) {
    if(result[index] === 'correct') continue
    const matchIndex = answerLetters.indexOf(guess[index])
    if(matchIndex < 0) continue
    result[index] = 'present'
    answerLetters[matchIndex] = ''
  }

  return result
}

export const buildEvaluatedGuess = (row: WordleRow): EvaluatedGuess => ({
  raw: getRowRawGuess(row),
  letters: row.letters.map((letter, index): EvaluatedLetter => ({
    letter,
    state: row.evaluation[index] ?? 'absent',
  })),
})

const getFirstEmptyIndex = (letters: Array<string>): number => letters.findIndex((letter) => letter === '')

const getFilledLetterCount = (letters: Array<string>): number => letters.filter((letter) => letter !== '').length

const getBoundedCursorIndex = (cursorIndex: number): number => Math.max(0, Math.min(cursorIndex, WORD_LENGTH))

const getRowForCursorUpdate = (state: WordleState): WordleRow | undefined => {
  if(state.status !== 'playing') return undefined
  if(state.activeRowIndex >= MAX_GUESSES) return undefined
  return state.rows[state.activeRowIndex]
}

export const appendLetterToState = (state: WordleState, letter: string): WordleState => {
  const activeRow = getRowForCursorUpdate(state)
  if(!activeRow) return state

  const firstEmptyIndex = getFirstEmptyIndex(activeRow.letters)
  if(firstEmptyIndex < 0 && state.cursorIndex >= WORD_LENGTH) return state

  const targetIndex = state.cursorIndex < WORD_LENGTH
    ? state.cursorIndex
    : firstEmptyIndex

  if(targetIndex < 0 || targetIndex >= WORD_LENGTH) return state

  const nextRows = state.rows.map((row, rowIndex) => {
    if(rowIndex !== state.activeRowIndex) return row
    const nextLetters = row.letters.map((cellLetter, cellIndex) => cellIndex === targetIndex ? letter : cellLetter)
    return {
      ...row,
      letters: nextLetters,
    }
  })

  return {
    ...state,
    rows: nextRows,
    cursorIndex: Math.min(targetIndex + 1, WORD_LENGTH),
  }
}

export const removeLetterFromState = (state: WordleState): WordleState => {
  const activeRow = getRowForCursorUpdate(state)
  if(!activeRow) return state

  const filledLetterCount = getFilledLetterCount(activeRow.letters)
  if(filledLetterCount === 0) return state

  const nextCellIndex = state.cursorIndex > 0 ? state.cursorIndex - 1 : filledLetterCount - 1
  if(nextCellIndex < 0 || nextCellIndex >= WORD_LENGTH) return state

  const nextRows = state.rows.map((row, rowIndex) => {
    if(rowIndex !== state.activeRowIndex) return row
    const nextLetters = row.letters.map((cellLetter, cellIndex) => cellIndex === nextCellIndex ? '' : cellLetter)
    return {
      ...row,
      letters: nextLetters,
    }
  })

  return {
    ...state,
    rows: nextRows,
    cursorIndex: nextCellIndex,
  }
}

export const moveCursorInState = (state: WordleState, offset: number): WordleState => {
  const activeRow = getRowForCursorUpdate(state)
  if(!activeRow) return state

  const maxCursorIndex = Math.min(getFilledLetterCount(activeRow.letters), WORD_LENGTH)
  const nextCursorIndex = Math.max(0, Math.min(state.cursorIndex + offset, maxCursorIndex))
  if(nextCursorIndex === state.cursorIndex) return state

  return {
    ...state,
    cursorIndex: nextCursorIndex,
  }
}

export const submitActiveRow = (state: WordleState): WordleState => {
  if(state.status !== 'playing') return state
  if(state.activeRowIndex >= MAX_GUESSES) return state

  const activeRow = state.rows[state.activeRowIndex]
  if(!isRowComplete(activeRow)) return state

  const rawGuess = getRowRawGuess(activeRow)
  const evaluation = evaluateGuess(rawGuess, state.answer)
  const nextRows = state.rows.map((row, rowIndex) => rowIndex === state.activeRowIndex ? {
    ...row,
    evaluation,
    isSubmitted: true,
  } : row)

  if(rawGuess === state.answer) {
    return {
      ...state,
      rows: nextRows,
      status: 'won',
      cursorIndex: WORD_LENGTH,
    }
  }

  const nextActiveRowIndex = state.activeRowIndex + 1
  if(nextActiveRowIndex >= MAX_GUESSES) {
    return {
      ...state,
      rows: nextRows,
      status: 'lost',
      activeRowIndex: MAX_GUESSES,
      cursorIndex: WORD_LENGTH,
    }
  }

  return {
    ...state,
    rows: nextRows,
    activeRowIndex: nextActiveRowIndex,
    cursorIndex: 0,
  }
}

export const getKeyboardLetterState = (rows: Array<WordleRow>): KeyboardLetterState => {
  const priority: Record<LetterResult, number> = {
    absent: 1,
    present: 2,
    correct: 3,
  }

  return rows.reduce<KeyboardLetterState>((keyboardState, row) => {
    if(!row.isSubmitted) return keyboardState

    row.letters.forEach((letter, index) => {
      const result = row.evaluation[index]
      if(!result) return
      const previousState = keyboardState[letter]
      if(previousState && priority[previousState] >= priority[result]) return
      keyboardState[letter] = result
    })

    return keyboardState
  }, {})
}

export const getSubmittedGuesses = (rows: Array<WordleRow>): Array<EvaluatedGuess> => rows
  .filter((row) => row.isSubmitted)
  .map(buildEvaluatedGuess)

export const getCurrentGuess = (state: WordleState): string => {
  if(state.activeRowIndex >= MAX_GUESSES) return ''
  return getRowRawGuess(state.rows[state.activeRowIndex])
}

export const getNextPlayableCursorIndex = (row: WordleRow): number => {
  const firstEmptyIndex = getFirstEmptyIndex(row.letters)
  if(firstEmptyIndex >= 0) return firstEmptyIndex
  return getBoundedCursorIndex(WORD_LENGTH)
}
