import { useMemo, useState } from 'react'
import type { QuizQuestion, QuizState, QuizSummary, QuizQuestionViewModel } from '../types'

const createInitialState = (): QuizState => ({
  answersByQuestionId: {},
  checkedQuestionIds: {},
  hintVisibilityByQuestionId: {},
  currentQuestionIndex: 0,
})

const getScore = (questions: Array<QuizQuestion>, answersByQuestionId: QuizState['answersByQuestionId']): number => {
  return questions.reduce((score, question) => {
    if (answersByQuestionId[question.id] === question.correctOptionId) return score + 1
    return score
  }, 0)
}

export const useQuizGame = (questions: Array<QuizQuestion>) => {
  const [state, setState] = useState<QuizState>(createInitialState)

  const currentQuestion = questions[state.currentQuestionIndex]

  const questionViewModel = useMemo<QuizQuestionViewModel>(() => ({
    selectedOptionId: state.answersByQuestionId[currentQuestion.id],
    isChecked: Boolean(state.checkedQuestionIds[currentQuestion.id]),
    isHintVisible: Boolean(state.hintVisibilityByQuestionId[currentQuestion.id]),
    isLastQuestion: state.currentQuestionIndex === questions.length - 1,
  }), [currentQuestion.id, questions.length, state.answersByQuestionId, state.checkedQuestionIds, state.currentQuestionIndex, state.hintVisibilityByQuestionId])

  const summary = useMemo<QuizSummary>(() => {
    const answeredCount = Object.keys(state.checkedQuestionIds).length

    return {
      score: getScore(questions, state.answersByQuestionId),
      answeredCount,
      isComplete: answeredCount === questions.length,
    }
  }, [questions, state.answersByQuestionId, state.checkedQuestionIds])

  const progressPercentage = useMemo(() => {
    return ((state.currentQuestionIndex + 1) / questions.length) * 100
  }, [questions.length, state.currentQuestionIndex])

  const selectOption = (optionId: string) => {
    if (questionViewModel.isChecked) return

    setState((currentState) => ({
      ...currentState,
      answersByQuestionId: {
        ...currentState.answersByQuestionId,
        [currentQuestion.id]: optionId,
      },
    }))
  }

  const checkAnswer = () => {
    if (!questionViewModel.selectedOptionId) return

    setState((currentState) => ({
      ...currentState,
      checkedQuestionIds: {
        ...currentState.checkedQuestionIds,
        [currentQuestion.id]: true,
      },
    }))
  }

  const toggleHint = () => {
    setState((currentState) => ({
      ...currentState,
      hintVisibilityByQuestionId: {
        ...currentState.hintVisibilityByQuestionId,
        [currentQuestion.id]: !currentState.hintVisibilityByQuestionId[currentQuestion.id],
      },
    }))
  }

  const goToNextQuestion = () => {
    if (!questionViewModel.isChecked || questionViewModel.isLastQuestion) return

    setState((currentState) => ({
      ...currentState,
      currentQuestionIndex: currentState.currentQuestionIndex + 1,
    }))
  }

  const goToPreviousQuestion = () => {
    if (state.currentQuestionIndex === 0) return

    setState((currentState) => ({
      ...currentState,
      currentQuestionIndex: currentState.currentQuestionIndex - 1,
    }))
  }

  const resetQuiz = () => {
    setState(createInitialState())
  }

  return {
    currentQuestion,
    currentQuestionIndex: state.currentQuestionIndex,
    progressPercentage,
    questionViewModel,
    summary,
    actions: {
      checkAnswer,
      goToNextQuestion,
      goToPreviousQuestion,
      resetQuiz,
      selectOption,
      toggleHint,
    },
  }
}
