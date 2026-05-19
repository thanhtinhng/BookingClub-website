import axios from "../utils/axios.customize";

import type { ComplexFeatureCollection } from "../types/geojson";

const getComplexesMapApi = (): Promise<ComplexFeatureCollection> => {

    const URL_API = "/api/v1/sportcomplex/map";

    return axios.get(URL_API);
};

export {
    getComplexesMapApi,
};
