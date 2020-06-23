import Action from './actions';

enum PlaceType {
    ATM = 'atm',
    Bar = 'bar',
    Cafe = 'cafe',
    Park = 'park',
    Restaurant = 'restaurant',
    Supermarket = 'supermarket',
};

class Map {
    mapView: any;
    googleMap: any;
    google: any;
    setReady: any;
    state: any;
    dispatch: any;
    isLoaded = false;

    constructor() {
        this.googleMap = null;
    }

    loadScript() {
        const script = document.createElement('script');
        const key = process.env.REACT_APP_MAP_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=localContext&v=beta&key=${key}&callback=initMap`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
        (window as any).initMap = this.initMap.bind(this);
    }

    initMap() {
        this.google = (window as any)['google'];
        this.loadMap();
    }

    loadMap() {
        if ( ! this.google ) {
            return;
        }
        const google = this.google;
        const center = this.state.center;
        const localContextMapView = new google.maps.localContext.LocalContextMapView({
            element: document.querySelector('#map'),
            placeTypePreferences: [{type: 'restaurant', weight: 10}],
            maxPlaceCount: 24,
            directionsOptions: { origin: center },
        });

        (window as any).mv = localContextMapView;  // FIXME: for debug
        this.googleMap = localContextMapView.map;
        this.mapView = localContextMapView;

        // Set inner map options.
        this.googleMap.setOptions({
            center,
            zoom: this.state.zoom,
        });

        this.dispatch({ action: Action.SET_READY });
    }

    init(state: any, dispatch: any) {
        if (this.isLoaded) {
            return;
        }
        this.dispatch = dispatch;
        this.state = state;
        this.loadScript();
        this.isLoaded = true;
    }

    get zoom() {
        return this.googleMap.zoom;
    }

    set zoom(value: number) {
        this.googleMap.setOptions({
            zoom: value,
        });
    }

    get maxPlaceCount() {
        return this.googleMap.maxPlaceCount;
    }

    set maxPlaceCount(value: number) {
        if (value < 0 || value > 24) {
            throw new RangeError(`maxPlaceCount should be in (1, 24). Got ${value}`);
        }
        this.googleMap.setOptions({
            maxValueCount: value,
        });
    }

    setPlacePreference(pt: PlaceType, weight: number) {
        const ptp = this.mapView.placeTypePreferences;
        for (let i = 0; i < ptp.length; i++) {
            const p = ptp[i];
            if (p.type === pt) {
                if (weight === 0) {
                    ptp.splice(i, 1);
                } else {
                    p.weight = weight;
                }
                return;
            }
        }
        ptp.push({
            type: pt,
            weight,
        });
    }

    addMarker(lat: number, lng: number, title='') {
        new this.google.maps.Marker({
            position: { lat, lng },
            map: this.googleMap,
            title,
        });
    }
};

export default Map;

export {
    PlaceType,
};
