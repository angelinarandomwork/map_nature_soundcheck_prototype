import Map, {
  NavigationControl,
  type MapMouseEvent,
  type StyleSpecification,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { config } from "../../lib/config";
import { MapMarker } from "./SelectedLocationMarker.tsx";
import type { Coordinates, Proprietary } from "../../types/data.ts";
import { useEffect, useState } from "react";
import type { MapViewProps } from "../../types/components.ts";
import { mapFog } from "./mapStyles.ts";

const areCoordinatesEqual = (
  a: Coordinates,
  b: Coordinates,
  tolerance = 0.0001,
): boolean => {
  return (
    Math.abs(a.lat - b.lat) < tolerance &&
    Math.abs(a.lon - b.lon) < tolerance
  )
}

const shouldRenderSelectedMarker = (
  selectedCoordinates: Coordinates | null,
  proprietaryDataPoints: Proprietary[],
): boolean => {
  if (!selectedCoordinates) return false

  return !proprietaryDataPoints.some((dataPoint) =>
    areCoordinatesEqual(dataPoint.coordinates, selectedCoordinates),
  )
}

const createStyleWithFogOverride = async (
    styleUrl: string,
    accessToken: string,
): Promise<StyleSpecification> => {
    const response = await fetch(
        `https://api.mapbox.com/styles/v1/${styleUrl.replace(
        "mapbox://styles/",
        "",
        )}?access_token=${accessToken}`,
    );

    const style = (await response.json()) as StyleSpecification;

    return {
        ...style,
        fog: mapFog,
    };
};

export const MapView = ({ 
    selectedCoordinates,
    proprietaryDataPoints,
    selectedProprietaryId,
    onMapSelect,
    onProprietarySelect,
  }: MapViewProps) => {

    const handleMapClick = (event: MapMouseEvent) => {
        onMapSelect({
        lat: event.lngLat.lat,
        lon: event.lngLat.lng,
        });
    };

    const [mapStyle, setMapStyle] = useState<StyleSpecification | null>(null);

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
      style={{ width: '100%', height: '100%' }}
      onClick={handleMapClick}
    >
      <NavigationControl position="top-right" />

      {proprietaryDataPoints.map((dataPoint) => {
        const isSelected = dataPoint.id === selectedProprietaryId

        return (
          <MapMarker
            key={dataPoint.id}
            coordinates={dataPoint.coordinates}
            variant="proprietary"
            isSelected={isSelected}
            label={`Select ${dataPoint.siteName}`}
            onClick={(event) => {
              event.stopPropagation()
              onProprietarySelect(dataPoint.id)
            }}
          />
        )
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
