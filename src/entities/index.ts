export type Coordinates = {
    lat: number
    lon: number
}

export type TimeSeriesRecord = {
    id?: string
    timestamp: number
}

export type TimeRange = {
    earliestDateTime: number
    latestDateTime: number
}
export type ExternalSource = 'gbif' | 'xeno-canto' | 'inaturalist'

export type BaseObservation = TimeSeriesRecord & {
    scientificName: string
    commonName: string
    confidence: number
}

export type ProprietaryObservation = BaseObservation & {
    fileName?: string
    ndsiScore?: number
}

export type ExternalObservation = BaseObservation & {
    source: ExternalSource
    soundType: string
    latitude: number
    longitude: number
    sourceRecordUrl?: string
    audioUrl?: string
    infoUrl?: string
}

export type ExternalSourceSummary = {
    source: ExternalSource
    observationCount: number
    uniqueSpeciesCount: number
}

export type External = {
    coordinates: Coordinates | null
    score: number
    libraries: Array<ExternalSource>
    observations: Array<ExternalObservation>
    sourceSummaries: Array<ExternalSourceSummary>
    summary: string
    percentileGlobal?: number | null
    percentileCountry?: number | null
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

export type BiodiversitySelectionState = {
    coordinates: Coordinates | null
    areaId: string | null
    external?: External | null
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

export type SupportedObservation = ProprietaryObservation | ExternalObservation

export type SpeciesBreakdownItem = {
    scientificName: string
    commonName: string
    observationCount: number
    percentage: number
}

export type SpeciesObservationGroup<TObservation extends SupportedObservation = SupportedObservation> = {
    scientificName: string
    commonName: string
    observationCount: number
    averageConfidence: number
    highestConfidence: number
    latestTimestamp: number
    observations: Array<TObservation>
    representativeObservation: TObservation
}

export type SidePanelState = Pick<
    BiodiversitySelectionState,
    | 'coordinates'
    | 'proprietary'
    | 'external'
    | 'proprietaryDataPoints'
    | 'earliestDateTime'
    | 'latestDateTime'
    | 'isLoadingMapPoints'
    | 'isLoadingObserved'
    | 'isLoadingExpected'
    | 'errorMessage'
>