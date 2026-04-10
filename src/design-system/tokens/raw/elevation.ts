export const rawElevation = {
    shadow: {
        none: "none",

        subtle: "0px 1px 2px rgba(0, 0, 0, 0.05)",

        brutalist: "4px 4px 0px 0px rgba(0, 0, 0, 0.15)",

        floating: "0px 8px 32px rgba(0, 0, 0, 0.5)",
    },
} as const;

export type RawElevation = typeof rawElevation;