// src/components/Mapa/RedRoute.jsx

import React from 'react';
import { Polyline } from 'react-native-maps';

const RedRoute = ({ coordinates }) => (
    <Polyline
        coordinates={coordinates}
        strokeWidth={5}
        strokeColor="red"
    />
);

export default RedRoute;
