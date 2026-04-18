import { useMemo, useReducer, useRef, type JSX, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { WORD_BANK } from './data'
import { gameContainerStyle } from './styles'
import { StatusBanner, PlayAgainButton } from './StatusBanner'
import { WordleBoard } from './WordleBoard'
import { WordleKeyboardPreview } from './WordleKeyboardPreview'
import { createInitialState, appendLetterToState, getKeyboardLetterState, moveCursorInState, removeLetterFromState, selectRandomWord, submitActiveRow } from './wordleLogic'
import { getWordleKeyboardAction } from './wordleKeyboard'
import { useAutoFocus } from '../shared/letterGame/hooks/useAutoFocus'
import type { WordleAction, WordleState } from './types'

const createRandomAnswer = (): string => selectRandomWord(WORD_BANK)

const wordleReducer = (state: WordleState, action: WordleAction): WordleState => {
  if(action.type === 'append-letter') return appendLetterToState(state, action.letter)
  if(action.type === 'remove-letter') return removeLetterFromState(state)
  if(action.type === 'submit-row') return submitActiveRow(state)
  if(action.type === 'move-cursor') return moveCursorInState(state, action.offset)
  if(action.type === 'reset-game') return createInitialState(action.answer)
  return state
}

export const WordleGame = (): JSX.Element => {
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [state, dispatch] = useReducer(wordleReducer, undefined, () => createInitialState(createRandomAnswer()))

  useAutoFocus(boardRef, [state.answer])

  const keyboardState = useMemo(() => getKeyboardLetterState(state.rows), [state.rows])

  const handleBoardFocus = (): void => {
    boardRef.current?.focus()
  }

  const handleBoardKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>): void => {
    const keyboardAction = getWordleKeyboardAction(event.key)
    if(keyboardAction.type === 'noop') return

    event.preventDefault()
    dispatch(keyboardAction)
  }

  const handleResetGame = (): void => {
    dispatch({ type: 'reset-game', answer: createRandomAnswer() })
  }

  return (
    <div style={gameContainerStyle}>
      <WordleBoard
        rows={state.rows}
        activeRowIndex={state.activeRowIndex}
        cursorIndex={state.cursorIndex}
        boardRef={boardRef}
        onBoardKeyDown={handleBoardKeyDown}
        onBoardFocus={handleBoardFocus}
      />

      <StatusBanner status={state.status} answer={state.answer} />
      <WordleKeyboardPreview keyboardState={keyboardState} />
      <PlayAgainButton onClick={handleResetGame} />
    </div>
  )
}
