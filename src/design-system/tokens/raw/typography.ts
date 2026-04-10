export const rawTypography = {
    fontFamily: {
        sans: [
            "abcDiatype",
            "abcDiatype Fallback",
            "ui-sans-serif",
            "system-ui",
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
            "Noto Color Emoji",
        ].join(", "),
        mono: [
            "JetBrains Mono",
            "JetBrains Mono Fallback",
            "ui-monospace",
            "SFMono-Regular",
            "Menlo",
            "Monaco",
            "Consolas",
            "Liberation Mono",
            "Courier New",
            "monospace",
        ].join(", "),
        monoSystem: ["Menlo", "monospace"].join(", "),
    },

    fontWeight: {
        regular: 400,
        medium: 500,
        bold: 700,
    },

    fontSize: {
        9: "0.5625rem",
        10: "0.625rem",
        11: "0.6875rem",
        12: "0.75rem",
        13: "0.8125rem",
        14: "0.875rem",
        15: "0.9375rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        28: "1.75rem",
        40: "2.5rem",
        48: "3rem",
        64: "4rem",
    },

    lineHeight: {
        87: "0.87",
        100: "1",
        120: "1.2",
        133: "1.33",
        143: "1.43",
        150: "1.5",
        163: "1.63",
    },

    letterSpacing: {
        normal: "0",
        overline: "0.3px",
        codeNano: "0.45px",
        codeMicro: "0.55px",
        codeOverline: "0.7px",
        codeBody: "-0.32px",
        codeSmall: "-0.28px",
        codeTight: "-0.98px",
    },
} as const;

export type RawTypography = typeof rawTypography;