import React from 'react';
import MapModel from '../models/map';

type Props = {
    map: MapModel,
};

const ConfigPanel = ({ map }: Props) => {
    const handleZoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        map.zoom = parseInt(e.target.value, 10);
    };

    return (
        <div>
            <label htmlFor="">ZOOM:</label>
            <input type="" value={map.zoom} onChange={handleZoom} />
        </div>
    );
};

export default ConfigPanel;
