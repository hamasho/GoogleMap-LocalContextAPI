import React from 'react';
import MapModel, { PlaceType, PlaceTypeWeights } from './map';
import reducer from './reducer';

export interface GlobalState {
    map: MapModel,
    center: {
        lat: number,
        lng: number,
    },
    typeWeights: PlaceTypeWeights,
    zoom: number,
    ready: boolean,
};

const defaultGlobalState: GlobalState = {
    map: new MapModel(),
    center: {
        lat: 35.732872,
        lng: 139.710090,
    },
    typeWeights: {} as PlaceTypeWeights,
    zoom: 15,
    ready: false,
};

const init = () => {
    const types = Object.values(PlaceType);
    for (let i = 0; i < types.length; i++) {
        const pt = types[i];
        defaultGlobalState.typeWeights[pt] = 0;
    }
    defaultGlobalState.typeWeights[PlaceType.Restaurant] = 3;
    defaultGlobalState.typeWeights[PlaceType.Cafe] = 3;
};

init();

const GlobalStateContext = React.createContext<GlobalState>(defaultGlobalState);
const DispatchStateContext = React.createContext({});

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(reducer, defaultGlobalState);

    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
}

const useGlobalState = (): [GlobalState, any] => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext),
];

export default GlobalStateProvider;
export { useGlobalState };
