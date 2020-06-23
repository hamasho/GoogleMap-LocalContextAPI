import React  from 'react';
import { useGlobalState } from '../models/store';
import Map from './Map';
import ConfigPanel from './ConfigPanel';

const MapApp = () => {
    const [state, dispatch] = useGlobalState();
    state.map.init(state, dispatch);

    return (
        <div>
            <Map />
            <ConfigPanel />
        </div>
    );
}

export default MapApp;
