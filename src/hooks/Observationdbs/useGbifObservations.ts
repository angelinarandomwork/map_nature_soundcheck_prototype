import { fetchJson } from '../../lib/fetcher'
import { MAX_OBSERVATIONS_PER_SOURCE, toIsoDate, getSearchRadiusKm } from '../../lib/formatters'
import { buildGbifGeometry, normaliseGBIFOccurrences } from '../../lib/externalObservationUtils'
import type { Coordinates, ExternalObservation, TimeRange } from '../../entities'
import type { GBIFResponse } from '../types'

export const useGbifObservations = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<Array<ExternalObservation>> => {
  const url = new URL('https://api.gbif.org/v1/occurrence/search')
  url.searchParams.set('geometry', buildGbifGeometry(coordinates, getSearchRadiusKm()))
  url.searchParams.set('hasCoordinate', 'true')
  url.searchParams.set('hasGeospatialIssue', 'false')
  url.searchParams.set('eventDate', `${toIsoDate(timeRange.earliestDateTime)},${toIsoDate(timeRange.latestDateTime)}`)
  url.searchParams.set('limit', String(MAX_OBSERVATIONS_PER_SOURCE))
  url.searchParams.set('offset', '0')

  const response = await fetchJson<GBIFResponse>(url.toString())

  return normaliseGBIFOccurrences(response.results)
}
