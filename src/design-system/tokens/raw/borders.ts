export const rawBorders = {
    width: {
        0: "0px",
        1: "1px",
        2: "2px",
    },

    style: {
        solid: "solid",
        dashed: "dashed",
        none: "none",
    },
} as const;

export type RawBorders = typeof rawBorders;