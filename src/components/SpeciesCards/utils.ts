import {
    getFallbackSpeciesInfoUrl,
    getSpeciesInfoUrl,
} from '../../lib/speciesLinks'

export const getInfoUrl = (
    scientificName: string,
    fallbackInfoUrl?: string,
): string => {
    return (
        fallbackInfoUrl ??
        getSpeciesInfoUrl(scientificName) ??
        getFallbackSpeciesInfoUrl(scientificName)
    )
}