export const rawBreakpoints = {
    mobile: "0px",
    tablet: "768px",
    desktop: "1024px",
    wide: "1440px",
} as const;

export type RawBreakpoints = typeof rawBreakpoints;