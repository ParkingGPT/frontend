import React, { useEffect, useState } from 'react';
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';

interface Center {
    lat: number;
    lng: number;
}

interface MapProps {
    center: Center;
}

export const MapComponent = ({center: c}: MapProps) => {
    const map = useMap();
    const [center, setCenter] = useState(c);

    useEffect(() => {
        if (!map) return;

    }, [map]);

    return <>
        <APIProvider apiKey={"AIzaSyDA49Yft8RgwmtTYuZuARaFAUTCmwrNg7c"}>
            <Map
                zoom={3}
                center={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </APIProvider>
    </>;
};