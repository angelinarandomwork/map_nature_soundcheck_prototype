import { getExternalDataForCoordinates } from '../lib/mockData'
import type { Coordinates, External, TimeRange } from '../types/data'

export const useBiodiversityData = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<External> => {
  return getExternalDataForCoordinates(coordinates, timeRange)
}