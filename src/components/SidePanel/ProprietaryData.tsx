import { formatConfidenceScore, getUniqueSpeciesCount } from "../../lib/formatters";
import { Badge, Box, Card, Stack, Text } from "../../styles";
import { SpeciesBreakdownPieChart } from "../SpeciesCards/SpeciesBreakdownPieChart";
import { MetricRow } from "./MetricRow";
import { SpeciesGroupList } from "./SpeciesGroupList";
import type { ProprietarySectionProps } from "./types"
import "./style";

export const ProprietarySection = ({
    state,
    observations,
    speciesGroups,
    speciesBreakdown,
    highestConfidenceObservation,
    averageNdsiScore,
    ndsiScores,
    imageMap,
    loadingMap,
}: ProprietarySectionProps) => {
    if (!state.proprietary) return null

    return (
    <Box as="section" surface="transparent">
        <Stack space={16}>
        <Text role="featureLabel">Proprietary data</Text>

        {state.isLoadingObserved ? (
            <Text role="body" tone="secondary">Loading proprietary observations…</Text>
        ) : (
            <>
            <Card tone="elevated" padding="md">
                <Stack space={12}>
                <Text role="bodyLarge">{state.proprietary.siteName}</Text>

                <Text role="body" tone="secondary">
                    {state.proprietary.summary}
                </Text>

                <MetricRow
                    label="Capture sources"
                    value={
                    state.proprietary.sources.length > 0
                        ? state.proprietary.sources.join(', ')
                        : 'Unavailable'
                    }
                />

                <MetricRow
                    label="Observations in window"
                    value={observations.length}
                />

                <MetricRow
                    label="Unique species in window"
                    value={getUniqueSpeciesCount(observations)}
                />

                <MetricRow
                    label="Species cards"
                    value={speciesGroups.length}
                />

                <MetricRow
                    label="Highest confidence"
                    value={
                    highestConfidenceObservation ? (
                        <Badge
                        style={{
                            background: 'var(--green-strong)',
                            color: 'white',
                        }}
                        >
                        {highestConfidenceObservation.commonName} ·{' '}
                        {formatConfidenceScore(
                            highestConfidenceObservation.confidence,
                        )}
                        </Badge>
                    ) : (
                        'Unavailable'
                    )
                    }
                />

                <MetricRow
                    label="Average NDSI"
                    value={
                    averageNdsiScore === null
                        ? 'Unavailable'
                        : averageNdsiScore.toFixed(3)
                    }
                />

                <MetricRow
                    label="NDSI coverage"
                    value={`${ndsiScores.length}/${observations.length}`}
                />
                </Stack>
            </Card>

            <SpeciesBreakdownPieChart
                title="Proprietary species overview"
                observationsLabel="proprietary observations"
                items={speciesBreakdown}
            />

            <SpeciesGroupList
                groups={speciesGroups}
                imageMap={imageMap}
                loadingMap={loadingMap}
                emptyMessage="No proprietary observations fall within the selected time window."
            />
            </>
        )}
        </Stack>
    </Box>
    )
}