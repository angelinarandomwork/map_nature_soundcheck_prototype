import { useEffect, useMemo, useState } from "react";
import Slider from "@mui/material/Slider";
import {
  clampTimeRange,
  formatUnixToDisplayDateTime,
  HOUR_IN_MS,
  MINUTE_IN_MS,
} from "../../lib/formatters";
import type { TimeRangeSliderFilterProps } from "./types";
import { Card, Inline, Stack, Text } from "../../styles";
import { siderColours } from "./styles";

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

  const sliderStep = useMemo(() => {
    const totalSpan = Math.max(maxDateTime - minDateTime, MINUTE_IN_MS);
    if (totalSpan <= 6 * HOUR_IN_MS) return MINUTE_IN_MS;
    if (totalSpan <= 3 * 24 * HOUR_IN_MS) return 15 * MINUTE_IN_MS;
    return HOUR_IN_MS;
  }, [maxDateTime, minDateTime]);

  return (
    <Card tone="elevated" padding="md">
      <Stack space={12}>
        <Inline justify="between" align="center">
          <Text role="label" tone="muted">
            {" "}
            Observation Window{" "}
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
          disableSwap
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatUnixToDisplayDateTime(value)}
          sx={siderColours}
          onChange={(_, value) => {
            if (!Array.isArray(value) || value.length !== 2) return;

            const nextRange = clampTimeRange(
              { earliestDateTime: value[0], latestDateTime: value[1] },
              minDateTime,
              maxDateTime,
            );

            setDraftRange([
              nextRange.earliestDateTime,
              nextRange.latestDateTime,
            ]);
          }}
          onChangeCommitted={(_, value) => {
            if (!Array.isArray(value) || value.length !== 2) return;

            const nextRange = clampTimeRange(
              { earliestDateTime: value[0], latestDateTime: value[1] },
              minDateTime,
              maxDateTime,
            );

            void onRangeCommit(nextRange);
          }}
          getAriaValueText={(value) => formatUnixToDisplayDateTime(value)}
        />
      </Stack>
    </Card>
  );
};
