import type { ReactNode } from "react";

export type TextParallaxContentProps = {
    imgUrl: string;
    subheading: string;
    heading: string;
    children: ReactNode;
};

export type StickyImageProps = {
    imgUrl: string;
};

export type OverlayCopyProps = {
    subheading: string;
    heading: string;
};
