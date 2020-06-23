import React from 'react';
import './App.css';
import Map from './components/Map';

const defaultGlobalState = {
    zoom: 15,
};

const globalStateContext = React.createContext(defaultGlobalState);
const dispatchStateContext = React.createContext({});

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = React.useReducer(
        (st: any, newVal: any) => ({ ...st, ...newVal }),
        defaultGlobalState,
    );

    return (
        <globalStateContext.Provider value={state}>
            <dispatchStateContext.Provider value={dispatch}>
                {children}
            </dispatchStateContext.Provider>
        </globalStateContext.Provider>
    )
}

const App = () => {
    return (
        <GlobalStateProvider>
            <Map />
        </GlobalStateProvider>
    );
}

export default App;
