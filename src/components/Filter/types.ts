import type { TimeRange } from "../../entities";

export type TimeRangeSliderFilterProps = {
    earliestDateTime: number;
    latestDateTime: number;
    minDateTime: number;
    maxDateTime: number;
    onRangeCommit: (timeRange: TimeRange) => void | Promise<void>;
};