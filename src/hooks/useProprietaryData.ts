import { useMemo } from 'react'
import { getProprietaryDataPointById, listProprietaryDataPoints } from '../lib/proprietarySelectors'
import type { Proprietary, TimeRange } from '../entities'

export const useProprietary = (): Array<Proprietary> => {
  return useMemo(() => listProprietaryDataPoints(), [])
}

export const useProprietaryPoint = (
  proprietaryId: string | null,
  timeRange: TimeRange,
): Proprietary | null => {
  return useMemo(() => {
    if (!proprietaryId) return null

    return getProprietaryDataPointById(proprietaryId, timeRange)
  }, [proprietaryId, timeRange])
}
