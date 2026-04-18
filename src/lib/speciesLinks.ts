import type { ExternalObservation, ProprietaryObservation } from "../entities"

const buildWikipediaSearchUrl = (scientificName: string): string => {
  return `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(scientificName)}`
}

const buildXenoCantoExploreUrl = (scientificName: string): string => {
  return `https://xeno-canto.org/explore?query=${encodeURIComponent(scientificName)}`
}

const buildINaturalistTaxonSearchUrl = (scientificName: string): string => {
  return `https://www.inaturalist.org/taxa/search?q=${encodeURIComponent(scientificName)}`
}

export const getSpeciesInfoUrl = (scientificName: string): string => {
  return buildINaturalistTaxonSearchUrl(scientificName)
}

export const getFallbackSpeciesInfoUrl = (scientificName: string): string => {
  return buildWikipediaSearchUrl(scientificName)
}

export const getSpeciesSoundExampleUrl = (scientificName: string): string => {
  return buildXenoCantoExploreUrl(scientificName)
}

export const getObservationSoundExampleUrl = (
  observation: Pick<ExternalObservation | ProprietaryObservation, 'scientificName'> & {
    soundExampleUrl?: string
  },
): string => {
  return observation.soundExampleUrl ?? getSpeciesSoundExampleUrl(observation.scientificName)
}
