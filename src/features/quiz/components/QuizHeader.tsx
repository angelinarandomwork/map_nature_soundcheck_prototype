import type { JSX } from 'react'
import type { QuizHeaderProps } from '../types'

export const QuizHeader = ({
  currentQuestionIndex,
  totalQuestions,
  score,
  answeredCount,
  isComplete,
}: QuizHeaderProps): JSX.Element => {
  const progressLabel = isComplete ? `Completed ${totalQuestions}/${totalQuestions}` : `${currentQuestionIndex + 1}/${totalQuestions}`
  const scoreLabel = isComplete ? `Score: ${score}/${totalQuestions}` : `Score: ${score}/${answeredCount}`
  const intro = isComplete
    ? 'You have completed the guided quiz.'
    : 'Answer one question at a time, reveal hints when needed, and check each answer before moving on.'

  return (
    <div className="quizGameHeader">
      <div>
        <h2 id="quiz-heading" className="quizGameTitle">
          Sound and Nature Quiz
        </h2>
        <p className="quizGameIntro">{intro}</p>
      </div>

      <div className="quizGameMeta">
        <span className="quizGameMetaPill">{progressLabel}</span>
        <span className="quizGameMetaPill quizGameMetaPill-score">{scoreLabel}</span>
      </div>
    </div>
  )
}
