import { type BoxProps } from "./box.types";

export const getBoxClassNames = ({
    surface = "transparent",
    radius = "container",
    border,
    shadow,
    padding,
    interactive,
    focusable,
}: BoxProps): string[] => {
    const classes: string[] = ["surface"];

    classes.push(`surface-${surface}`);

    if (radius) {
        classes.push(`surface-radius${capitalize(radius)}`);
    }

    if (border) {
        classes.push(`surface-border${capitalize(border)}`);
    }

    if (shadow) {
        classes.push(`surface-shadow${capitalize(shadow)}`);
    }

    if (padding) {
        classes.push(`card-padding${capitalize(padding)}`);
    }

    if (interactive) {
        classes.push("surface-interactive");
    }

    if (focusable) {
        classes.push("surface-focusable");
    }

    return classes;
};

const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);