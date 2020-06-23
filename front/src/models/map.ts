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
    isLoaded = false;

    constructor() {
        this.googleMap = null;
    }

    init(setReady: () => void) {
        if (this.isLoaded) {
            return;
        }

        const script = document.createElement('script');
        const key = process.env.REACT_APP_MAP_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=localContext&v=beta&key=${key}&callback=initMap`;
        script.defer = true;
        script.async = true;

        const that = this;

        // Attach your callback function to the `window` object
        (window as any).initMap = function() {
            const lat = 35.732872, lng = 139.710090;
            const google = that.google = (window as any)['google'];
            const localContextMapView = new google.maps.localContext.LocalContextMapView({
                element: document.querySelector('#map'),
                placeTypePreferences: [{type: 'restaurant', weight: 10}],
                maxPlaceCount: 24,
                directionsOptions: { origin: {lat, lng} },
            });

            (window as any).mv = localContextMapView;  // FIXME: for debug
            that.googleMap = localContextMapView.map;
            that.mapView = localContextMapView;

            // Set inner map options.
            that.googleMap.setOptions({
                center: { lat, lng },
                zoom: 15,
            });

            // Update styles
            const styles = that.googleMap.get('styles').concat([
            ]);
            that.googleMap.setOptions({ styles });

            setReady();
        };

        document.head.appendChild(script);
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
