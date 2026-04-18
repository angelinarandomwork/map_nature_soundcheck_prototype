import type { AudioState } from "../components/SpeciesCards/types"
import type {
    ExternalObservation,
    ProprietaryObservation,
    SpeciesBreakdownItem,
    SpeciesObservationGroup,
} from "../entities"

export type XenoCantoRecording = {
    id: string
    en?: string
    gen?: string
    sp?: string
    file?: string
    type?: string
    lat?: string
    lon?: string
    url?: string
    q?: string
    date?: string
    time?: string
    sono?: {
        small?: string
    }
}

export type XenoCantoResponse = {
    recordings: Array<XenoCantoRecording>
    error?: string
}

export type ExampleAudioResult = {
    audioUrl: string
    attributionUrl: string
    sonogramUrl?: string
}

export type INaturalistObservation = {
    id: number
    observed_on?: string
    observed_time?: string
    time_observed_at?: string
    species_guess?: string
    quality_grade?: string
    uri?: string
    taxon?: {
        name?: string
        preferred_common_name?: string
    }
    geojson?: {
        coordinates?: [number, number]
    }
    sounds?: Array<{
        file_url?: string
    }>
}

export type INaturalistResponse = {
    results: Array<INaturalistObservation>
}

export type GBIFOccurrence = {
    key?: number
    eventDate?: string
    scientificName?: string
    species?: string
    vernacularName?: string
    basisOfRecord?: string
    decimalLatitude?: number
    decimalLongitude?: number
}

export type GBIFResponse = {
    results: Array<GBIFOccurrence>
}

export type SidePanelViewModel = {
    hasSelection: boolean

    proprietaryObservations: Array<ProprietaryObservation>
    externalObservations: Array<ExternalObservation>

    proprietarySpeciesGroups: Array<SpeciesObservationGroup<ProprietaryObservation>>
    externalSpeciesGroups: Array<SpeciesObservationGroup<ExternalObservation>>

    proprietarySpeciesBreakdown: Array<SpeciesBreakdownItem>
    externalSpeciesBreakdown: Array<SpeciesBreakdownItem>

    highestConfidenceObservation: ProprietaryObservation | null

    averageNdsiScore: number | null
    ndsiScores: Array<number>

    pointOrPoints: string

    imageMap: Record<string, string | null | undefined>
    loadingMap: Record<string, boolean | undefined>
}

export type PlaybackStatus = 'idle' | 'loading' | 'ready' | 'playing' | 'error' | 'unavailable'
export type UseAudioPlayerOptions = {
    src: string | null
    autoplay?: boolean
    onPlayFailure?: () => void
}

export type UseAudioPlayerResult = {
    status: PlaybackStatus
    isPlaying: boolean
    isLoading: boolean
    hasError: boolean
    canPlay: boolean
    play: () => Promise<void>
    pause: () => void
    reset: () => void
}

export type UseSpeciesAudioOptions = {
    scientificName: string
    sourceAudioUrl?: string
}

export type UseSpeciesAudioResult = {
    isAudioPlaying: boolean
    isAudioLoading: boolean
    hasAudioError: boolean
    audioState: AudioState
    canAttemptAudioResolution: boolean
    handleAudioClick: () => Promise<void>
}