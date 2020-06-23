import React  from 'react';
import { useGlobalState } from '../models/store';
import './Map.css';

const Map = () => {
    const [state, dispatch] = useGlobalState();
    state.map.init(state, dispatch);
    console.log(state.zoom);

    return <div id="map" />;
}

export default Map;
