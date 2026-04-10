import { Box } from './design-system'
import { MapLegend } from './components/map/MapLegend'
import { MapView } from './components/map/MapView'
import { SidePanel } from './components/sidePanel/SidePanel'
import { useSelectLocationBiodiversity } from './hooks/useSelectLocationBiodiversity'
import { useProprietaryData } from './hooks/useProprietaryData'
import { clampTimeRange, getDatasetTimeBounds } from './lib/formatters'

export const App = () => {
  const {
    state,
    selectLocation,
    selectProprietaryLocation,
    setTimeRange,
  } = useSelectLocationBiodiversity()
  const allProprietaryDataPoints = useProprietaryData()

  const { minDateTime, maxDateTime } = getDatasetTimeBounds(allProprietaryDataPoints)

  const currentTimeRange = clampTimeRange(
    {
      earliestDateTime: state.earliestDateTime,
      latestDateTime: state.latestDateTime,
    },
    minDateTime,
    maxDateTime,
  )

  return (
    <Box as="main" surface="page">
      <div className="appShell">
        <div className="appShell-mapPane">
          <MapView
            selectedCoordinates={state.coordinates}
            proprietaryDataPoints={state.proprietaryDataPoints}
            selectedProprietaryId={state.selectedProprietaryId}
            onMapSelect={(coordinates) => {
              void selectLocation(coordinates, currentTimeRange)
            }}
            onProprietarySelect={(proprietaryId) => {
              void selectProprietaryLocation(proprietaryId, currentTimeRange)
            }}
          />

          <div className="mapOverlay mapOverlay-bottomLeft">
            <MapLegend />
          </div>
        </div>

        <div className="appShell-panelPane">
          <SidePanel
            state={state}
            minDateTime={minDateTime}
            maxDateTime={maxDateTime}
            onTimeRangeChange={(timeRange) => {
              void setTimeRange(timeRange)
            }}
          />
        </div>
      </div>
    </Box>
  )
}
