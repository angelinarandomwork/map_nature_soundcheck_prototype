import { type ElementType, type ReactElement, forwardRef } from "react";
import { getInlineClassNames } from "./inline.styles";
import { type InlineProps as InlineOwnProps } from "./inline.types";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type InlineProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    InlineOwnProps
>;

type InlineComponent = <T extends ElementType = "div">(
    props: InlineProps<T>,
) => ReactElement | null;

const InlineInner = <T extends ElementType = "div">(
    {
        as,
        className,
        space,
        align,
        justify,
        wrap,
        reverse,
        ...rest
    }: InlineProps<T>,
    ref: PolymorphicRef<T>,
    ): ReactElement | null => {
    const Component = as || "div";

    const classes = classNames(
        ...getInlineClassNames({
            space,
            align,
            justify,
            wrap,
            reverse,
            }),
            className,
        );

    return <Component ref={ref} className={classes} {...rest} />;
};

const InlineBase = forwardRef(InlineInner as never);
InlineBase.displayName = "Inline";

export const Inline = InlineBase as unknown as InlineComponent;
