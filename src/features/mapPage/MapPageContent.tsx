import { useMemo } from "react";
import { useProprietary } from "../../hooks/useProprietaryData";
import { clampTimeRange, getApplicationTimeBounds } from "../../lib/formatters";
import { SidePanel } from "../../components/SidePanel/SidePanel";
import { MapLegend } from "../../components/Map/MapLegend";
import { MapView } from "../../components/Map/MapView";
import { useSelectLocationBiodiversity } from "../../hooks/useSelectLocationBiodiversity";
import { Box } from "../../styles";
import "./styles.css"

export const MapPageContent = () => {
  const { state, selectLocation, selectProprietaryLocation, setTimeRange } =
    useSelectLocationBiodiversity();
  const allProprietaryPoints = useProprietary();
  const referenceDateTime = useMemo(() => Date.now(), []);

  const { minDateTime, maxDateTime } = useMemo(
    () => getApplicationTimeBounds(allProprietaryPoints, referenceDateTime),
    [allProprietaryPoints, referenceDateTime],
  );

  const currentTimeRange = clampTimeRange(
    {
      earliestDateTime: state.earliestDateTime,
      latestDateTime: state.latestDateTime,
    },
    minDateTime,
    maxDateTime,
  );

  return (
    <Box as="main" surface="page" className="mapPageRoot mapPageRoot-reset">
      {" "}
      <div className="appShell">
        <div className="appShell-mapPane">
          <MapView
            selectedCoordinates={state.coordinates}
            proprietaryDataPoints={state.proprietaryDataPoints}
            selectedProprietaryId={state.selectedProprietaryId}
            onMapSelect={(coordinates) => {
              void selectLocation(coordinates, currentTimeRange);
            }}
            onProprietarySelect={(proprietaryId) => {
              void selectProprietaryLocation(proprietaryId, currentTimeRange);
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
              void setTimeRange(timeRange);
            }}
          />
        </div>
      </div>
    </Box>
  );
};
