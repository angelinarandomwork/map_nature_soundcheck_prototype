import { type ElementType, type ReactElement, forwardRef } from "react";
import { getClusterClassNames } from "./cluster.styles";
import { type ClusterProps as ClusterOwnProps } from "./cluster.types";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type ClusterProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    ClusterOwnProps
>;

type ClusterComponent = <T extends ElementType = "div">(
    props: ClusterProps<T>,
) => ReactElement | null;

const ClusterInner = <T extends ElementType = "div">(
    { as, className, space, align, justify, ...rest }: ClusterProps<T>,
    ref: PolymorphicRef<T>,
): ReactElement | null => {
    const Component = as || "div";

    const classes = classNames(
        ...getClusterClassNames({
            space,
            align,
            justify,
            }),
        className,
    );

    return <Component ref={ref} className={classes} {...rest} />;
};

const ClusterBase = forwardRef(ClusterInner as never);
ClusterBase.displayName = "Cluster";

export const Cluster = ClusterBase as unknown as ClusterComponent;
