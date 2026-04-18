import type { CSSProperties } from "react";

export const chartColours = [
    "#6c57bb",
    "var(---green-strong)",
    "var(--blue-strong)",
    "var(--reddish-strong)",
    "var(--amber-strong)",
    "var(--peach-strong)",
    "#f3e7cc",
    "#10b981",
];

export const linkStyle: CSSProperties = {
    textDecoration: 'none',
}


export const buttonStyle = {
    width: '38px',
    height: '38px',
    backgroundColor: 'transparent',
    border: '#9ca3af36 1px solid',
    color: 'black',
    '&:hover': {
        // color: 'var(--white)',
    },
    '&.Mui-disabled': {
        backgroundColor: '#9ca3af',
        color: '#f3f4f6',
    },
} as const

export const playbackIconStyle = {
    fontSize: 28,
    color: 'inherit',
    display: 'block',
} as const

export const PIE_CHART_VIEW_BOX = 120;
export const PIE_CHART_CENTRE = 60;
export const PIE_CHART_RADIUS = 52;
export const PIE_CHART_INNER_RADIUS = 24;
export const MAX_VISIBLE_SPECIES = 6;
export const FULL_CIRCLE_THRESHOLD = 0.9999;