import { type ElementType, type ReactElement, forwardRef } from "react";
import { getBoxClassNames } from "./box.styles";
import { type BoxProps as BoxOwnProps } from "./box.types";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type BoxProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    BoxOwnProps
>;

type BoxComponent = <T extends ElementType = "div">(
    props: BoxProps<T>,
) => ReactElement | null;

const BoxInner = <T extends ElementType = "div">(
    {
        as,
        className,
        surface,
        radius,
        border,
        shadow,
        padding,
        interactive,
        focusable,
        ...rest
    }: BoxProps<T>,
    ref: PolymorphicRef<T>,
    ): ReactElement | null => {
    const Component = as || "div";

    const classes = classNames(
        ...getBoxClassNames({
        surface,
        radius,
        border,
        shadow,
        padding,
        interactive,
        focusable,
        }),
        className,
    );

    return <Component ref={ref} className={classes} {...rest} />;
};

const BoxBase = forwardRef(BoxInner as never);
BoxBase.displayName = "Box";

export const Box = BoxBase as unknown as BoxComponent;
