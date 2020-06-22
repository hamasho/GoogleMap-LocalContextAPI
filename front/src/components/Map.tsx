import React, { useEffect } from 'react';
import './Map.css';

const Map = () => {
    useEffect(() => {
        const script = document.createElement('script');
        const key = process.env.REACT_APP_MAP_API_KEY;
        script.src = `https://maps.googleapis.com/maps/api/js?libraries=localContext&v=beta&key=${key}&callback=initMap`;
        script.defer = true;
        script.async = true;

        // Attach your callback function to the `window` object
        (window as any).initMap = function() {
            const lat = 35.732872, lng = 139.710090;
            const localContextMapView = new (window as any)['google'].maps.localContext.LocalContextMapView({
                element: document.querySelector('#map'),
                placeTypePreferences: ['restaurant'],
                maxPlaceCount: 12,
            });
            (window as any).mv = localContextMapView;

            // Set inner map options.
            localContextMapView.map.setOptions({
                center: { lat, lng },
                zoom: 15,
            });
        };

        document.head.appendChild(script);
    }, []);

    return (
        <div id="map"></div>
    );
};

export default Map;
