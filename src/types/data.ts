export type Coordinates = {
    lat: number
    lon: number
}

type SelectedLocation = Coordinates | null

export type TimeSeriesRecord = {
    id: string
    capturedAtUnix: number
}

export type ExternalSource = 'gbif' | 'xeno-canto' | 'inaturalist'

export type ExternalObservation = TimeSeriesRecord & {
    speciesName: string
    commonName: string
    confidence: number
    source: ExternalSource
    recordedAt: number
    soundType: string
}

export type ProprietaryObservation = {
    timestamp: number
    commonName: string
    scientificName: string
    confidence: number
    fileName: string
}

export type External = {
    coordinates: SelectedLocation
    score: number
    percentileGlobal: number | null
    percentileCountry: number | null
    libraries: Array<ExternalSource>
    observations: Array<ExternalObservation>
    summary: string
}

export type Proprietary = {
    id: string
    siteName: string
    coordinates: Coordinates
    sources: Array<string>
    summary: string
    observations: Array<ProprietaryObservation>
}

export type SelectionMode = 'map' | 'proprietary' | null

export type TimeRange = {
    earliestDateTime: number
    latestDateTime: number
}

export type BiodiversitySelectionState = {
    coordinates: Coordinates | null
    areaId: string | null
    external: External | null
    proprietary: Proprietary | null
    proprietaryDataPoints: Array<Proprietary>
    selectedProprietaryId: string | null
    selectedMode: SelectionMode
    earliestDateTime: number
    latestDateTime: number
    isLoadingExpected: boolean
    isLoadingObserved: boolean
    isLoadingMapPoints: boolean
    errorMessage: string | null
}


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
