import type { StyleSpecification } from "mapbox-gl";
import type { MapMarkerVariant } from "./types";

export const mapFog = {
    color: "#dedece",
    "high-color": "#eaf5ee",
    "space-color": "#f6ebd1",
    "horizon-blend": 0.02,
    "star-intensity": 0,
} as const;

export const buttonStyle: React.CSSProperties = {
    appearance: 'none',
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
}

export const legendCardStyle = {
    width: 'min(240px, 100%)',
    background: '#e0f7f7b0',
    border: 'var(--border-green)',
    boxShadow: 'var(--shadow-floating)',
}

export const swatchCircle = {
    display: 'inline-block',
    width: '18px',
    height: '18px',
    borderRadius: 'var(--radius-full)',
    border: 'var(--border-default)',
}

export const getMarkerFill = (
    variant: MapMarkerVariant,
): string => {
    if (variant === 'selected-location') return `var(--peach-strong)`
    return '#059669'
}

export const getMarkerScale = (
    variant: MapMarkerVariant,
): number => {
    if (variant === 'selected-location') return 1.1
    return 1
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

export const createStyleWithFogOverride = async (
    styleUrl: string,
    accessToken: string,
): Promise<StyleSpecification> => {
    const response = await fetch(
        `https://api.mapbox.com/styles/v1/${styleUrl.replace(
        "mapbox://styles/",
        "",
        )}?access_token=${accessToken}`,
    );

    const style = (await response.json()) as StyleSpecification;

    return {
        ...style,
        fog: mapFog,
    };
};