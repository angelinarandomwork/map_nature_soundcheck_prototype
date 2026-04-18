import type { JSX } from 'react'
import type { QuizResultPanelProps } from '../types'


export const QuizResultPanel = ({ answerLabel, isCorrect, funFact }: QuizResultPanelProps): JSX.Element => {
  return (
    <div className="quizQuestionResult quizQuestionResult-visible">
      <p className="quizQuestionAnswer">
        <strong>{isCorrect ? 'Correct:' : 'Incorrect:'}</strong> {answerLabel}
      </p>
      <p className="quizQuestionFact">
        <strong>Fun Fact:</strong> {funFact}
      </p>
    </div>
  )
}
