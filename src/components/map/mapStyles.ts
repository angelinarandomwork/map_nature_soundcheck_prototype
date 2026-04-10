import type { MapMarkerVariant } from "../../types/components";

export const mapFog = {
    color: "#dedece",
    "high-color": "#eaf5ee",
    "space-color": "#f6ebd1",
    "horizon-blend": 0.02,
    "star-intensity": 0,
} as const;

export const getMarkerFill = (
    variant: MapMarkerVariant,
): string => {
    if (variant === 'selected-location') return `var(--color-border-default)`
    return '#059669'
}

export const getMarkerScale = (
    variant: MapMarkerVariant,
): number => {
    if (variant === 'selected-location') return 1.1
    return 1
}

export const buttonStyle: React.CSSProperties = {
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
}

export const createSvgStyle = (
    variant: MapMarkerVariant,
    isSelected: boolean,
): React.CSSProperties => ({
    display: 'block',
    transform: `scale(${getMarkerScale(variant)})`,
    transition: 'transform 140ms ease, filter 140ms ease',
    filter: isSelected ? 'drop-shadow(0 8px 20px rgba(37, 99, 235, 0.28))' : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.22))',
})