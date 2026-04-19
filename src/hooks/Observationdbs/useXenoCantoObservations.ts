import { fetchJson } from "../../lib/fetcher"
import { config } from "../../lib/config"
import { createBoundingBox, getSearchRadiusKm, XENO_CANTO_RESULT_PAGE_SIZE } from "../../lib/formatters"
import { normaliseXenoCantoRecordings } from "../../lib/externalObservationUtils"
import type { Coordinates, ExternalObservation } from "../../entities"
import type { XenoCantoResponse } from "../types"

export const useXenoCantoObservations = async (
  coordinates: Coordinates,
): Promise<Array<ExternalObservation>> => {
  const apiKey = config.xenoCantoApiKey

  if (!apiKey) return []

  const { minLat, maxLat, minLon, maxLon } = createBoundingBox(coordinates, getSearchRadiusKm())
  const url = new URL('https://xeno-canto.org/api/3/recordings')
  url.searchParams.set('query', `box:${minLat},${minLon},${maxLat},${maxLon}+grp:birds`)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('per_page', String(XENO_CANTO_RESULT_PAGE_SIZE))

  const response = await fetchJson<XenoCantoResponse>(url.toString())

  return normaliseXenoCantoRecordings(response.recordings)
}
