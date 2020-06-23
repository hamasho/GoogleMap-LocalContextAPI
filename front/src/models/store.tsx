import React from 'react';
import MapModel from './map';

interface GlobalState {
    map: MapModel,
    center: {
        lat: number,
        lng: number,
    },
    zoom: number,
    ready: boolean,
};

const defaultGlobalState: GlobalState = {
    map: new MapModel(),
    center: {
        lat: 35.732872,
        lng: 139.710090,
    },
    zoom: 15,
    ready: false,
};

const GlobalStateContext = React.createContext<GlobalState>(defaultGlobalState);
const DispatchStateContext = React.createContext({});

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(
        (oldState: GlobalState, newVal: any) => ({ ...oldState, ...newVal }),
        defaultGlobalState,
    );

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
export {
    useGlobalState,
};
