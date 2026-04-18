import { getExternalDataForCoordinates } from './externalData'
import type { Coordinates, TimeRange, External } from '../entities'

export const useBiodiversityData = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<External> => {
  return getExternalDataForCoordinates(coordinates, timeRange)
}