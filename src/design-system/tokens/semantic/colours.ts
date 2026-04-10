export const semanticColours = {
    background: {
        page: "var(--color-background-page)",
        subtle: "var(--color-background-subtle)",
    },

    surface: {
        base: "var(--color-surface-base)",
        elevated: "var(--color-surface-elevated)",
        floating: "var(--color-surface-floating)",
        accent: "var(--color-surface-accent)",
        danger: "var(--color-surface-danger)",
    },

    text: {
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        inverse: "var(--color-text-inverse)",
        accent: "var(--color-text-accent)",
        success: "var(--color-text-success)",
        warning: "var(--color-text-warning)",
        danger: "var(--color-text-danger)",
        disabled: "var(--color-text-disabled)",
    },

    border: {
        subtle: "var(--color-border-subtle)",
        default: "var(--color-border-default)",
        strong: "var(--color-border-strong)",
        interactive: "var(--color-border-interactive)",
        focus: "var(--color-border-focus)",
    },

    accent: {
        primary: "var(--color-accent-primary)",
        secondary: "var(--color-accent-secondary)",
        glow: "var(--color-accent-glow)",
    },

    state: {
        success: "var(--color-state-success)",
        warning: "var(--color-state-warning)",
        danger: "var(--color-state-danger)",
        info: "var(--color-state-info)",
    },

    interaction: {
        hover: "var(--color-interaction-hover)",
        active: "var(--color-interaction-active)",
        selected: "var(--color-interaction-selected)",
        disabled: "var(--color-interaction-disabled)",
    },
} as const;

export type SemanticColours = typeof semanticColours;