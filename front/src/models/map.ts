import Action from './actions';
import { GlobalState } from './store';

enum PlaceType {
    Atm = 'atm',
    Bakery = 'bakery',
    Bank = 'bank',
    Bar = 'bar',
    BookStore = 'book_store',
    Cafe = 'cafe',
    ClothingStore = 'clothing_store',
    ConvenienceStore = 'convenience_store',
    DepartmentStore = 'department_store',
    Drugstore = 'drugstore',
    ElectronicsStore = 'electronics_store',
    Hospital = 'hospital',
    JewelryStore = 'jewelry_store',
    MovieTheater = 'movie_theater',
    NightClub = 'night_club',
    Park = 'park',
    Pharmacy = 'pharmacy',
    PrimarySchool = 'primary_school',
    Restaurant = 'restaurant',
    SecondarySchool = 'secondary_school',
    ShoeStore = 'shoe_store',
    ShoppingMall = 'shopping_mall',
    Stadium = 'stadium',
    Supermarket = 'supermarket',
    TouristAttraction = 'tourist_attraction',
    University = 'university',
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
        const localContextMapView = new google.maps.localContext.LocalContextMapView({
            element: document.querySelector('#map'),
            placeTypePreferences: weights,
            maxPlaceCount: 24,
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

    updateState(state: GlobalState) {
        const zoom = this.googleMap.zoom;
        const center = this.googleMap.center;
        return {
            ...state,
            zoom,
            center,
        };
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
