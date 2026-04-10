export const semanticSurfaces = {
    transparent: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        borderWidth: "var(--border-width-0)",
        borderStyle: "var(--border-style-none)",
        boxShadow: "var(--shadow-none)",
    },

    page: {
        backgroundColor: "var(--color-background-page)",
        borderColor: "transparent",
        borderWidth: "var(--border-width-0)",
        borderStyle: "var(--border-style-none)",
        boxShadow: "var(--shadow-none)",
    },

    subtle: {
        backgroundColor: "var(--color-background-subtle)",
        borderColor: "var(--color-border-subtle)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-none)",
    },

    base: {
        backgroundColor: "var(--color-surface-base)",
        borderColor: "var(--color-border-default)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-none)",
    },

    elevated: {
        backgroundColor: "var(--color-surface-elevated)",
        borderColor: "var(--color-border-default)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-none)",
    },

    accent: {
        backgroundColor: "var(--color-surface-accent)",
        borderColor: "var(--color-border-interactive)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-none)",
    },

    danger: {
        backgroundColor: "var(--color-surface-danger)",
        borderColor: "var(--color-state-danger)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-none)",
    },

    brutalist: {
        backgroundColor: "var(--color-surface-elevated)",
        borderColor: "var(--color-border-strong)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-brutalist)",
    },

    floating: {
        backgroundColor: "var(--color-surface-floating)",
        borderColor: "var(--color-border-default)",
        borderWidth: "var(--border-width-1)",
        borderStyle: "var(--border-style-solid)",
        boxShadow: "var(--shadow-floating)",
    },
} as const;

export type SemanticSurfaces = typeof semanticSurfaces;
export type SurfaceTone = keyof typeof semanticSurfaces;