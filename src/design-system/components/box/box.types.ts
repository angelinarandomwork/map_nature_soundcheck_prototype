export type BoxSurface =
    | "transparent"
    | "page"
    | "subtle"
    | "base"
    | "elevated"
    | "accent"
    | "danger"
    | "brutalist"
    | "floating";

export type BoxRadius =
    | "none"
    | "inline"
    | "container"
    | "overlay"
    | "pill";

export type BoxBorder =
    | "none"
    | "subtle"
    | "default"
    | "strong"
    | "interactive"
    | "danger";

export type BoxShadow =
    | "none"
    | "brutalist"
    | "floating";

export type BoxPadding =
    | "none"
    | "sm"
    | "md"
    | "lg";

export type BoxProps = {
    surface?: BoxSurface;
    radius?: BoxRadius;
    border?: BoxBorder;
    shadow?: BoxShadow;
    padding?: BoxPadding;
    interactive?: boolean;
    focusable?: boolean;
    className?: string;
};