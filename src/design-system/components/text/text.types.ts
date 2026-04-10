import { type TypographyRole } from "../../tokens";

export type TextTone =
    | "primary"
    | "secondary"
    | "muted"
    | "inverse"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "disabled";

export type TextAlign = "left" | "centre" | "right";

export type TextWrap =
    | "wrap"
    | "nowrap"
    | "truncate"
    | "balance"
    | "pretty"
    | "breakWord"
    | "breakAll";

export type TextProps = {
    role?: TypographyRole;
    tone?: TextTone;
    align?: TextAlign;
    wrap?: TextWrap;
    uppercase?: boolean;
    className?: string;
};