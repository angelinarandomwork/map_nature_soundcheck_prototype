import { Box, Stack, Card, Text } from "../../styles/index.ts"
import { useSidePanelViewModel } from "../../hooks/useSidePanelViewModel.ts"
import { Filter } from "../Filter/Filter.tsx"
import { ExternalSection } from "./ExternalData.tsx"
import { ProprietarySection } from "./ProprietaryData.tsx"
import { SelectedLocationSection } from "./SelectedLocationSection.tsx"
import { panelStyle } from "./style.ts"
import type { SidePanelProps } from "../../types/components.ts"

export const SidePanel = ({
  state,
  minDateTime,
  maxDateTime,
  onTimeRangeChange,
}: SidePanelProps) => {
  const {
    hasSelection,
    proprietaryObservations,
    proprietarySpeciesGroups,
    proprietarySpeciesBreakdown,
    externalSpeciesGroups,
    externalSpeciesBreakdown,
    highestConfidenceObservation,
    averageNdsiScore,
    ndsiScores,
    pointOrPoints,
    imageMap,
    loadingMap,
  } = useSidePanelViewModel(state)

  return (
    <Box as="aside" surface="subtle" padding="lg" radius="container" style={panelStyle}>
      <Stack space={24}>
        <Stack space={16}>
          <Text role="subheading">Bioacoustic Sound Check</Text>

          <Text role="body" tone="secondary">
            Select anywhere on the map to see biodiversity context. Select a
            proprietary marker to compare your internal detections with nearby
            public observations.
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
                  ? 'Loading proprietary markers…'
                  : `${state.proprietaryDataPoints.length} proprietary ${pointOrPoints} ready`}
              </Text>
            </Stack>
          </Card>
        ) : (
          <>
            <SelectedLocationSection coordinates={state.coordinates} />

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

            <ProprietarySection
              state={state}
              observations={proprietaryObservations}
              speciesGroups={proprietarySpeciesGroups}
              speciesBreakdown={proprietarySpeciesBreakdown}
              highestConfidenceObservation={highestConfidenceObservation}
              averageNdsiScore={averageNdsiScore}
              ndsiScores={ndsiScores}
              imageMap={imageMap}
              loadingMap={loadingMap}
            />

            <ExternalSection
              state={state}
              speciesGroups={externalSpeciesGroups}
              speciesBreakdown={externalSpeciesBreakdown}
              imageMap={imageMap}
              loadingMap={loadingMap}
            />
          </>
        )}
      </Stack>
    </Box>
  )
}
