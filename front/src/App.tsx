import React from 'react';
import './App.css';
import GlobalStateProvider from './models/store';
import Map from './components/Map';
import ConfigPanel from './components/ConfigPanel';

const App = () => {
    return (
        <GlobalStateProvider>
            <Map />
            <ConfigPanel />
        </GlobalStateProvider>
    );
}

export default App;
