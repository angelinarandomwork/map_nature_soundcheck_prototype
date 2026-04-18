import type {
  ExternalObservation,
  ProprietaryObservation,
  SpeciesBreakdownItem,
  SpeciesObservationGroup,
} from '../entities'

type SupportedObservation = ProprietaryObservation | ExternalObservation

const sortByTimestampDescending = <TObservation extends SupportedObservation>(
  observations: Array<TObservation>,
): Array<TObservation> => {
  return [...observations].sort((left, right) => right.timestamp - left.timestamp)
}
export const groupObservationsBySpecies = <TObservation extends SupportedObservation>(
  observations: Array<TObservation>,
): Array<SpeciesObservationGroup<TObservation>> => {

  const groupedObservations = new Map<string, Array<TObservation>>()

  observations.forEach((observation) => {
    const existingObservations = groupedObservations.get(observation.scientificName) ?? []
    existingObservations.push(observation)
    groupedObservations.set(observation.scientificName, existingObservations)
  })

  return Array.from(groupedObservations.entries())
    .map(([scientificName, speciesObservations]) => {
      const sortedObservations = sortByTimestampDescending(speciesObservations)
      const totalConfidence = sortedObservations.reduce(
        (runningTotal, observation) => runningTotal + observation.confidence,
        0,
      )
      const averageConfidence = totalConfidence / sortedObservations.length
      const highestConfidence = Math.max(
        ...sortedObservations.map((observation) => observation.confidence),
      )
      const representativeObservation = sortedObservations[0]

      return {
        scientificName,
        commonName: representativeObservation.commonName,
        observationCount: sortedObservations.length,
        averageConfidence,
        highestConfidence,
        latestTimestamp: representativeObservation.timestamp,
        observations: sortedObservations,
        representativeObservation,
      }
    })
    .sort((left, right) => {
      if (right.observationCount !== left.observationCount) {
        return right.observationCount - left.observationCount
      }

      if (right.highestConfidence !== left.highestConfidence) {
        return right.highestConfidence - left.highestConfidence
      }

      return left.commonName.localeCompare(right.commonName)
    })
}

export const getSpeciesBreakdown = <TObservation extends SupportedObservation>(
  observations: Array<TObservation>,
): Array<SpeciesBreakdownItem> => {
  if (observations.length === 0) {
    return []
  }

  const groupedObservations = groupObservationsBySpecies(observations)

  return groupedObservations.map((group) => ({
    scientificName: group.scientificName,
    commonName: group.commonName,
    observationCount: group.observationCount,
    percentage: group.observationCount / observations.length,
  }))
}
