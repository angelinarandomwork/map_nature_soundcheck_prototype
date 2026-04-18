import { getUniqueSpeciesCount } from "../../lib/formatters.ts";
import { Box, Card, Stack, Text } from "../../styles/index.ts";
import { ScoreBadge } from "../Badge/ScoreBadge.tsx";
import { SpeciesBreakdownPieChart } from "../SpeciesCards/SpeciesBreakdownPieChart.tsx";
import { MetricRow } from "./MetricRow.tsx";
import { SourceSummaryList } from "./SourceSummaryList.tsx";
import { SpeciesGroupList } from "./SpeciesGroupList.tsx";
import type { ExternalSectionProps } from "./types.ts";

export const ExternalSection = ({
    state,
    speciesGroups,
    speciesBreakdown,
    imageMap,
    loadingMap,
}: ExternalSectionProps) => {
  return (
    <Box as="section" surface="transparent">
      <Stack space={16}>
        <Text role="featureLabel">External data</Text>

        {state.isLoadingExpected || !state.external ? (
          <Text role="body" tone="secondary">
            Loading external library data…
          </Text>
        ) : (
          <>
            <Card tone="elevated" padding="md">
              <Stack space={12}>
                <ScoreBadge label="Score" value={state.external.score} />

                <MetricRow
                  label="Source libraries"
                  value={
                    state.external.libraries.length > 0
                      ? state.external.libraries.join(', ')
                      : 'None returned'
                  }
                />

                <MetricRow
                  label="Observations in window"
                  value={state.external.observations.length}
                />

                <MetricRow
                  label="Unique species in window"
                  value={getUniqueSpeciesCount(state.external.observations)}
                />

                <MetricRow
                  label="Species cards"
                  value={speciesGroups.length}
                />

                <Text role="body" tone="secondary">
                  {state.external.summary}
                </Text>
              </Stack>
            </Card>

            <SpeciesBreakdownPieChart
              title="External species overview"
              observationsLabel="external observations"
              items={speciesBreakdown}
            />

            <SourceSummaryList summaries={state.external.sourceSummaries} />

            <SpeciesGroupList
              groups={speciesGroups}
              imageMap={imageMap}
              loadingMap={loadingMap}
              emptyMessage="No external observations fall within the selected time window."
            />
          </>
        )}
      </Stack>
    </Box>
  )
}