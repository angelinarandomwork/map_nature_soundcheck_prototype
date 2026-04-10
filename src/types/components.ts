import type { BiodiversitySelectionState, Coordinates, Proprietary, TimeRange } from "./data";

export type Score = {
    label: string;
    value: number;
};

export type BiodiversityScoreBand = 'low' | 'medium' | 'high'


export type SidePanelProps = {
    state: BiodiversitySelectionState
    minDateTime: number
    maxDateTime: number
    onTimeRangeChange: (timeRange: TimeRange) => void | Promise<void>
}

export type MapMarkerVariant = 'proprietary' | 'selected-location'

export type MapMarkerProps = {
    coordinates: Coordinates
    variant: MapMarkerVariant
    isSelected?: boolean
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export type MapViewProps = {
    selectedCoordinates: Coordinates | null
    proprietaryDataPoints: Array<Proprietary>
    selectedProprietaryId: string | null
    onMapSelect: (coordinates: Coordinates) => void
    onProprietarySelect: (proprietaryId: string) => void
}