import type {
  Coordinates,
  External,
  ExternalObservation,
  ExternalSource,
  TimeRange,
} from '../types/data'
import { filterRecordsByTimeWindow } from './timeRange'

const speciesCatalogue = [
  {
    speciesName: 'Pycnonotus goiavier',
    commonName: 'Yellow-vented Bulbul',
    soundType: 'song',
  },
  {
    speciesName: 'Todiramphus chloris',
    commonName: 'Collared Kingfisher',
    soundType: 'call',
  },
  {
    speciesName: 'Orthotomus sutorius',
    commonName: 'Common Tailorbird',
    soundType: 'song',
  },
  {
    speciesName: 'Hylarana erythraea',
    commonName: 'Green Paddy Frog',
    soundType: 'chorus',
  },
  {
    speciesName: 'Amaurornis phoenicurus',
    commonName: 'White-breasted Waterhen',
    soundType: 'call',
  },
  {
    speciesName: 'Copsychus saularis',
    commonName: 'Oriental Magpie-Robin',
    soundType: 'song',
  },
]

const externalSources: ExternalSource[] = ['gbif', 'xeno-canto', 'inaturalist']

const millisecondsPerDay = 24 * 60 * 60 * 1000

const wait = async (durationMs: number): Promise<void> => {
  await new Promise((resolve) => window.setTimeout(resolve, durationMs))
}

const roundScore = (value: number): number => {
  return Math.max(0.24, Math.min(0.97, Number(value.toFixed(2))))
}

const calculateSeed = (coordinates: Coordinates): number => {
  const latComponent = Math.abs(Math.round(coordinates.lat * 10_000))
  const lonComponent = Math.abs(Math.round(coordinates.lon * 10_000))

  return latComponent + lonComponent
}

export const getExternalDataForCoordinates = async (
  coordinates: Coordinates,
  timeRange: TimeRange,
): Promise<External> => {
  await wait(220)

  const seed = calculateSeed(coordinates)
  const baseScore = 0.42 + (seed % 52) / 100
  const score = roundScore(baseScore)
  const percentileGlobal = roundScore(Math.min(0.99, score + 0.06))
  const percentileCountry = roundScore(Math.min(0.99, score + 0.11))
  const observations = [0, 1, 2, 3, 4, 5].map((index) => createObservation(index, seed))

  const filteredObservations = filterRecordsByTimeWindow(
    observations,
    timeRange,
    (observation) => observation.recordedAt,
  )

  return {
    coordinates,
    score,
    percentileGlobal,
    percentileCountry,
    libraries: externalSources,
    observations: filteredObservations,
    summary: createExternalSummary(score, filteredObservations.length),
  }
}

const createObservation = (
  index: number,
  seed: number,
): ExternalObservation => {
  const nowUnix = Date.now()
  const catalogueItem = speciesCatalogue[(seed + index) % speciesCatalogue.length]
  const source = externalSources[(seed + index) % externalSources.length]
  const daysAgo = ((seed + index * 5) % 30) + 1
  const capturedAtUnix = nowUnix - daysAgo * millisecondsPerDay
  const confidence = roundScore(0.51 + ((seed + index * 13) % 38) / 100)

  return {
    id: `${source}-${seed}-${index}`,
    capturedAtUnix,
    speciesName: catalogueItem.speciesName,
    commonName: catalogueItem.commonName,
    confidence,
    source,
    recordedAt: capturedAtUnix,
    soundType: catalogueItem.soundType,
  }
}

const createExternalSummary = (
  score: number,
  observationCount: number,
): string => {
  if (score >= 0.8) return `High external richness estimate derived from ${observationCount} nearby library records and strong spectral variety.`
  if (score >= 0.6) return `Moderate external richness estimate derived from ${observationCount} nearby library records with mixed habitat signatures.`

  return `Lower external richness estimate derived from ${observationCount} nearby library records and narrower acoustic variety.`
}
