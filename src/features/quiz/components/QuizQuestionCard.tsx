import type { JSX } from 'react'
import { QuizOptionButton } from './QuizOptionButton'
import { QuizResultPanel } from './QuizResultPanel'
import type { QuizQuestionCardProps, QuizStatus } from '../types'
import "../quiz.css"


const getOptionStatus = (
  optionId: string,
  correctOptionId: string,
  selectedOptionId: string | undefined,
  isChecked: boolean,
): QuizStatus => {
  if (isChecked && optionId === correctOptionId) return 'correct'
  if (isChecked && optionId === selectedOptionId && optionId !== correctOptionId) return 'incorrect'
  if (optionId === selectedOptionId) return 'selected'
  return 'idle'
}

export const QuizQuestionCard = ({
  question,
  questionNumber,
  selectedOptionId,
  isChecked,
  isHintVisible,
  onOptionSelect,
  onToggleHint,
}: QuizQuestionCardProps): JSX.Element => {
  const correctAnswerLabel = question.options.find((option) => option.id === question.correctOptionId)?.label ?? ''
  const isCorrectAnswer = selectedOptionId === question.correctOptionId

  return (
    <article className="quizQuestionCard">
      <header className="quizQuestionHeader">
        <span className="quizQuestionNumber">Question {questionNumber}</span>
        <h3 className="quizQuestionPrompt">{question.prompt}</h3>
      </header>

      {question.hint ? (
        <div className="quizHintSection">
          <button
            type="button"
            className="quizHintToggle"
            onClick={onToggleHint}
            aria-expanded={isHintVisible}
            aria-controls={`quiz-hint-${question.id}`}
          >
            {isHintVisible ? 'Hide hint' : 'Hint'}
          </button>

          {isHintVisible ? <div id={`quiz-hint-${question.id}`} className="quizHintPanel">{question.hint}</div> : null}
        </div>
      ) : null}

      <div className="quizOptionList" role="radiogroup" aria-label={question.prompt}>
        {question.options.map((option) => (
          <QuizOptionButton
            key={option.id}
            option={option}
            status={getOptionStatus(option.id, question.correctOptionId, selectedOptionId, isChecked)}
            disabled={isChecked}
            onSelect={onOptionSelect}
          />
        ))}
      </div>

      {isChecked ? (
        <QuizResultPanel answerLabel={correctAnswerLabel} isCorrect={isCorrectAnswer} funFact={question.funFact} />
      ) : null}
    </article>
  )
}
