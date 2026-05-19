import "./ComplexMap.css";
import "leaflet/dist/leaflet.css";

import {
    MapContainer,
    TileLayer,
    GeoJSON,
} from "react-leaflet";

import {
    useMemo,
    useRef,
    useEffect,
    useState,
} from "react";

import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import type {
    ComplexFeature,
    ComplexFeatureCollection,
} from "../../../types/geojson";

import ComplexSidebar from "../ComplexDetailSideBar/ComplexSidebar";
import { Icon, divIcon, point } from "leaflet";

import defaultMarker from "../../../assets/marker/marker_selected_location.png";
import badmintonMarker from "../../../assets/marker/marker_badminton.png";
import tennisMarker from "../../../assets/marker/marker_tennis.png";
import basketballMarker from "../../../assets/marker/marker_basketball.png";
import footballMarker from "../../../assets/marker/marker_football.png";
import golfMarker from "../../../assets/marker/marker_golf.png";
import multipleMarker from "../../../assets/marker/marker_multiple.png";
import padelMarker from "../../../assets/marker/marker_padel.png";
import pickleballMarker from "../../../assets/marker/marker_pickleball.png";
import volleyballMarker from "../../../assets/marker/marker_volleyball.png";

interface Props {
    geoData:
    | ComplexFeatureCollection
    | null;
}

function ComplexMap({ geoData, }: Props) {
    const [selectedComplex, setSelectedComplex] = useState<ComplexFeature | null>(null);

    const mapRef = useRef<L.Map | null>(null);

    const getMarkerIcon = (sportType: string) => {
        switch (sportType?.toLowerCase()) {
            case "football": return footballMarker;
            case "badminton": return badmintonMarker;
            case "tennis": return tennisMarker;
            case "basketball": return basketballMarker;
            case "golf": return golfMarker;
            case "padel": return padelMarker;
            case "pickleball": return pickleballMarker;
            case "volleyball": return volleyballMarker;
            case "complex": return multipleMarker;
            default: return defaultMarker;
        }
    };

    useEffect(() => {
        if (!mapRef.current || !geoData)
            return;

        const bounds = L.latLngBounds(
            geoData.features.map(
                (feature) => {
                    const [lng, lat,] = feature.geometry.coordinates;
                    return [lat, lng];
                }
            )
        );

        mapRef.current.fitBounds(
            bounds,
            {
                padding: [80, 80],
            }
        );
    }, [geoData]);

    const pointToLayer = (feature: any, latlng: L.LatLng) => {
        const icon = L.icon({
            iconUrl: getMarkerIcon(feature.properties.sport_type),
            iconSize: [57, 57],
            iconAnchor: [21, 42],
        });

        return L.marker(latlng, { icon });
    };

    const onEachFeature = (feature: any, layer: any) => {
        layer.on(
            "click",
            () => {
                setSelectedComplex(
                    feature
                );
            }
        );
    };

    const createClusterCustomIcon = (cluster: any) => {
        return divIcon({
            html: `
      <div class="complex-map-cluster">
        ${cluster.getChildCount()}
      </div>
    `,

            className:
                "complex-map-cluster-wrapper",

            iconSize: point(50, 50, true),
        });
    };

    return (
        <div className={`
            complex-map-layout
            ${selectedComplex
                    ? "complex-map-layout--sidebar-open"
                    : ""
                }
            `}>
            <ComplexSidebar
                complex={
                    selectedComplex
                }
                onClose={() =>
                    setSelectedComplex(
                        null
                    )
                }
            />

            <div className="complex-map-container">
                <MapContainer
                    center={[
                        10.7720085,
                        106.6642186,
                    ]}
                    zoom={11}
                    className="complex-map"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution="OpenStreetMap"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkerClusterGroup
                        chunkedLoading
                        iconCreateFunction={createClusterCustomIcon}
                    >
                        {geoData && (
                            <GeoJSON
                                data={geoData}
                                pointToLayer={pointToLayer}
                                onEachFeature={onEachFeature}
                            />
                        )}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </div>
    );
}

export default ComplexMap;
