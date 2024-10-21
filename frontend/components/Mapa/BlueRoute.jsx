// src/components/Mapa/BlueRoute.jsx

import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const BlueRoute = ({ origin, destination, apiKey, onReady }) => (
    <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={apiKey}
        strokeWidth={6}
        strokeColor="blue"
        onReady={onReady}
    />
);

export default BlueRoute;
