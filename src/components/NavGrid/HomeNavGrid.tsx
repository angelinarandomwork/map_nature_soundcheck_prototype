import { useRef, type JSX, type MouseEvent } from 'react'
import { Link } from 'react-router'
import { pageLinks } from './linkData'
import './styles.css'

const CURSOR_SIZE = 24
const OUTLINE_PADDING = 10

export const HomeNavGrid = (): JSX.Element => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  const resetCursor = (): void => {
    const cursorElement = cursorRef.current

    if (!cursorElement) return

    cursorElement.style.opacity = '0'
    cursorElement.style.width = `${CURSOR_SIZE}px`
    cursorElement.style.height = `${CURSOR_SIZE}px`
    cursorElement.style.borderRadius = `${CURSOR_SIZE}px`
  }

  const moveCursorToCard = (
    event: MouseEvent<HTMLAnchorElement> | React.FocusEvent<HTMLAnchorElement>,
  ): void => {
    const cardElement = event.currentTarget
    const gridElement = gridRef.current
    const cursorElement = cursorRef.current

    if (!gridElement || !cursorElement) return

    const cardRect = cardElement.getBoundingClientRect()
    const gridRect = gridElement.getBoundingClientRect()

    const width = cardRect.width + OUTLINE_PADDING
    const height = cardRect.height + OUTLINE_PADDING
    const left = cardRect.left - gridRect.left + cardRect.width / 2
    const top = cardRect.top - gridRect.top + cardRect.height / 2

    cursorElement.style.opacity = '1'
    cursorElement.style.width = `${width}px`
    cursorElement.style.height = `${height}px`
    cursorElement.style.borderRadius = 'calc(var(--radius-4) + 4px)'
    cursorElement.style.left = `${left}px`
    cursorElement.style.top = `${top}px`
  }

  return (
    <div ref={gridRef} className="homeGrid" onMouseLeave={resetCursor}>
      {pageLinks.map((homeLink, index) => (
        <Link
          key={homeLink.to}
          to={homeLink.to}
          className="homeGridCard"
          onMouseEnter={moveCursorToCard}
          onFocus={moveCursorToCard}
          onBlur={resetCursor}
        >
          <span className="homeGridCardMedia" aria-hidden="true">
            <img
              src={homeLink.imageUrl}
              alt={homeLink.imageAlt}
              className="homeGridCardImage"
              loading={index < 2 ? 'eager' : 'lazy'}
              fetchPriority={index < 2 ? 'high' : 'auto'}
              decoding="async"
            />
          </span>

          <span className="homeGridCardOverlay" aria-hidden="true" />

          <span className="homeGridCardContent">
            <span className="homeGridCardTitle">{homeLink.title}</span>
            <span className="homeGridCardText">{homeLink.description}</span>
          </span>
        </Link>
      ))}

      <div ref={cursorRef} className="homeGridCursor" aria-hidden="true" />
    </div>
  )
}