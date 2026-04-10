import { type ElementType, forwardRef } from "react";
import { getTextClassNames } from "./text.styles";
import { type TextProps } from "./text.types";
import { classNames } from "../../utils/classNames";

type PolymorphicProps<T extends ElementType> = {
    as?: T;
} & TextProps &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps | "as">;

export const Text = forwardRef(
    <T extends ElementType = "p">(
    {
        as,
        className,
        role = "body",
        tone = "primary",
        align,
        wrap,
        uppercase,
        ...rest
    }: PolymorphicProps<T>,
    ref: React.Ref<Element>,
    ) => {
    const Component = as || getDefaultElement(role);

    const classes = classNames(
        ...getTextClassNames({
            role,
            tone,
            align,
            wrap,
            uppercase,
        }),
        className,
    );

        return <Component ref={ref} className={classes} {...rest} />;
    },
);

Text.displayName = "Text";

const getDefaultElement = (role: string): ElementType => {
    switch (role) {
        case "display":
        case "sectionHeading":
            return "h1";
        case "subheadingLarge":
            return "h2";
        case "subheading":
            return "h3";
        case "cardTitle":
            return "h4";
        case "featureLabel":
            return "h5";
        case "label":
            return "label";
        case "caption":
        case "micro":
            return "span";
        default:
            return "p";
    }
};
