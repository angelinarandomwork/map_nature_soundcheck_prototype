export type StackSpace =
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
    | 32
    | 40
    | 48
    | 56
    | 64;

export type StackAlign =
    | "start"
    | "centre"
    | "end"
    | "stretch";

export type StackJustify =
    | "start"
    | "centre"
    | "end"
    | "between";

export type StackProps = {
    space?: StackSpace;
    align?: StackAlign;
    justify?: StackJustify;
    reverse?: boolean;
    className?: string;
};