import Action from './actions';
import { GlobalState } from './store';

enum PlaceType {
    ATM = 'atm',
    Bar = 'bar',
    Cafe = 'cafe',
    Park = 'park',
    Restaurant = 'restaurant',
    Supermarket = 'supermarket',
};

export type PlaceTypeWeights = {
    [key: string]: number;
};

const calculateWeights = (typeWeights: PlaceTypeWeights) => {
    const result = [];
    for (let pt in typeWeights) {
        const w = typeWeights[pt];
        if (w > 0) {
            result.push({
                type: pt,
                weight: w,
            });
        }
    }
    return result;
};

class Map {
    mapView: any;
    googleMap: any;
    google: any;
    setReady: any;
    dispatch: any;
    isLoaded = false;
    waitingReload = 0;

    constructor() {
        this.googleMap = null;
    }

    loadScript(state: GlobalState) {
        const script = document.createElement('script');
        const key = process.env.REACT_APP_MAP_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=localContext&v=beta&key=${key}&callback=initMap`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
        (window as any).initMap = this.initMap.bind(this, state);
    }

    initMap(state: GlobalState) {
        this.google = (window as any)['google'];
        this.reload(state);
    }

    reload(state: GlobalState) {
        if ( ! this.google ) {
            return;
        }

        const google = this.google;
        const center = state.center;
        const weights = calculateWeights(state.typeWeights);
        console.log(weights);
        const localContextMapView = new google.maps.localContext.LocalContextMapView({
            element: document.querySelector('#map'),
            placeTypePreferences: weights,
            maxPlaceCount: 24,
            directionsOptions: { origin: center },
        });

        (window as any).mv = localContextMapView;  // FIXME: for debug
        this.googleMap = localContextMapView.map;
        this.mapView = localContextMapView;

        // Set inner map options.
        this.googleMap.setOptions({
            center,
            zoom: state.zoom,
        });

        this.dispatch({ action: Action.SET_READY });
    }

    reloadAfter(state: GlobalState) {
        if (this.waitingReload) {
            clearTimeout(this.waitingReload);
        }

        this.waitingReload = window.setTimeout(() => {
            this.reload(state);
            this.waitingReload = 0;
        }, 100);
    }

    init(state: GlobalState, dispatch: any) {
        if (this.isLoaded) {
            return;
        }
        this.dispatch = dispatch;
        this.loadScript(state);
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
