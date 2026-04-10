export type ClusterSpace =
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

export type ClusterAlign =
    | "start"
    | "centre"
    | "end"
    | "baseline"
    | "stretch";

export type ClusterJustify =
    | "start"
    | "centre"
    | "end"
    | "between";

export type ClusterProps = {
    space?: ClusterSpace;
    align?: ClusterAlign;
    justify?: ClusterJustify;
    className?: string;
};