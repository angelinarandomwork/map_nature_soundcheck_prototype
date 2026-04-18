import type { CSSProperties } from 'react'
import { getSharedCompletionStatusStyle, getSharedLetterCellStyle, letterGameTheme } from '../shared/letterGame/styles'
import type { BoardStyleOptions, CellStyleOptions, ClueButtonStyleOptions, ClueSectionsStyleOptions, CrosswordLayoutStyleOptions, MiniCellStyleOptions, StatusStyleOptions } from './types'

export const styles = {
    crosswordGame: {
        display: 'grid',
        gap: '16px',
    } satisfies CSSProperties,
    crosswordHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '12px',
        alignItems: 'center',
        flexWrap: 'wrap',
    } satisfies CSSProperties,
    crosswordHeaderBlock: {
        display: 'grid',
        gap: '4px',
    } satisfies CSSProperties,
    crosswordEyebrow: {
        fontSize: '12px',
        lineHeight: '16px',
        opacity: 0.72,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
    } satisfies CSSProperties,
    crosswordTitle: {
        fontSize: '22px',
        lineHeight: '30px',
        fontWeight: 600,
    } satisfies CSSProperties,
    crosswordSpacerCell: {
        width: '36px',
        height: '36px',
        background: 'transparent',
    } satisfies CSSProperties,
    crosswordCellNumber: {
        position: 'absolute',
        top: '3px',
        left: '4px',
        fontSize: '10px',
        lineHeight: 1,
    } satisfies CSSProperties,
    crosswordCellInput: {
        width: '100%',
        height: '100%',
        border: 0,
        outline: 0,
        background: 'transparent',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: '20px',
        lineHeight: 1,
        padding: 0,
        caretColor: 'transparent',
    } satisfies CSSProperties,
    crosswordSidebar: {
        display: 'grid',
        gap: '14px',
        minWidth: 0,
    } satisfies CSSProperties,
    crosswordActiveClueCard: {
        display: 'grid',
        gap: '10px',
        padding: '14px',
        border: 'var(--border-default)',
        borderRadius: 'var(--radius-6)',
        background: letterGameTheme.interactiveBackground,
    } satisfies CSSProperties,
    crosswordActiveClueMeta: {
        fontSize: '12px',
        lineHeight: '16px',
        opacity: 0.72,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
    } satisfies CSSProperties,
    crosswordActiveClueText: {
        fontSize: '14px',
        lineHeight: '20px',
    } satisfies CSSProperties,
    crosswordActiveClueAnswer: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
    } satisfies CSSProperties,
    crosswordClueSection: {
        display: 'grid',
        gap: '8px',
        minWidth: 0,
    } satisfies CSSProperties,
    crosswordClueHeading: {
        fontSize: '13px',
        lineHeight: '18px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
    } satisfies CSSProperties,
    crosswordClueList: {
        display: 'grid',
        gap: '8px',
    } satisfies CSSProperties,
    crosswordClueNumber: {
        fontWeight: 600,
    } satisfies CSSProperties,
    crosswordClueText: {
        fontSize: '13px',
        lineHeight: '18px',
    } satisfies CSSProperties,
    crosswordActions: {
        display: 'flex',
        justifyContent: 'flex-start',
    } satisfies CSSProperties,
    resetButton: {
        minWidth: '112px',
        borderRadius: 'var(--radius-4)',
        textTransform: 'none',
        background: letterGameTheme.interactiveBackground,
        color: 'inherit',
        border: 'var(--border-default)',
        boxShadow: 'none',
    } satisfies CSSProperties,
} as const

export const getCrosswordLayoutStyle = ({ isCompact }: CrosswordLayoutStyleOptions): CSSProperties => ({
    display: 'grid',
    gap: '20px',
    gridTemplateColumns: isCompact ? '1fr' : 'minmax(0, auto) minmax(420px, 1fr)',
    alignItems: 'start',
})

export const getBoardStyle = ({ columnCount, isCompact }: BoardStyleOptions): CSSProperties => ({
    display: 'grid',
    gap: '6px',
    width: 'fit-content',
    background: 'transparent',
    gridTemplateColumns: `repeat(${columnCount}, 40px)`,
    ...(isCompact ? { maxWidth: '100%', overflowX: 'auto' } : {}),
})

export const getStatusStyle = ({ isComplete }: StatusStyleOptions): CSSProperties => getSharedCompletionStatusStyle(isComplete)

export const getCellStyle = ({
    isActiveEntryCell,
    isActiveCell,
    isSolvedCell,
    hasIncorrectValue,
}: CellStyleOptions): CSSProperties => ({
    width: '36px',
    height: '36px',
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    cursor: 'pointer',
    ...getSharedLetterCellStyle({
        isActiveRow: isActiveEntryCell,
        isActiveCell,
        isCorrect: isSolvedCell,
        isPresent: hasIncorrectValue,
        isAbsent: false,
    }),
})

export const getMiniCellStyle = ({ isActive, isSolved }: MiniCellStyleOptions): CSSProperties => ({
    width: '32px',
    height: '32px',
    display: 'grid',
    placeItems: 'center',
    textTransform: 'uppercase',
    cursor: 'pointer',
    ...getSharedLetterCellStyle({
        isActiveRow: false,
        isActiveCell: isActive,
        isCorrect: isSolved,
        isPresent: false,
        isAbsent: false,
    }),
})

export const getClueSectionsStyle = ({ isStacked }: ClueSectionsStyleOptions): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: isStacked ? '1fr' : 'repeat(2, minmax(0, 1fr))',
    gap: '12px',
    alignItems: 'start',
})

export const getClueButtonStyle = ({ isActive, isComplete }: ClueButtonStyleOptions): CSSProperties => ({
    display: 'grid',
    gridTemplateColumns: '24px 1fr',
    gap: '8px',
    alignItems: 'start',
    width: '100%',
    padding: '8px 10px',
    border: 'var(--border-default)',
    borderRadius: 'var(--radius-4)',
    background: isComplete ? 'rgba(55,160,123,0.18)' : letterGameTheme.interactiveBackground,
    textAlign: 'left',
    cursor: 'pointer',
    outline: isActive ? letterGameTheme.activeOutline : 'none',
})
