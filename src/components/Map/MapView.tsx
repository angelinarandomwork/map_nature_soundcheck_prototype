import Map, {
  NavigationControl,
  type MapMouseEvent,
  type StyleSpecification,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { config } from "../../lib/config.ts";
import { useEffect, useState } from "react";
import { MapMarker } from "./SelectedLocationMarker.tsx";
import { createStyleWithFogOverride, mapFog } from "./mapStyles.ts";
import type { MapViewProps } from "./types.ts";
import type { Coordinates, Proprietary } from "../../entities/index.ts";


const areCoordinatesEqual = (
  a: Coordinates,
  b: Coordinates,
  tolerance = 0.0001,
): boolean => {
  return (
    Math.abs(a.lat - b.lat) < tolerance && Math.abs(a.lon - b.lon) < tolerance
  );
};

const shouldRenderSelectedMarker = (
  selectedCoordinates: Coordinates | null,
  proprietaryDataPoints: Array<Proprietary>,
): boolean => {
  if (!selectedCoordinates) return false;

  return !proprietaryDataPoints.some((dataPoint) =>
    areCoordinatesEqual(dataPoint.coordinates, selectedCoordinates),
  );
};

export const MapView = ({
  selectedCoordinates,
  proprietaryDataPoints,
  selectedProprietaryId,
  onMapSelect,
  onProprietarySelect,
}: MapViewProps) => {
  const [mapStyle, setMapStyle] = useState<StyleSpecification | null>(null);

  const handleMapClick = (event: MapMouseEvent) => {
    onMapSelect({
      lat: event.lngLat.lat,
      lon: event.lngLat.lng,
    });
  };

  useEffect(() => {
    createStyleWithFogOverride(
      "mapbox://styles/angelp12/cmna73zpi001401s7hc5nem31",
      config.mapboxAccessToken,
    ).then(setMapStyle);
  }, []);

  if (!mapStyle) return null;

  return (
    <Map
      mapboxAccessToken={config.mapboxAccessToken}
      attributionControl={false}
      initialViewState={{
        latitude: 20,
        longitude: 0,
        zoom: 1.5,
      }}
      mapStyle={mapStyle}
      fog={mapFog}
      style={{ width: "100%", height: "100%" }}
      onClick={handleMapClick}
    >
      <NavigationControl position="top-right" />

      {proprietaryDataPoints.map((dataPoint) => {
        const isSelected = dataPoint.id === selectedProprietaryId;

        return (
          <MapMarker
            key={dataPoint.id}
            coordinates={dataPoint.coordinates}
            variant="proprietary"
            isSelected={isSelected}
            label={`Select ${dataPoint.siteName}`}
            onClick={(event) => {
              event.stopPropagation();
              onProprietarySelect(dataPoint.id);
            }}
          />
        );
      })}
      {shouldRenderSelectedMarker(
        selectedCoordinates,
        proprietaryDataPoints,
      ) ? (
        <MapMarker
          coordinates={selectedCoordinates as Coordinates}
          variant="selected-location"
        />
      ) : null}
    </Map>
  );
};
