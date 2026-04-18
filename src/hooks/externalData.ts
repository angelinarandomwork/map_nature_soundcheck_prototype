import { config } from '../lib/config'
import { fetchJson } from '../lib/fetcher'
import { getFallbackSpeciesInfoUrl, getSpeciesInfoUrl } from '../lib/speciesLinks'
import { type External } from '../entities'

const MAX_OBSERVATIONS_PER_SOURCE = 40
const XENO_CANTO_RESULT_PAGE_SIZE = 50
const DEFAULT_SEARCH_RADIUS_KM = 10
const DAYS_IN_MONTH_APPROXIMATION = 30

const sourcePriority: Record<ExternalSource, number> = {
  inaturalist: 3,
  gbif: 2,
  'xeno-canto': 1,
}


const toIsoDate = (unixMs: number): string => {
  return new Date(unixMs).toISOString().slice(0, 10)
}

const roundTo = (value: number, decimalPlaces: number): number => {
  return Number(value.toFixed(decimalPlaces))
}

const clamp = (value: number, minimum: number, maximum: number): number => {
  return Math.min(maximum, Math.max(minimum, value))
}

const getSearchRadiusKm = (): number => {
  return config.biodiversitySearchRadiusKm
}

const createBoundingBox = (coordinates: Coordinates, radiusKm: number) => {
  const latitudeDelta = radiusKm / 111.32
  const longitudeDelta = radiusKm / (111.32 * Math.max(Math.cos((coordinates.lat * Math.PI) / 180), 0.1))

  return {
    minLat: roundTo(coordinates.lat - latitudeDelta, 4),
    maxLat: roundTo(coordinates.lat + latitudeDelta, 4),
    minLon: roundTo(coordinates.lon - longitudeDelta, 4),
    maxLon: roundTo(coordinates.lon + longitudeDelta, 4),
  }
}

const buildGbifGeometry = (coordinates: Coordinates, radiusKm: number): string => {
  const { minLat, maxLat, minLon, maxLon } = createBoundingBox(coordinates, radiusKm)

  return `POLYGON((${minLon} ${minLat},${maxLon} ${minLat},${maxLon} ${maxLat},${minLon} ${maxLat},${minLon} ${minLat}))`
}

const parseObservationTimestamp = (
  dateValue: string | undefined,
  timeValue?: string | undefined,
): number | null => {
  if (!dateValue) {
    return null
  }

  const combinedValue = timeValue ? `${dateValue}T${timeValue}` : dateValue
  const unixMs = new Date(combinedValue).getTime()

  if (!Number.isFinite(unixMs)) {
    const fallbackUnixMs = new Date(dateValue).getTime()
    return Number.isFinite(fallbackUnixMs) ? fallbackUnixMs : null
  }

  return unixMs
}

const sortObservations = (observations: Array<ExternalObservation>): Array<ExternalObservation> => {
  return [...observations].sort((left, right) => {
    if (right.timestamp !== left.timestamp) {
      return right.timestamp - left.timestamp
    }

    const sourceOrderDelta = sourcePriority[right.source] - sourcePriority[left.source]

    if (sourceOrderDelta !== 0) {
      return sourceOrderDelta
    }

    return left.scientificName.localeCompare(right.scientificName)
  })
}

const createObservationId = (
  source: ExternalSource,
  nativeId: string | number | undefined,
  scientificName: string,
  timestamp: number,
): string => {
  const normalisedNativeId = nativeId === undefined ? 'unknown' : String(nativeId)
  const safeScientificName = scientificName.replaceAll(/\s+/g, '-').toLowerCase()

  return `${source}-${normalisedNativeId}-${safeScientificName}-${timestamp}`
}

const mapXenoQualityToConfidence = (quality: string | undefined): number => {
  const normalisedQuality = quality?.trim().toUpperCase()

  if (normalisedQuality === 'A') return 0.96
  if (normalisedQuality === 'B') return 0.88
  if (normalisedQuality === 'C') return 0.8
  if (normalisedQuality === 'D') return 0.7
  if (normalisedQuality === 'E') return 0.6

  return 0.74
}

const mapINaturalistQualityToConfidence = (qualityGrade: string | undefined): number => {
  const normalisedGrade = qualityGrade?.trim().toLowerCase()

  if (normalisedGrade === 'research') return 0.94
  if (normalisedGrade === 'needs_id') return 0.82
  if (normalisedGrade === 'casual') return 0.64

  return 0.72
}

const mapGBIFBasisOfRecordToConfidence = (basisOfRecord: string | undefined): number => {
  const normalisedBasis = basisOfRecord?.trim().toUpperCase()

  if (normalisedBasis === 'HUMAN_OBSERVATION') return 0.84
  if (normalisedBasis === 'MACHINE_OBSERVATION') return 0.78
  if (normalisedBasis === 'OCCURRENCE') return 0.74

  return 0.7
}

const buildExternalSourceSummary = (
  source: ExternalSource,
  observations: Array<ExternalObservation>,
): ExternalSourceSummary => {
  const uniqueSpeciesCount = new Set(
    observations.map((observation) => observation.scientificName),
  ).size

  return {
    source,
    observationCount: observations.length,
    uniqueSpeciesCount,
  }
}

const calculateExternalScore = (observations: Array<ExternalObservation>): number => {
  if (observations.length === 0) {
    return 0
  }

  const uniqueSpeciesCount = new Set(
    observations.map((observation) => observation.scientificName),
  ).size
  const representedSourceCount = new Set(
    observations.map((observation) => observation.source),
  ).size
  const averageConfidence =
    observations.reduce((total, observation) => total + observation.confidence, 0) /
    observations.length

  const observationContribution = clamp(observations.length / 60, 0, 1) * 0.35
  const speciesContribution = clamp(uniqueSpeciesCount / 24, 0, 1) * 0.35
  const sourceContribution = clamp(representedSourceCount / 3, 0, 1) * 0.15
  const confidenceContribution = averageConfidence * 0.15

  return roundTo(
    clamp(
      observationContribution +
        speciesContribution +
        sourceContribution +
        confidenceContribution,
      0,
      0.99,
    ),
    2,
  )
}

const createExternalSummary = (
  observations: Array<ExternalObservation>,
  sourceSummaries: Array<ExternalSourceSummary>,
  searchRadiusKm: number,
): string => {
  if (observations.length === 0) {
    return `No matching external observations were returned within roughly ${searchRadiusKm} km for the selected time window.`
  }

  const uniqueSpeciesCount = new Set(
    observations.map((observation) => observation.scientificName),
  ).size
  const representedSources = sourceSummaries.map((summary) => summary.source)
  const sourceLabel =
    representedSources.length === 1
      ? representedSources[0]
      : `${representedSources.slice(0, -1).join(', ')} and ${representedSources.at(-1)}`

  return `${observations.length} external observations across ${uniqueSpeciesCount} species were found within roughly ${searchRadiusKm} km from ${sourceLabel} for the selected time window.`
}

const toAbsoluteUrl = (value: string | undefined): string | undefined => {
  if (!value) {
    return undefined
  }

  return value.startsWith('//') ? `https:${value}` : value
}

const normaliseXenoCantoRecordings = (
  recordings: Array<XenoCantoRecording> | undefined,
): Array<ExternalObservation> => {
  if (!recordings) return []

  return recordings.flatMap((recording) => {
    const scientificName = [recording.gen, recording.sp].filter(Boolean).join(' ').trim()
    const timestamp = parseObservationTimestamp(recording.date, recording.time)
    const latitude = Number(recording.lat)
    const longitude = Number(recording.lon)

    if (!scientificName || timestamp === null || !Number.isFinite(latitude) || !Number.isFinite(longitude))return []

    const commonName = recording.en?.trim() || scientificName

    const sourceRecordUrl = toAbsoluteUrl(recording.url)
    const audioUrl = toAbsoluteUrl(recording.file)

    return [
      {
        id: createObservationId('xeno-canto', recording.id, scientificName, timestamp),
        timestamp,
        scientificName,
        commonName,
        confidence: mapXenoQualityToConfidence(recording.q),
        source: 'xeno-canto' as const,
        soundType: recording.type?.trim() || 'recording',
        latitude,
        longitude,
        sourceRecordUrl,
        audioUrl,
        infoUrl: getSpeciesInfoUrl(scientificName),
      },
    ]
  })
}

const normaliseINaturalistObservations = (
  observations: Array<INaturalistObservation> | undefined,
): Array<ExternalObservation> => {
  if (!observations) return []

  return observations.flatMap((observation) => {
    const scientificName = observation.taxon?.name?.trim() || observation.species_guess?.trim() || ''
    const timestamp = parseObservationTimestamp(
      observation.time_observed_at ?? observation.observed_time ?? observation.observed_on,
    )
    const coordinates = observation.geojson?.coordinates
    const latitude = coordinates?.[1]
    const longitude = coordinates?.[0]

    if (!scientificName || timestamp === null || latitude === undefined || longitude === undefined) {
      return []
    }

    const commonName = observation.taxon?.preferred_common_name?.trim() || observation.species_guess?.trim() || scientificName

    return [
      {
        id: createObservationId('inaturalist', observation.id, scientificName, timestamp),
        timestamp,
        scientificName,
        commonName,
        confidence: mapINaturalistQualityToConfidence(observation.quality_grade),
        source: 'inaturalist' as const,
        soundType: 'observation',
        latitude,
        longitude,
        sourceRecordUrl: observation.uri?.trim() || undefined,
        infoUrl: getSpeciesInfoUrl(scientificName),
      },
    ]
  })
}

const normaliseGBIFOccurrences = (
  occurrences: Array<GBIFOccurrence> | undefined,
): Array<ExternalObservation> => {
  if (!occurrences) {
    return []
  }

  return occurrences.flatMap((occurrence) => {
    const scientificName = occurrence.species?.trim() || ''
    const timestamp = parseObservationTimestamp(occurrence.eventDate)
    const latitude = occurrence.decimalLatitude
    const longitude = occurrence.decimalLongitude

    if (!scientificName || timestamp === null || latitude === undefined || longitude === undefined) {
      return []
    }

    const sourceRecordUrl = occurrence.key === undefined
      ? undefined
      : `https://www.gbif.org/occurrence/${occurrence.key}`

    return [
      {
        id: createObservationId('gbif', occurrence.key, scientificName, timestamp),
        timestamp,
        scientificName,
        commonName: occurrence.vernacularName?.trim() || scientificName,
        confidence: mapGBIFBasisOfRecordToConfidence(occurrence.basisOfRecord),
        source: 'gbif' as const,
        soundType: 'occurrence',
        latitude,
        longitude,
        sourceRecordUrl,
        infoUrl: getFallbackSpeciesInfoUrl(scientificName),
      },
    ]
  })
}

const filterUniqueObservations = (
  observations: Array<ExternalObservation>,
): Array<ExternalObservation> => {
  const seenIds = new Set<string>()

  return observations.filter((observation) => {
    const fingerprint = `${observation.source}|${observation.scientificName}|${observation.timestamp}|${roundTo(observation.latitude, 4)}|${roundTo(observation.longitude, 4)}`

    if (seenIds.has(fingerprint)) {
      return false
    }

    seenIds.add(fingerprint)
    return true
  })
}

const fetchXenoCantoObservations = async (
  coordinates: Coordinates,
): Promise<Array<ExternalObservation>> => {
  const apiKey = config.xenoCantoApiKey

  if (!apiKey) {
    return []
  }

  const { minLat, maxLat, minLon, maxLon } = createBoundingBox(coordinates, getSearchRadiusKm())
  const url = new URL('https://xeno-canto.org/api/3/recordings')
  url.searchParams.set('query', `box:${minLat},${minLon},${maxLat},${maxLon}+grp:birds`)
  url.searchParams.set('key', apiKey)
  url.searchParams.set('per_page', String(XENO_CANTO_RESULT_PAGE_SIZE))

  const response = await fetchJson<XenoCantoResponse>(url.toString())

  return normaliseXenoCantoRecordings(response.recordings)
}

const fetchINaturalistObservations = async (
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

const fetchGBIFObservations = async (
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

const settleSourceObservations = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<Record<ExternalSource, Array<ExternalObservation>>> => {
  const [xenoResult, inaturalistResult, gbifResult] = await Promise.allSettled([
    fetchXenoCantoObservations(coordinates),
    fetchINaturalistObservations(coordinates, timeRange),
    fetchGBIFObservations(coordinates, timeRange),
  ])

  return {
    'xeno-canto': xenoResult.status === 'fulfilled' ? xenoResult.value : [],
    inaturalist: inaturalistResult.status === 'fulfilled' ? inaturalistResult.value : [],
    gbif: gbifResult.status === 'fulfilled' ? gbifResult.value : [],
  }
}

const buildExternalPayload = (
  coordinates: Coordinates,
  sourceObservations: Record<ExternalSource, Array<ExternalObservation>>,
  timeRange: TimeRange,
): External => {
  const filteredSourceObservations = Object.fromEntries(
    (Object.entries(sourceObservations) as Array<[ExternalSource, Array<ExternalObservation>]>).map(
      ([source, observationsBySource]) => [
        source,
        filterExternalObservationsByTimeRange(observationsBySource, timeRange),
      ],
    ),
  ) as Record<ExternalSource, Array<ExternalObservation>>

  const observations = sortObservations(
    filterUniqueObservations(Object.values(filteredSourceObservations).flat()),
  )
  const sourceSummaries = (Object.entries(sourceObservations) as Array<[
    ExternalSource,
    Array<ExternalObservation>,
  ]>)
    .map(([source, observationsBySource]) =>
      buildExternalSourceSummary(source, observationsBySource),
    )
    .filter((summary) => summary.observationCount > 0)
    .sort((left, right) => right.observationCount - left.observationCount)

  return {
    coordinates,
    score: calculateExternalScore(observations),
    libraries: sourceSummaries.map((summary) => summary.source),
    observations,
    sourceSummaries,
    summary: createExternalSummary(
      observations,
      sourceSummaries,
      getSearchRadiusKm(),
    ),
  }
}

import { filterRecordsByTimeWindow } from '../lib/timeRange'
import type { ExternalSource, Coordinates, ExternalObservation, ExternalSourceSummary, TimeRange } from '../entities'
import type { XenoCantoRecording, INaturalistObservation, GBIFOccurrence, XenoCantoResponse, INaturalistResponse, GBIFResponse } from './types'

const filterExternalObservationsByTimeRange = (
  observations: Array<ExternalObservation>,
  timeRange: TimeRange,
): Array<ExternalObservation> => {
  return filterRecordsByTimeWindow(
    observations,
    timeRange,
    (observation) => observation.timestamp,
  )
}


export const getExternalDataForCoordinates = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<External> => {
  const sourceObservations = await settleSourceObservations(coordinates, timeRange)

  return buildExternalPayload(coordinates, sourceObservations, timeRange)
}

export const getExternalDataUnavailableSummary = (): string => {
  return `External biodiversity sources are currently unavailable. Configure an xeno-canto API key and allow direct browser access to iNaturalist and GBIF for this prototype.`
}

export const getApproximateMonthsFromTimeRange = (timeRange: TimeRange): number => {
  const totalDays = Math.max(
    1,
    (timeRange.latestDateTime - timeRange.earliestDateTime) / (1000 * 60 * 60 * 24),
  )

  return roundTo(totalDays / DAYS_IN_MONTH_APPROXIMATION, 1)
}

export const getDefaultSearchRadiusKm = (): number => {
  return DEFAULT_SEARCH_RADIUS_KM
}
