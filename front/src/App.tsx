import React from 'react';
import './App.css';
import GlobalStateProvider from './models/store';
import MapApp from './components/MapApp';

const App = () => {
    return (
        <GlobalStateProvider>
            <MapApp />
        </GlobalStateProvider>
    );
}

export default App;
