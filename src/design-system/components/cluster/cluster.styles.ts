import { type ClusterProps } from "./cluster.types";

export const getClusterClassNames = ({
    space = 0,
    align,
    justify,
}: ClusterProps): string[] => {
    const classes: string[] = ["cluster", `cluster-${space}`];

    if (align) {
        classes.push(`cluster-align${capitalize(align)}`);
    }

    if (justify) {
        classes.push(`cluster-justify${capitalize(justify)}`);
    }

    return classes;
};

const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);