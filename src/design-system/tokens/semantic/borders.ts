export const semanticBorders = {
    none: {
        borderWidth: "var(--border-width-0)",
        borderStyle: "var(--border-style-none)",
        borderColor: "transparent",
    },

    subtle: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-border-subtle)",
    },

    default: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-border-default)",
    },

    strong: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-border-strong)",
    },

    interactive: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-border-interactive)",
    },

    focus: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-border-focus)",
    },

    accent: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-accent-primary)",
    },

    danger: {
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        borderColor: "var(--color-state-danger)",
    },
} as const;

export type SemanticBorders = typeof semanticBorders;
export type BorderTone = keyof typeof semanticBorders;