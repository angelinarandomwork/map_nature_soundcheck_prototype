export const semanticStates = {
    success: {
        backgroundColor: "var(--color-state-success)",
        textColor: "var(--color-text-success)",
        borderColor: "var(--color-state-success)",
    },

    warning: {
        backgroundColor: "var(--color-state-warning)",
        textColor: "var(--color-text-warning)",
        borderColor: "var(--color-state-warning)",
    },

    danger: {
        backgroundColor: "var(--color-state-danger)",
        textColor: "var(--color-text-danger)",
        borderColor: "var(--color-state-danger)",
    },

    info: {
        backgroundColor: "var(--color-state-info)",
        textColor: "var(--color-text-info)",
        borderColor: "var(--color-state-info)",
    },

    neutral: {
        backgroundColor: "var(--color-surface-base)",
        textColor: "var(--color-text-secondary)",
        borderColor: "var(--color-border-default)",
    },

    selected: {
        backgroundColor: "var(--color-interaction-selected)",
        textColor: "var(--color-text-primary)",
        borderColor: "var(--color-border-interactive)",
    },

    disabled: {
        backgroundColor: "var(--color-interaction-disabled)",
        textColor: "var(--color-text-disabled)",
        borderColor: "var(--color-border-subtle)",
    },
} as const;

export type SemanticStates = typeof semanticStates;
export type StateTone = keyof typeof semanticStates;