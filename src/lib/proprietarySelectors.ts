import proprietaryDataset from '../data/proprietary_data'
import { ndsiData, type SoundsARecord } from '../data/ndsi_data'
import { filterRecordsByTimeWindow } from './timeRange'
import type { Coordinates, Proprietary, ProprietaryObservation, TimeRange } from '../entities'

type NdsiLookupKey = string

type NdsiRecord = {
  ndsiScore: number
}

const formatCoordinatePart = (value: number): string => value.toFixed(5)

const createCoordinateLookupKey = (
  coordinates: Coordinates,
  fileName: string,
): NdsiLookupKey => {
  return `${formatCoordinatePart(coordinates.lat)}::${formatCoordinatePart(coordinates.lon)}::${fileName}`
}

const parseStringField = (value: unknown): string | null => {
  return typeof value === 'string' && value.length > 0 ? value : null
}

const parseNumberField = (value: unknown): number | null => {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

const toNdsiRecord = (record: SoundsARecord): { key: NdsiLookupKey; value: NdsiRecord } | null => {
  const fileName = parseStringField(record.fileName)
  const latitude = parseNumberField(record.latitude)
  const longitude = parseNumberField(record.longitude)
  const ndsiScore = parseNumberField(record.ndsiScore)

  if (!fileName || latitude === null || longitude === null || ndsiScore === null) return null

  return {
    key: createCoordinateLookupKey({ lat: latitude, lon: longitude }, fileName),
    value: { ndsiScore },
  }
}

const buildNdsiLookup = (records: Array<SoundsARecord>): Map<NdsiLookupKey, NdsiRecord> => {
  return records.reduce<Map<NdsiLookupKey, NdsiRecord>>((lookup, record) => {
    const parsedRecord = toNdsiRecord(record)

    if (!parsedRecord) {
      return lookup
    }

    lookup.set(parsedRecord.key, parsedRecord.value)
    return lookup
  }, new Map<NdsiLookupKey, NdsiRecord>())
}

const ndsiLookup = buildNdsiLookup(ndsiData)

const attachNdsiScore = (
  observation: ProprietaryObservation,
  siteCoordinates: Coordinates,
): ProprietaryObservation => {
  const fileName = parseStringField(observation.fileName)

  if (!fileName) return observation

  const ndsiRecord = ndsiLookup.get(createCoordinateLookupKey(siteCoordinates, fileName))

  if (!ndsiRecord)  return observation

  return {
    ...observation,
    ndsiScore: ndsiRecord.ndsiScore,
  }
}

export const sortObservationsByTimestamp = (
  observations: Array<ProprietaryObservation>,
): Array<ProprietaryObservation> => {
  return [...observations].sort((left, right) => right.timestamp - left.timestamp)
}

const filterObservationsByTimeRange = (
  observations: Array<ProprietaryObservation>,
  timeRange: TimeRange,
): Array<ProprietaryObservation> => {
  return sortObservationsByTimestamp(
    filterRecordsByTimeWindow(
      observations,
      timeRange,
      (observation) => observation.timestamp,
    ),
  )
}

const enrichProprietaryPoint = (dataPoint: Proprietary): Proprietary => {
  return {
    ...dataPoint,
    observations: sortObservationsByTimestamp(
      dataPoint.observations.map((observation) =>
        attachNdsiScore(observation, dataPoint.coordinates),
      ),
    ),
  }
}

export const listProprietaryDataPoints = (): Array<Proprietary> => {
  return proprietaryDataset.map(enrichProprietaryPoint)
}

export const filterProprietaryDataPointsByTimeRange = (
  proprietaryDataPoints: Array<Proprietary>,
  timeRange: TimeRange,
): Array<Proprietary> => {
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
  const proprietaryDataPoint = proprietaryDataset.find((item) => item.id === proprietaryId)

  if (!proprietaryDataPoint) return null

  const enrichedDataPoint = enrichProprietaryPoint(proprietaryDataPoint)

  return {
    ...enrichedDataPoint,
    observations: filterObservationsByTimeRange(
      enrichedDataPoint.observations,
      timeRange,
    ),
  }
}
