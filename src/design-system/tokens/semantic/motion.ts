export const semanticMotion = {
    interaction: {
        hover: "var(--motion-transition-color)",
        press: "var(--motion-transition-fast)",
        emphasis: "var(--motion-transition-base)",
    },

    state: {
        change: "var(--motion-transition-color)",
        visibility: "var(--motion-transition-opacity)",
    },

    surface: {
        enter:
            "transform var(--motion-duration-base) var(--motion-easing-standard), opacity var(--motion-duration-base) var(--motion-easing-standard)",
        exit:
            "transform var(--motion-duration-fast) var(--motion-easing-standard), opacity var(--motion-duration-fast) var(--motion-easing-standard)",
    },

    overlay: {
        backdrop:
            "opacity var(--motion-duration-base) var(--motion-easing-standard)",
        panelEnter:
            "transform var(--motion-duration-base) var(--motion-easing-standard), opacity var(--motion-duration-base) var(--motion-easing-standard)",
        panelExit:
            "transform var(--motion-duration-fast) var(--motion-easing-standard), opacity var(--motion-duration-fast) var(--motion-easing-standard)",
    },

    feedback: {
        focus:
            "outline-color var(--motion-duration-fast) var(--motion-easing-standard)",
        selection:
            "background-color var(--motion-duration-fast) var(--motion-easing-standard), border-color var(--motion-duration-fast) var(--motion-easing-standard)",
    },
} as const;

export type SemanticMotion = typeof semanticMotion;