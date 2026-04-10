import { type InlineProps } from "./inline.types";

export const getInlineClassNames = ({
    space = 0,
    align,
    justify,
    wrap,
    reverse,
}: InlineProps): string[] => {
    const classes: string[] = ["inline", `inline-${space}`];

    if (align) {
        classes.push(`inline-align${capitalize(align)}`);
    }

    if (justify) {
        classes.push(`inline-justify${capitalize(justify)}`);
    }

    if (wrap) {
        classes.push("inline-wrap");
    }

    if (reverse) {
        classes.push("inline-reverse");
    }

    return classes;
};

const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);