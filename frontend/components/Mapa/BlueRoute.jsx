// src/components/Mapa/BlueRoute.jsx

import React from 'react';
import { Polyline } from 'react-native-maps';

const BlueRoute = ({ coordinates }) => {
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor="blue"
      strokeWidth={5}
    />
  );
};

export default BlueRoute;