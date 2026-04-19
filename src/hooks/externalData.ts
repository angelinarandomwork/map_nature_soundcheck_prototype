import { getSearchRadiusKm } from '../lib/formatters'
import {
  buildExternalSourceSummary,
  calculateExternalScore,
  createExternalSummary,
  filterExternalObservationsByTimeRange,
  filterUniqueObservations,
  getApproximateMonthsFromTimeRange,
  getDefaultSearchRadiusKm,
  sortExternalObservations,
} from '../lib/externalObservationUtils'
import type {
  Coordinates,
  External,
  ExternalObservation,
  ExternalSource,
  ExternalSourceSummary,
  TimeRange,
} from '../entities'
import { useGbifObservations } from './Observationdbs/useGbifObservations'
import { useINaturalistObservations } from './Observationdbs/useINaturalistObservations'
import { useXenoCantoObservations } from './Observationdbs/useXenoCantoObservations'

const settleSourceObservations = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<Record<ExternalSource, Array<ExternalObservation>>> => {
  const [xenoResult, inaturalistResult, gbifResult] = await Promise.allSettled([
    useXenoCantoObservations(coordinates),
    useINaturalistObservations(coordinates, timeRange),
    useGbifObservations(coordinates, timeRange),
  ])

  return {
    'xeno-canto': xenoResult.status === 'fulfilled' ? xenoResult.value : [],
    inaturalist: inaturalistResult.status === 'fulfilled' ? inaturalistResult.value : [],
    gbif: gbifResult.status === 'fulfilled' ? gbifResult.value : [],
  }
}

const buildSourceSummaries = (
  sourceObservations: Record<ExternalSource, Array<ExternalObservation>>,
): Array<ExternalSourceSummary> => {
  return (Object.entries(sourceObservations) as Array<[
    ExternalSource,
    Array<ExternalObservation>,
  ]>)
    .map(([source, observationsBySource]) =>
      buildExternalSourceSummary(source, observationsBySource),
    )
    .filter((summary) => summary.observationCount > 0)
    .sort((left, right) => right.observationCount - left.observationCount)
}

const buildFilteredSourceObservations = (
  sourceObservations: Record<ExternalSource, Array<ExternalObservation>>,
  timeRange: TimeRange,
): Record<ExternalSource, Array<ExternalObservation>> => {
  return Object.fromEntries(
    (Object.entries(sourceObservations) as Array<[ExternalSource, Array<ExternalObservation>]>).map(
      ([source, observationsBySource]) => [
        source,
        filterExternalObservationsByTimeRange(observationsBySource, timeRange),
      ],
    ),
  ) as Record<ExternalSource, Array<ExternalObservation>>
}

const buildExternalPayload = (
  coordinates: Coordinates,
  sourceObservations: Record<ExternalSource, Array<ExternalObservation>>,
  timeRange: TimeRange,
): External => {
  const filteredSourceObservations = buildFilteredSourceObservations(sourceObservations, timeRange)
  const observations = sortExternalObservations(
    filterUniqueObservations(Object.values(filteredSourceObservations).flat()),
  )
  const sourceSummaries = buildSourceSummaries(sourceObservations)

  return {
    coordinates,
    score: calculateExternalScore(observations),
    libraries: sourceSummaries.map((summary) => summary.source),
    observations,
    sourceSummaries,
    summary: createExternalSummary(observations, sourceSummaries, getSearchRadiusKm()),
  }
}

export const getExternalDataForCoordinates = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<External> => {
  const sourceObservations = await settleSourceObservations(coordinates, timeRange)

  return buildExternalPayload(coordinates, sourceObservations, timeRange)
}

export const getExternalDataUnavailableSummary = (): string => {
  return 'External biodiversity sources are currently unavailable. Configure an xeno-canto API key and allow direct browser access to iNaturalist and GBIF for this prototype.'
}

export { getApproximateMonthsFromTimeRange, getDefaultSearchRadiusKm }
