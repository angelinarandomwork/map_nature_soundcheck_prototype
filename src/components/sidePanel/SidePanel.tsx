import { Badge, Box, Card, Inline, Stack, Text } from "../../design-system";
import {
  formatConfidenceScore,
  getHighestConfidenceObservation,
  getUniqueSpeciesCount,
  toFixedCoordinate,
  toPercentage,
} from "../../lib/formatters";
import { ScoreBadge } from "./ScoreBadge";
import { Filter } from "../filter/Filter";
import type { SidePanelProps } from "../../types/components";
import { useSpeciesImages } from "../../hooks/useSpeciesImages";
import { SpeciesCard } from "./SpeciesCard";

const panelStyle: React.CSSProperties = {
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#e0f7f7b0",
};

export const SidePanel = ({
    state,
    minDateTime,
    maxDateTime,
    onTimeRangeChange,
}: SidePanelProps) => {
    const hasSelection = Boolean(state.coordinates);
    const proprietaryObservations = state.proprietary?.observations ?? [];
    const highestConfidenceObservation = getHighestConfidenceObservation(
        proprietaryObservations,
    );
    const { imageMap, loadingMap } = useSpeciesImages(
        proprietaryObservations.map((observation) => observation.scientificName),
    );

    return (
        <Box
            as="aside"
            surface="subtle"
            padding="lg"
            radius="container"
            style={panelStyle}
        >
        <Stack space={24}>
            <Stack space={16}>
            <Text role="subheading">Bioacoustic Sound Check</Text>
            <Text role="body" tone="secondary">
                Select anywhere on the map to see bioacoustic data. Select a marker
                to see recorded bioacoustic data.
            </Text>
            <Filter
                earliestDateTime={state.earliestDateTime}
                latestDateTime={state.latestDateTime}
                minDateTime={minDateTime}
                maxDateTime={maxDateTime}
                onRangeCommit={onTimeRangeChange}
            />
            </Stack>

            {!hasSelection ? (
            <Card tone="elevated" padding="md">
                <Stack space={8}>
                <Text role="label" tone="muted">
                    Map status
                </Text>
                <Text role="body">
                    {state.isLoadingMapPoints
                    ? "Loading proprietary markers…"
                    : `${state.proprietaryDataPoints.length} proprietary points ready`}
                </Text>
                </Stack>
            </Card>
            ) : (
            <>
                <Box as="section" surface="transparent">
                <Stack space={6}>
                    <Inline justify="between" align="centre">
                    <Text role="featureLabel">Selected location</Text>
                    </Inline>
                    {state.coordinates ? (
                    <Text role="body">
                        {toFixedCoordinate(state.coordinates.lat)},{" "}
                        {toFixedCoordinate(state.coordinates.lon)}
                    </Text>
                    ) : null}
                </Stack>
                </Box>

                {state.errorMessage ? (
                <Box
                    as="section"
                    surface="danger"
                    padding="md"
                    radius="container"
                    className="state state-danger"
                >
                    <Text role="body">{state.errorMessage}</Text>
                </Box>
                ) : null}

                {state.proprietary ? (
                <Box as="section" surface="transparent">
                    <Stack space={16}>
                    <Text role="featureLabel">Proprietary data</Text>
                    {state.isLoadingObserved ? (
                        <Text role="body" tone="secondary">
                        Loading proprietary observations…
                        </Text>
                    ) : (
                        <>
                        <Card tone="elevated" padding="md">
                            <Stack space={12}>
                            <Inline justify="between" align="centre">
                                <Text role="bodyLarge">
                                {state.proprietary.siteName}
                                </Text>
                            </Inline>
                            <Inline justify="between" align="centre">
                                <Text role="body" tone="secondary">
                                Capture sources
                                </Text>
                                <Text role="label">
                                {state.proprietary.sources.length > 0
                                    ? state.proprietary.sources.join(", ")
                                    : "Unavailable"}
                                </Text>
                            </Inline>
                            <Inline justify="between" align="centre">
                                <Text role="body" tone="secondary">
                                Observations in window
                                </Text>
                                <Text role="label">
                                {proprietaryObservations.length}
                                </Text>
                            </Inline>
                            <Inline justify="between" align="centre">
                                <Text role="body" tone="secondary">
                                Unique species in window
                                </Text>
                                <Text role="label">
                                {getUniqueSpeciesCount(proprietaryObservations)}
                                </Text>
                            </Inline>
                            <Inline justify="between" align="centre">
                                <Text role="body" tone="secondary">
                                Highest confidence
                                </Text>
                                {highestConfidenceObservation ? (
                                <Badge
                                    style={{
                                    backgroundColor:
                                        "var(--color-state-warning-strong)",
                                    color: "white",
                                    }}
                                >
                                    {highestConfidenceObservation.commonName} ·{" "}
                                    {formatConfidenceScore(
                                    highestConfidenceObservation.confidence,
                                    )}
                                </Badge>
                                ) : (
                                <Text role="label">Unavailable</Text>
                                )}
                            </Inline>
                            <Text role="body" tone="secondary">
                                {state.proprietary.summary}
                            </Text>
                            </Stack>
                        </Card>

                        <Stack space={12}>
                            <Text role="label" tone="muted">
                            Individual observations
                            </Text>

                            {proprietaryObservations.length === 0 ? (
                            <Card tone="elevated" padding="md">
                                <Text role="body" tone="secondary">
                                No proprietary observations fall within the
                                selected time window.
                                </Text>
                            </Card>
                            ) : (
                            proprietaryObservations.map(
                                (observation, observationIndex) => {
                                const speciesImageUrl =
                                    imageMap[observation.scientificName] ?? null;

                                return (
                                    <SpeciesCard
                                    key={`${observation.fileName}-${observation.timestamp}-${observation.scientificName}-${observationIndex}`}
                                    observation={observation}
                                    imageUrl={speciesImageUrl}
                                    isImageResolving={
                                        loadingMap[observation.scientificName] ??
                                        false
                                    }
                                    />
                                );
                                },
                            )
                            )}
                        </Stack>
                        </>
                    )}
                    </Stack>
                </Box>
                ) : null}

                <Box as="section" surface="transparent">
                <Stack space={16}>
                    <Text role="featureLabel">External data</Text>
                    {state.isLoadingExpected || !state.external ? (
                    <Text role="body" tone="secondary">
                        Loading external library data…
                    </Text>
                    ) : (
                    <Card tone="elevated" padding="md">
                        <Stack space={12}>
                        <ScoreBadge label="Score" value={state.external.score} />
                        <Inline justify="between" align="centre">
                            <Text role="body" tone="secondary">
                            Global percentile
                            </Text>
                            <Text role="label">
                            {state.external.percentileGlobal === null
                                ? "Unavailable"
                                : toPercentage(state.external.percentileGlobal)}
                            </Text>
                        </Inline>
                        <Inline justify="between" align="centre">
                            <Text role="body" tone="secondary">
                            Country percentile
                            </Text>
                            <Text role="label">
                            {state.external.percentileCountry === null
                                ? "Unavailable"
                                : toPercentage(state.external.percentileCountry)}
                            </Text>
                        </Inline>
                        <Inline justify="between" align="centre">
                            <Text role="body" tone="secondary">
                            Source libraries
                            </Text>
                            <Text role="label">
                            {state.external.libraries.join(", ")}
                            </Text>
                        </Inline>
                        <Inline justify="between" align="centre">
                            <Text role="body" tone="secondary">
                            Observations in window
                            </Text>
                            <Text role="label">
                            {state.external.observations.length}
                            </Text>
                        </Inline>
                        <Text role="body" tone="secondary">
                            {state.external.summary}
                        </Text>
                        </Stack>
                    </Card>
                    )}
                </Stack>
                </Box>
            </>
            )}
        </Stack>
        </Box>
    );
};
