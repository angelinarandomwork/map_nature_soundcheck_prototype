import { type ElementType, forwardRef, type ReactElement } from "react";
import { classNames } from "../../utils/classNames";
import {
    type PolymorphicComponentPropsWithRef,
    type PolymorphicRef,
} from "../../utils/polymorphic";

type BadgeTone =
    | "neutral"
    | "subtle"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info";

type BadgeSize = "sm" | "md" | "lg";

type BadgeOwnProps = {
    tone?: BadgeTone;
    size?: BadgeSize;
    interactive?: boolean;
    disabled?: boolean;
    className?: string;
};

type BadgeProps<T extends ElementType> = PolymorphicComponentPropsWithRef<
    T,
    BadgeOwnProps
>;

type BadgeComponent = <T extends ElementType = "span">(
    props: BadgeProps<T>,
) => ReactElement | null;

const BadgeInner = <T extends ElementType = "span">(
    {
        as,
        className,
        tone = "neutral",
        size = "md",
        interactive,
        disabled,
        ...rest
    }: BadgeProps<T>,
    ref: PolymorphicRef<T>,
    ): ReactElement | null => {
    const Component = as || "span";

    const classes = classNames(
        "badge",
        `badge-${size}`,
        `badge-${tone}`,
        interactive && "badge-interactive",
        disabled && "badge-disabled",
        className,
    );

    return <Component ref={ref} className={classes} {...rest} />;
};

const BadgeBase = forwardRef(BadgeInner as never);
BadgeBase.displayName = "Badge";

export const Badge = BadgeBase as unknown as BadgeComponent;
