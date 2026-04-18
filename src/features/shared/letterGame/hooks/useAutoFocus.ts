import { useEffect } from 'react'
import type { RefObject } from 'react'

export const useAutoFocus = <TElement extends HTMLElement>(elementRef: RefObject<TElement | null>, dependencies: readonly unknown[]): void => {
  useEffect(() => {
    elementRef.current?.focus()
  }, dependencies)
}
