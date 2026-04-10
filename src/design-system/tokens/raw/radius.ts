export const rawRadius = {
    0: "0px",
    2: "2px",
    4: "4px",
    8: "8px",
    12: "12px",
    16: "16px",
    full: "9999px",
} as const;

export type RawRadius = typeof rawRadius;