"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const MapWithClickEvent = ({
  onLocationSelect,
  markerAttributes = {},
  center,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
  markerAttributes?: L.MarkerOptions;
  center?: [number, number];
}) => {
  const map = useMap();
  const [marker, setMarker] = useState<L.Marker | null>(null);

  useEffect(() => {
    const onMapClick = (e: { latlng: { lat: number; lng: number } }) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);

      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        const newMarker = L.marker(e.latlng, {
          icon: L.icon({
            iconUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
          ...markerAttributes,
        }).addTo(map);
        setMarker(newMarker);
      }
    };

    map.on("click", onMapClick);

    // Prevent zooming when pressing keys
    map.keyboard.disable();

    return () => {
      map.off("click", onMapClick);
    };
  }, [map, marker, onLocationSelect, markerAttributes]);

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
};

const Map = ({
  center = [-1.4304, 120.4545],
  zoom = 13,
  onLocationSelect,
  markerAttributes,
}: {
  center?: [number, number];
  zoom?: number;
  onLocationSelect: (lat: number, lng: number) => void;
  markerAttributes?: L.MarkerOptions;
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapWithClickEvent
        onLocationSelect={onLocationSelect}
        markerAttributes={markerAttributes}
        center={center}
      />
    </MapContainer>
  );
};

export default Map;
