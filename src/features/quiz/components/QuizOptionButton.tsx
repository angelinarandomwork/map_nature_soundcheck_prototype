import type { JSX } from 'react'
import type { QuizOptionButtonProps, QuizStatus } from '../types'


const getOptionClassName = (status: QuizStatus): string => {
  const classNames = ['quizOption']

  if (status === 'selected') classNames.push('quizOption-selected')
  if (status === 'correct') classNames.push('quizOption-correct')
  if (status === 'incorrect') classNames.push('quizOption-incorrect')

  return classNames.join(' ')
}

export const QuizOptionButton = ({ option, status, disabled, onSelect }: QuizOptionButtonProps): JSX.Element => {
  return (
    <button
      type="button"
      className={getOptionClassName(status)}
      onClick={() => onSelect(option.id)}
      aria-pressed={status === 'selected' || status === 'incorrect'}
      disabled={disabled}
    >
      <span className="quizOptionBullet" aria-hidden="true" />
      <span className="quizOptionLabel">{option.label}</span>
    </button>
  )
}
