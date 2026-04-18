import type { JSX } from 'react'
import type { QuizProgressProps } from '../types'


export const QuizProgress = ({ percentage }: QuizProgressProps): JSX.Element => {
  return (
    <div className="quizProgress" aria-label="Quiz progress">
      <div className="quizProgressTrack">
        <div className="quizProgressFill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}
