import { fetchJson } from '../../lib/fetcher'
import { getSearchRadiusKm, MAX_OBSERVATIONS_PER_SOURCE, toIsoDate } from '../../lib/formatters'
import { normaliseINaturalistObservations } from '../../lib/externalObservationUtils'
import type { Coordinates, ExternalObservation, TimeRange } from '../../entities'
import type { INaturalistResponse } from '../types'

export const useINaturalistObservations = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<Array<ExternalObservation>> => {
  const url = new URL('https://api.inaturalist.org/v1/observations')
  url.searchParams.set('lat', String(coordinates.lat))
  url.searchParams.set('lng', String(coordinates.lon))
  url.searchParams.set('radius', String(getSearchRadiusKm()))
  url.searchParams.set('d1', toIsoDate(timeRange.earliestDateTime))
  url.searchParams.set('d2', toIsoDate(timeRange.latestDateTime))
  url.searchParams.set('per_page', String(MAX_OBSERVATIONS_PER_SOURCE))
  url.searchParams.set('order_by', 'observed_on')
  url.searchParams.set('order', 'desc')

  const response = await fetchJson<INaturalistResponse>(url.toString())

  return normaliseINaturalistObservations(response.results)
}
