import type { SpeciesBreakdownItem, SpeciesObservationGroup } from "../../entities";

export type PieChartInfo = {
    title: string;
    observationsLabel: string;
    items: Array<SpeciesBreakdownItem>;
};

export type PieSegment =
    | (SpeciesBreakdownItem & {
        colour: string;
        shape: "path";
        path: string;
        })
    | (SpeciesBreakdownItem & {
        colour: string;
        shape: "circle";
        });

export type SpeciesCardInfo = {
    group: SpeciesObservationGroup
    imageUrl: string | null
    isImageResolving: boolean
}

export type AudioState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'ready'; url: string }
    | { status: 'unavailable' }

export type ExternalIcon = {
    href: string;
    ariaLabel: string;
    children: React.ReactNode;
};
