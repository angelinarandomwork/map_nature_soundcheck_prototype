export const rawMotion = {
    duration: {
        instant: "0ms",
        fast: "100ms",
        base: "160ms",
        moderate: "240ms",
        slow: "320ms",
    },

    easing: {
        linear: "linear",
        standard: "cubic-bezier(0.2, 0, 0, 1)",
        easeOut: "cubic-bezier(0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },

    transition: {
        base: "all 160ms cubic-bezier(0.2, 0, 0, 1)",
        fast: "all 100ms cubic-bezier(0.2, 0, 0, 1)",
        color: "color 160ms cubic-bezier(0.2, 0, 0, 1), background-color 160ms cubic-bezier(0.2, 0, 0, 1), border-color 160ms cubic-bezier(0.2, 0, 0, 1)",
        opacity: "opacity 160ms cubic-bezier(0.2, 0, 0, 1)",
        transform: "transform 160ms cubic-bezier(0.2, 0, 0, 1)",
    },
} as const;

export type RawMotion = typeof rawMotion;