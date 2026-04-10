import { type TextProps } from "./text.types";

export const getTextClassNames = ({
    role = "body",
    tone = "primary",
    align,
    wrap,
    uppercase,
}: TextProps): string[] => {
    const classes: string[] = ["text"];

    classes.push(`text-${role}`);
    classes.push(`text-${tone}`);

    if (align) {
        classes.push(`text-${align}`);
    }

    if (wrap) {
        classes.push(getWrapClass(wrap));
    }

    if (uppercase) {
        classes.push("text-uppercase");
    }

    return classes;
};

const getWrapClass = (wrap: NonNullable<TextProps["wrap"]>): string => {
    switch (wrap) {
        case "nowrap":
            return "text-nowrap";
        case "truncate":
            return "text-truncate";
        case "balance":
            return "text-balance";
        case "pretty":
            return "text-pretty";
        case "breakWord":
            return "text-breakWord";
        case "breakAll":
            return "text-breakAll";
        default:
            return "";
    }
};