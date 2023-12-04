import React, { useEffect, useState } from 'react';
import { APIProvider, useMap, Map } from '@vis.gl/react-google-maps';
import { Env } from '@/env';

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
        <APIProvider apiKey={Env.GOOGLE_API_KEY}>
            <Map
                zoom={3}
                center={center}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </APIProvider>
    </>;
};