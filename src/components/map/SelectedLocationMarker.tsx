import { Marker } from "react-map-gl/mapbox"
import type { MapMarkerProps } from "../../types/components"
import { getMarkerFill, createSvgStyle, buttonStyle } from "./mapStyles"

export const MapMarker = ({
    coordinates,
    variant,
    isSelected = false,
    label,
    onClick,
}: MapMarkerProps) => {
    const fill = getMarkerFill(variant)
    const interactive = typeof onClick === 'function'

    const content = (
        <div>
            <svg
                width="28"
                height="40"
                viewBox="0 0 28 40"
                style={createSvgStyle(variant, isSelected)}
                aria-hidden="true"
            >
                <path
                d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0z"
                fill={fill}
                />
                <circle cx="14" cy="14" r="6" fill="white" />
            </svg>
        </div>
    )

    return (
        <Marker
            longitude={coordinates.lon}
            latitude={coordinates.lat}
            anchor="bottom"
            >
            {interactive ? (
                <button
                    type="button"
                    aria-label={label}
                    onClick={onClick}
                    style={buttonStyle}
                    >
                    {content}
                </button>
            ) : (
                content
            )}
        </Marker>
    )
}