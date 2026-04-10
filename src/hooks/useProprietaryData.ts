import { useMemo } from 'react'
import type { Proprietary, TimeRange } from '../types/data'
import {
  getProprietaryDataPointById,
  listProprietaryDataPoints,
} from '../lib/proprietarySelectors'

export const useProprietaryData = (): Proprietary[] => {
  return useMemo(() => listProprietaryDataPoints(), [])
}

export const useProprietaryDataPoint = (
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
