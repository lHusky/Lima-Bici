// src/components/Mapa/Marker.jsx

import React from 'react';
import { Marker } from 'react-native-maps';

const MapMarker = ({ coordinate, draggable = false, onDragEnd }) => (
    <Marker
        coordinate={coordinate}
        draggable={draggable}
        onDragEnd={onDragEnd}
    />
);

export default MapMarker;
