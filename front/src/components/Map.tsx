import React, { useEffect } from 'react';
import MapModel from '../models/map';
import './Map.css';

type Props = {
    map: MapModel,
};

const Map = ({ map }: Props) => {
    useEffect(() => {
        map.init();
    }, [map]);

    return (
        <div id="map"></div>
    );
};

export default Map;
