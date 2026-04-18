export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  options: Array<QuizOption>
  correctOptionId: string
  funFact: string
  hint?: string
}

export type AnswersByQuestionId = Record<string, string>
export type CheckedQuestionIds = Record<string, boolean>
export type HintVisibilityByQuestionId = Record<string, boolean>

export type QuizState = {
  answersByQuestionId: AnswersByQuestionId
  checkedQuestionIds: CheckedQuestionIds
  hintVisibilityByQuestionId: HintVisibilityByQuestionId
  currentQuestionIndex: number
}

export type QuizStatus = 'idle' | 'selected' | 'correct' | 'incorrect'

export type QuizSummary = {
  score: number
  answeredCount: number
  isComplete: boolean
}

export type QuizQuestionViewModel = {
  selectedOptionId?: string
  isChecked: boolean
  isHintVisible: boolean
  isLastQuestion: boolean
}

export type QuizActionsProps = {
  canGoBack: boolean
  canCheckAnswer: boolean
  isChecked: boolean
  isLastQuestion: boolean
  onPrevious: () => void
  onCheckAnswer: () => void
  onNext: () => void
  onReset: () => void
}

export type QuizCompletionCardProps = {
  score: number
  totalQuestions: number
}

export type QuizHeaderProps = {
  currentQuestionIndex: number
  totalQuestions: number
  score: number
  answeredCount: number
  isComplete: boolean
}

export type QuizOptionButtonProps = {
  option: QuizOption
  status: QuizStatus
  disabled: boolean
  onSelect: (optionId: string) => void
}

export type QuizProgressProps = {
  percentage: number
}

export type QuizQuestionCardProps = {
  question: QuizQuestion
  questionNumber: number
  selectedOptionId?: string
  isChecked: boolean
  isHintVisible: boolean
  onOptionSelect: (optionId: string) => void
  onToggleHint: () => void
}

export type QuizResultPanelProps = {
  answerLabel: string
  isCorrect: boolean
  funFact: string
}
