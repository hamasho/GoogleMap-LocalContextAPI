// enum PlaceType {
//     Restaurant = 'restaurant',
// };

class Map {
    googleMap: any;
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
            const localContextMapView = new (window as any)['google'].maps.localContext.LocalContextMapView({
                element: document.querySelector('#map'),
                placeTypePreferences: ['restaurant'],
                maxPlaceCount: 12,
            });

            // Set inner map options.
            localContextMapView.map.setOptions({
                center: { lat, lng },
                zoom: 15,
            });

            (window as any).mv = localContextMapView;  // FIXME: for debug
            that.googleMap = localContextMapView.map;
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
};

export default Map;
