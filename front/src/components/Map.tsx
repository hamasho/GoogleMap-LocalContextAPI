import React  from 'react';
import ConfigPanel from './ConfigPanel';
import MapModel from '../models/map';
import './Map.css';

type State = {
    ready: boolean,
    map: MapModel,
};

class Map extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props)
        const map = new MapModel();
        this.state = {
            map,
            ready: false,
        };
    }

    componentDidMount() {
        const map = this.state.map;
        map.init(() => this.setReady());
        this.setState({
            map,
        });
    }

    setReady() {
        console.log('wtf');
        this.setState({
            ready: true,
        });
    }

    render() {
        return <div>
            <div id="map"></div>
            { this.state.ready ? <ConfigPanel map={this.state.map} /> : 'WAITING...' }
        </div>;
    }
}

export default Map;
