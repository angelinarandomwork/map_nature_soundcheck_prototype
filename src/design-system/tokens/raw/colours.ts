export const rawColours = {
    black: "#000000",
    white: "#ffffff",

    neutral: {
        0: "#ffffff",
        50: "#f5f5f5",
        100: "#e0e0e0",
        700: "#444444",
        800: "#2c2c2c",
        950: "#0f0f0f",
        1000: "#000000",
    },

    blue: {
        500: "#0089ff",
        550: "#0096ff",
        900: "#0007cd",
    },

    cyan: {
        500: "#00ffff",
    },

    alpha: {
        white04: "rgba(255, 255, 255, 0.04)",
        white06: "rgba(255, 255, 255, 0.06)",
        white08: "rgba(255, 255, 255, 0.08)",
        white10: "rgba(255, 255, 255, 0.10)",
        white12: "rgba(255, 255, 255, 0.12)",
        white20: "rgba(255, 255, 255, 0.20)",
        white50: "rgba(255, 255, 255, 0.50)",
        white60: "rgba(255, 255, 255, 0.60)",
        cyan12: "rgba(0, 255, 255, 0.12)",
        black15: "rgba(0, 0, 0, 0.15)",
        black50: "rgba(0, 0, 0, 0.50)",
    },
} as const;

export type RawColours = typeof rawColours;