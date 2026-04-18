import { useMemo } from 'react'

import type { Proprietary, TimeRange } from '../entities'
import { getProprietaryDataPointById, listProprietaryDataPoints } from '../lib/proprietarySelectors'

export const useProprietary = (): Array<Proprietary> => {
  return useMemo(() => listProprietaryDataPoints(), [])
}

export const useProprietaryPoint = (
  proprietaryId: string | null,
  timeRange: TimeRange,
): Proprietary | null => {
  return useMemo(() => {
    if (!proprietaryId) {
      return null
    }

    return getProprietaryDataPointById(proprietaryId, timeRange)
  }, [proprietaryId, timeRange])
}
