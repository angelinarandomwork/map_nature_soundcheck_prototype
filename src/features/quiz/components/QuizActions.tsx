import type { JSX } from 'react'
import { AppButton } from '../../shared/ui/components/AppButton'
import type { QuizActionsProps } from '../types'

export const QuizActions = ({
  canGoBack,
  canCheckAnswer,
  isChecked,
  isLastQuestion,
  onPrevious,
  onCheckAnswer,
  onNext,
  onReset,
}: QuizActionsProps): JSX.Element => {
  return (
    <div className="quizGameActions">
      <AppButton
        label="Previous"
        variant="peachy"
        onClick={onPrevious}
        disabled={!canGoBack}
        className="quizActionButton"
      />

      {!isChecked ? (
        <AppButton
          label="Check Answer"
          variant="greenish"
          onClick={onCheckAnswer}
          disabled={!canCheckAnswer}
          className="quizActionButton"
        />
      ) : (
        <AppButton
          label={isLastQuestion ? 'Complete Quiz' : 'Next Question'}
          variant="blueish"
          onClick={onNext}
          disabled={isLastQuestion}
          className="quizActionButton"
        />
      )}

      <AppButton
        label="Reset Quiz"
        variant="peachy"
        onClick={onReset}
        className="quizActionButton"
      />
    </div>
  )
}
