// src/components/Mapa/YellowRoute.jsx

import React from 'react';
import { Polyline } from 'react-native-maps';

const YellowRoute = ({ coordinates }) => {
  return (
    <Polyline
      coordinates={coordinates}
      strokeColor="yellow"
      strokeWidth={3}
    />
  );
};

export default YellowRoute;
