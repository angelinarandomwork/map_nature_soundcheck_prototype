import { useMemo, type JSX } from "react";
import { Box, Card, Inline, Stack, Text } from "../../styles";
import { toPercentage } from "../../lib/formatters";
import type { PieChartInfo, PieSegment } from "./types";
import { chartColours, FULL_CIRCLE_THRESHOLD, MAX_VISIBLE_SPECIES, PIE_CHART_CENTRE, PIE_CHART_INNER_RADIUS, PIE_CHART_RADIUS, PIE_CHART_VIEW_BOX } from "./styles";
import type { SpeciesBreakdownItem } from "../../entities";

const isFullCircle = (percentage: number): boolean => percentage >= FULL_CIRCLE_THRESHOLD;

const polarToCartesian = (
  centreX: number,
  centreY: number,
  radius: number,
  angleInDegrees: number,
): { x: number; y: number } => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: centreX + radius * Math.cos(angleInRadians),
    y: centreY + radius * Math.sin(angleInRadians),
  };
};

const describePieSlice = (
  centreX: number,
  centreY: number,
  radius: number,
  startAngle: number,
  endAngle: number,
): string => {
  const arcStart = polarToCartesian(centreX, centreY, radius, endAngle);
  const arcEnd = polarToCartesian(centreX, centreY, radius, startAngle);
  const isLargeArc = endAngle - startAngle > 180 ? "1" : "0";

  return [
    `M ${centreX} ${centreY}`,
    `L ${arcStart.x} ${arcStart.y}`,
    `A ${radius} ${radius} 0 ${isLargeArc} 0 ${arcEnd.x} ${arcEnd.y}`,
    "Z",
  ].join(" ");
};

const sumPercentages = (items: Array<SpeciesBreakdownItem>): number => items.reduce((total, item) => total + item.percentage, 0);
const sumObservationCount = (items: Array<SpeciesBreakdownItem>): number => items.reduce((total, item) => total + item.observationCount, 0);

const createOtherSpeciesItem = (
  items: Array<SpeciesBreakdownItem>,
  percentage: number,
): SpeciesBreakdownItem => ({
  scientificName: "other",
  commonName: "Other species",
  observationCount: sumObservationCount(items),
  percentage,
});

const buildChartItems = (
  items: Array<SpeciesBreakdownItem>,
  maxVisibleSpecies: number,
): Array<SpeciesBreakdownItem> => {
  const visibleItems = items.slice(0, maxVisibleSpecies);
  const remainingItems = items.slice(maxVisibleSpecies);
  const remainingPercentage = Math.max(0, 1 - sumPercentages(visibleItems));

  if (remainingItems.length === 0 || remainingPercentage <= 0) return visibleItems;

  return [
    ...visibleItems,
    createOtherSpeciesItem(remainingItems, remainingPercentage),
  ];
};

const buildPieSegments = (items: Array<SpeciesBreakdownItem>): Array<PieSegment> => {
  let currentAngle = 0;

  return items.map((item, index) => {
    const colour = chartColours[index % chartColours.length];

    if (isFullCircle(item.percentage)) {
      return {
        ...item,
        colour,
        shape: "circle",
      };
    }

    const sweepAngle = item.percentage * 360;
    const nextAngle = currentAngle + sweepAngle;
    const path = describePieSlice(
      PIE_CHART_CENTRE,
      PIE_CHART_CENTRE,
      PIE_CHART_RADIUS,
      currentAngle,
      nextAngle,
    );

    currentAngle = nextAngle;

    return {
      ...item,
      colour,
      shape: "path",
      path,
    };
  });
};

const getSegmentKey = (scientificName: string, commonName: string): string => `${scientificName}-${commonName}`;

const PieChartGraphic = ({
  title,
  segments,
}: {
  title: string;
  segments: Array<PieSegment>;
}): JSX.Element => (
  <Box
    as="div"
    style={{
      width: 140,
      height: 140,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      viewBox={`0 0 ${PIE_CHART_VIEW_BOX} ${PIE_CHART_VIEW_BOX}`}
      width="120"
      height="120"
      aria-label={title}
    >
      {segments.map((segment) => {
        const key = getSegmentKey(segment.scientificName, segment.commonName);

        if (segment.shape === "circle") {
          return (
            <circle
              key={key}
              cx={PIE_CHART_CENTRE}
              cy={PIE_CHART_CENTRE}
              r={PIE_CHART_RADIUS}
              fill={segment.colour}
              stroke="var(--white)"
              strokeWidth="1.5"
            />
          );
        }

        return (
          <path
            key={key}
            d={segment.path}
            fill={segment.colour}
            stroke="var(--white)"
            strokeWidth="1.5"
          />
        );
      })}
      <circle
        cx={PIE_CHART_CENTRE}
        cy={PIE_CHART_CENTRE}
        r={PIE_CHART_INNER_RADIUS}
        fill="var(--white)"
      />
    </svg>
  </Box>
);

const PieChartLegend = ({segments}: {segments: Array<PieSegment>}): JSX.Element => (
  <Stack space={8}>
    {segments.map((segment) => (
      <Inline
        key={`${getSegmentKey(segment.scientificName, segment.commonName)}-legend`}
        align="center"
        justify="between"
        space={12}
        wrap
      >
        <Inline align="center" space={8}>
          <Box
            as="span"
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: segment.colour,
              display: "inline-block",
            }}
          />
          <Text role="body">{segment.commonName}</Text>
        </Inline>
        <Text role="label">
          {toPercentage(segment.percentage)} · {segment.observationCount}
        </Text>
      </Inline>
    ))}
  </Stack>
);

const EmptyState = (): JSX.Element => (<Text role="body" tone="secondary">No observations are available for this overview.</Text>);

export const SpeciesBreakdownPieChart = ({
  title,
  observationsLabel,
  items,
}: PieChartInfo): JSX.Element => {
  const segments = useMemo(() => {
    const chartItems = buildChartItems(items, MAX_VISIBLE_SPECIES);
    return buildPieSegments(chartItems);
  }, [items]);

  return (
    <Card tone="elevated" padding="md">
      <Stack space={16}>
        <Stack space={4}>
          <Text role="bodyLarge">{title}</Text>
          <Text role="body" tone="secondary">Percentage of {observationsLabel} by species within the selected time window.</Text>
        </Stack>

        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <Inline align="start" space={20} wrap>
            <PieChartGraphic title={title} segments={segments} />
            <PieChartLegend segments={segments} />
          </Inline>
        )}
      </Stack>
    </Card>
  );
};