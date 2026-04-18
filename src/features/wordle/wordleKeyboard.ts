import { createLinearLetterKeyboardAction } from '../shared/letterGame/keyboard'
import type { WordleKeyboardAction } from './types'

export const getWordleKeyboardAction = (key: string): WordleKeyboardAction => createLinearLetterKeyboardAction(key)
