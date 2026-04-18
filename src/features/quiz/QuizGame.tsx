import type { JSX } from 'react'
import { AppButton } from '../shared/ui/components/AppButton'
import { quizQuestions } from './quizData'
import { useQuizGame } from './hooks/useQuizGame'
import { QuizActions } from './components/QuizActions'
import { QuizCompletionCard } from './components/QuizCompletionCard'
import { QuizHeader } from './components/QuizHeader'
import { QuizProgress } from './components/QuizProgress'
import { QuizQuestionCard } from './components/QuizQuestionCard'
import './quiz.css'

export const QuizGame = (): JSX.Element => {
  const { currentQuestion, currentQuestionIndex, progressPercentage, questionViewModel, summary, actions } = useQuizGame(quizQuestions)

  if (summary.isComplete) {
    return (
      <section className="quizGame" aria-labelledby="quiz-heading">
        <QuizHeader
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.length}
          score={summary.score}
          answeredCount={summary.answeredCount}
          isComplete
        />

        <QuizProgress percentage={100} />
        <QuizCompletionCard score={summary.score} totalQuestions={quizQuestions.length} />

        <div className="quizGameActions">
          <AppButton
            label="Restart Quiz"
            variant="peachy"
            onClick={actions.resetQuiz}
            className="quizActionButton"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="quizGame" aria-labelledby="quiz-heading">
      <QuizHeader
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={quizQuestions.length}
        score={summary.score}
        answeredCount={summary.answeredCount}
        isComplete={false}
      />

      <QuizProgress percentage={progressPercentage} />

      <QuizQuestionCard
        question={currentQuestion}
        questionNumber={currentQuestionIndex + 1}
        selectedOptionId={questionViewModel.selectedOptionId}
        isChecked={questionViewModel.isChecked}
        isHintVisible={questionViewModel.isHintVisible}
        onOptionSelect={actions.selectOption}
        onToggleHint={actions.toggleHint}
      />

      <QuizActions
        canGoBack={currentQuestionIndex > 0}
        canCheckAnswer={Boolean(questionViewModel.selectedOptionId)}
        isChecked={questionViewModel.isChecked}
        isLastQuestion={questionViewModel.isLastQuestion}
        onPrevious={actions.goToPreviousQuestion}
        onCheckAnswer={actions.checkAnswer}
        onNext={actions.goToNextQuestion}
        onReset={actions.resetQuiz}
      />
    </section>
  )
}
