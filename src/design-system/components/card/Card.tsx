import { type ElementType, type ReactElement, forwardRef } from "react";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type CardTone =
    | "base"
    | "elevated"
    | "brutalist"
    | "floating"
    | "accent"
    | "danger";

type CardPadding = "none" | "sm" | "md" | "lg";

type CardOwnProps = {
    tone?: CardTone;
    padding?: CardPadding;
    interactive?: boolean;
    className?: string;
};

type CardProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    CardOwnProps
>;

type CardComponent = <T extends ElementType = "div">(
    props: CardProps<T>,
) => ReactElement | null;

const CardInner = <T extends ElementType = "div">(
    {
        as,
        className,
        tone = "base",
        padding = "md",
        interactive,
        ...rest
    }: CardProps<T>,
    ref: PolymorphicRef<T>,
): ReactElement | null => {
    const Component = as || "div";

    const classes = classNames(
        "card",
        `card-${tone}`,
        `card-padding${capitalize(padding)}`,
        interactive && "card-interactive",
        className,
    );

    return <Component ref={ref} className={classes} {...rest} />;
};

const CardBase = forwardRef(CardInner as never);
CardBase.displayName = "Card";

export const Card = CardBase as unknown as CardComponent;

const capitalize = (value: string): string =>
    value.charAt(0).toUpperCase() + value.slice(1);
