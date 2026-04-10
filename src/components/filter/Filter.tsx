import { useEffect, useMemo, useState } from "react";
import Slider from "@mui/material/Slider";
import { Card, Inline, Stack, Text } from "../../design-system";
import type { TimeRange } from "../../types/data";
import {
  clampTimeRange,
  formatUnixToDisplayDateTime,
  HOUR_IN_MS,
  MINUTE_IN_MS,
} from "../../lib/formatters";

export type TimeRangeSliderFilterProps = {
  earliestDateTime: number;
  latestDateTime: number;
  minDateTime: number;
  maxDateTime: number;
  onRangeCommit: (timeRange: TimeRange) => void | Promise<void>;
};

export const Filter = ({
  earliestDateTime,
  latestDateTime,
  minDateTime,
  maxDateTime,
  onRangeCommit,
}: TimeRangeSliderFilterProps) => {
  const [draftRange, setDraftRange] = useState<[number, number]>([
    earliestDateTime,
    latestDateTime,
  ]);

  useEffect(() => {
    setDraftRange([earliestDateTime, latestDateTime]);
  }, [earliestDateTime, latestDateTime]);

  //   const marks = useMemo(() => {
  //     const totalSpan = maxDateTime - minDateTime
  //     const markCount = 4

  //     return Array.from({ length: markCount + 1 }, (_, index) => {
  //       const value = minDateTime + (totalSpan / markCount) * index

  //       return {
  //         value,
  //         label: new Intl.DateTimeFormat('en-GB', {
  //           day: '2-digit',
  //           month: 'short',
  //         }).format(new Date(value)),
  //       }
  //     })
  //   }, [minDateTime, maxDateTime])

  const sliderStep = useMemo(() => {
    const totalSpan = Math.max(maxDateTime - minDateTime, MINUTE_IN_MS)

    if (totalSpan <= 6 * HOUR_IN_MS) {
      return MINUTE_IN_MS
    }

    if (totalSpan <= 3 * 24 * HOUR_IN_MS) {
      return 15 * MINUTE_IN_MS
    }

    return HOUR_IN_MS
  }, [maxDateTime, minDateTime])

  return (
    <Card tone="elevated" padding="md">
      <Stack space={12}>
        <Inline justify="between" align="centre">
          <Text role="label" tone="muted">
            Observation Window
          </Text>
          <Text role="label">
            {formatUnixToDisplayDateTime(draftRange[0])} →{" "}
            {formatUnixToDisplayDateTime(draftRange[1])}
          </Text>
        </Inline>

        <Slider
          value={draftRange}
          min={minDateTime}
          max={maxDateTime}
          step={sliderStep}
          //   marks={marks}
          disableSwap
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatUnixToDisplayDateTime(value)}
          sx={{
            color: "#059669",
            "& .MuiSlider-thumb": {
              backgroundColor: "#059669",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#059669",
            },
            "& .MuiSlider-rail": {
              opacity: 0.3,
            },
            "& .MuiSlider-thumb:hover": {
              boxShadow: "0 0 0 8px rgba(5, 150, 105, 0.16)",
            },
          }}
          onChange={(_, value) => {
            if (!Array.isArray(value) || value.length !== 2) return;

            const nextRange = clampTimeRange(
              {
                earliestDateTime: value[0],
                latestDateTime: value[1],
              },
              minDateTime,
              maxDateTime,
            );

            setDraftRange([
              nextRange.earliestDateTime,
              nextRange.latestDateTime,
            ]);
          }}
          onChangeCommitted={(_, value) => {
            if (!Array.isArray(value) || value.length !== 2) {
              return;
            }

            const nextRange = clampTimeRange(
              {
                earliestDateTime: value[0],
                latestDateTime: value[1],
              },
              minDateTime,
              maxDateTime,
            );

            void onRangeCommit(nextRange);
          }}
          //   getAriaLabel={() => 'Observation date range'}
          getAriaValueText={(value) => formatUnixToDisplayDateTime(value)}
        />
      </Stack>
    </Card>
  );
};
