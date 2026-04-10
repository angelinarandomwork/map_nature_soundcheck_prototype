export type InlineSpace =
    | 0
    | 1
    | 2
    | 4
    | 6
    | 8
    | 10
    | 12
    | 14
    | 16
    | 18
    | 20
    | 24
    | 30
    | 32;

export type InlineAlign =
    | "start"
    | "centre"
    | "end"
    | "baseline"
    | "stretch";

export type InlineJustify =
    | "start"
    | "centre"
    | "end"
    | "between";

export type InlineProps = {
    space?: InlineSpace;
    align?: InlineAlign;
    justify?: InlineJustify;
    wrap?: boolean;
    reverse?: boolean;
    className?: string;
};