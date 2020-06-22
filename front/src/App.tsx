import React from 'react';
import './App.css';
import Map from './components/Map';
import MapModel from './models/map';

const App = () => {
    const map = new MapModel();

    return (
        <div className="App">
            <Map map={map} />
        </div>
    );
}

export default App;
