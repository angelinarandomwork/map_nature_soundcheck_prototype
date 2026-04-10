import { type StackProps } from "./stack.types";

export const getStackClassNames = ({
    space = 0,
    align,
    justify,
    reverse,
}: StackProps): string[] => {
    const classes: string[] = ["stack"];

    classes.push(`stack-${space}`);

    if (align) {
        classes.push(`stack-align${capitalize(align)}`);
    }

    if (justify) {
        classes.push(`stack-justify${capitalize(justify)}`);
    }

    if (reverse) {
        classes.push("stack-reverse");
    }

    return classes;
};

const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);