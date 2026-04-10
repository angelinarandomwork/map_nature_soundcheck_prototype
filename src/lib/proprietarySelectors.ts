import proprietaryDataset from '../data/sounds_A'
import type { Proprietary, ProprietaryObservation, TimeRange } from '../types/data'
import { filterRecordsByTimeWindow } from './timeRange'

export const sortObservationsByTimestamp = (
  observations: ProprietaryObservation[],
): ProprietaryObservation[] => {
  return [...observations].sort(
    (left, right) => right.timestamp - left.timestamp,
  )
}

const filterObservationsByTimeRange = (
  observations: ProprietaryObservation[],
  timeRange: TimeRange,
): ProprietaryObservation[] => {
  return sortObservationsByTimestamp(
    filterRecordsByTimeWindow(
      observations,
      timeRange,
      (observation) => observation.timestamp,
    ),
  )
}

export const listProprietaryDataPoints = (): Proprietary[] => {
  return proprietaryDataset.map((dataPoint) => ({
    ...dataPoint,
    observations: sortObservationsByTimestamp(dataPoint.observations),
  }))
}

export const filterProprietaryDataPointsByTimeRange = (
  proprietaryDataPoints: Proprietary[],
  timeRange: TimeRange,
): Proprietary[] => {
  return proprietaryDataPoints
    .map((dataPoint) => ({
      ...dataPoint,
      observations: filterObservationsByTimeRange(dataPoint.observations, timeRange),
    }))
    .filter((dataPoint) => dataPoint.observations.length > 0)
}

export const getProprietaryDataPointById = (
  proprietaryId: string,
  timeRange: TimeRange,
): Proprietary | null => {
  const proprietaryDataPoint = proprietaryDataset.find(
    (item) => item.id === proprietaryId,
  )

  if (!proprietaryDataPoint) {
    return null
  }

  return {
    ...proprietaryDataPoint,
    observations: filterObservationsByTimeRange(
      proprietaryDataPoint.observations,
      timeRange,
    ),
  }
}
