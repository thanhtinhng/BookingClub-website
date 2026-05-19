import {
    useEffect,
    useState,
} from "react";

import ComplexMap from "../../components/common/Map/ComplexMap";

import { getComplexesMapApi } from "../../services/sportComplex.api";

import type { ComplexFeatureCollection } from "../../types/geojson";

function ComplexMapPage() {
    const [geoData, setGeoData] = useState<ComplexFeatureCollection | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const res = await getComplexesMapApi();
                setGeoData(res);
            } catch (
            error
            ) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMap();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className="complex-map-page">
            <ComplexMap
                geoData={
                    geoData
                }
            />
        </div>
    );
}

export default ComplexMapPage;
