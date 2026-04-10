export const rawZIndex = {
    base: 0,
    raised: 10,
    sticky: 100,
    overlay: 200,
    modal: 300,
    popover: 400,
    toast: 500,
} as const;

export type RawZIndex = typeof rawZIndex;