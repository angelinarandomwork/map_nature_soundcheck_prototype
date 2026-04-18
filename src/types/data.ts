import type {
    Coordinates,
} from "../entities"

export type TaxonSearchResponse = {
    results?: Array<{
        name?: string
        default_photo?: {
            square_url?: string | null
            medium_url?: string | null
        } | null
    }>
}

export type SpeciesImageMap = Record<string, string | null>
export type SpeciesImageLoadingMap = Record<string, boolean>

export type UseSpeciesImagesResult = {
    imageMap: SpeciesImageMap
    loadingMap: SpeciesImageLoadingMap
}

export type NormalisedCoordinate = Coordinates

export type DateTimeRangeParams = {
    minDateTime: number
    maxDateTime: number
}