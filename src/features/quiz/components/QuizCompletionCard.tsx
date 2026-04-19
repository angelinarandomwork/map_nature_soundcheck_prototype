import type { JSX } from 'react'
import type { QuizCompletionCardProps } from '../types'


export const QuizCompletionCard = ({ score, totalQuestions }: QuizCompletionCardProps): JSX.Element => {
  return (
    <article className="quizQuestionCard quizQuestionCard-summary">
      <header className="quizQuestionHeader">
        <span className="quizQuestionNumber">Quiz complete</span>
        <h3 className="quizQuestionPrompt">Final result</h3>
      </header>

      <div className="quizQuestionResult quizQuestionResult-visible">
        <p className="quizQuestionAnswer">
          <strong>Score:</strong> {score} out of {totalQuestions}
        </p>
        <p className="quizQuestionFact">
          <strong>Checked answers:</strong> Fantastic! 
        </p>
      </div>
    </article>
  )
}
