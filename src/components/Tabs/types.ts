import type { ReactNode } from "react";

export type Tab = {
    children?: ReactNode;
    index: number;
    value: number;
};