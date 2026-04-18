import type { Coordinates, Proprietary } from "../../entities"

export type BiodiversityBand = {
    label: string
    style: React.CSSProperties
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