export const semanticTypography = {
    display: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-64)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-87)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    sectionHeading: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-48)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-100)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    subheadingLarge: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-40)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-100)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    subheading: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-28)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-120)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    cardTitle: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-24)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-120)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    featureLabel: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-20)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-120)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    bodyLarge: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-18)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-120)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    body: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-16)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-150)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    bodySmall: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-15)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-163)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    caption: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-14)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-163)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    label: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-13)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-150)",
        letterSpacing: "var(--letter-spacing-normal)",
    },

    tag: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-12)",
        fontWeight: "var(--font-weight-medium)",
        lineHeight: "var(--line-height-100)",
        letterSpacing: "var(--letter-spacing-overline)",
        textTransform: "uppercase",
    },

    micro: {
        fontFamily: "var(--font-family-sans)",
        fontSize: "var(--font-size-12)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-100)",
        letterSpacing: "var(--letter-spacing-overline)",
    },

    codeBody: {
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-16)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-150)",
        letterSpacing: "var(--letter-spacing-code-body)",
    },

    codeSmall: {
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-14)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-150)",
        letterSpacing: "var(--letter-spacing-code-small)",
    },

    codeCaption: {
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-12)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-150)",
        letterSpacing: "var(--letter-spacing-code-small)",
    },

    codeOverline: {
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-14)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-143)",
        letterSpacing: "var(--letter-spacing-code-overline)",
        textTransform: "uppercase",
    },

    codeMicro: {
        fontFamily: "var(--font-family-mono)",
        fontSize: "var(--font-size-11)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-133)",
        letterSpacing: "var(--letter-spacing-code-micro)",
        textTransform: "uppercase",
    },

    codeNano: {
        fontFamily: "var(--font-family-monoSystem)",
        fontSize: "var(--font-size-10)",
        fontWeight: "var(--font-weight-regular)",
        lineHeight: "var(--line-height-133)",
        letterSpacing: "var(--letter-spacing-code-nano)",
        textTransform: "uppercase",
    },
} as const;

export type SemanticTypography = typeof semanticTypography;
export type TypographyRole = keyof typeof semanticTypography;