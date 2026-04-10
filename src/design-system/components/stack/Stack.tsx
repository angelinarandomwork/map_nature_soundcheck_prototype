import { type ElementType, type ReactElement, forwardRef } from "react";
import { getStackClassNames } from "./stack.styles";
import { type StackProps as StackOwnProps } from "./stack.types";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type StackProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    StackOwnProps
>;

type StackComponent = <T extends ElementType = "div">(
    props: StackProps<T>,
) => ReactElement | null;

const StackInner = <T extends ElementType = "div">(
    { as, className, space = 0, align, justify, reverse, ...rest }: StackProps<T>,
        ref: PolymorphicRef<T>,
    ): ReactElement | null => {
    const Component = as || "div";

    const classes = classNames(
        ...getStackClassNames({
            space,
            align,
            justify,
            reverse,
            }),
            className,
        );

    return <Component ref={ref} className={classes} {...rest} />;
};

const StackBase = forwardRef(StackInner as never);
StackBase.displayName = "Stack";

export const Stack = StackBase as unknown as StackComponent;
