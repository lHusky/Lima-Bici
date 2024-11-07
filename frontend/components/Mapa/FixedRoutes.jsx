// src/components/Mapa/FixedRoutes.jsx

import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Polyline } from 'react-native-maps';
import { fetchBikePaths } from '../../services/fetchBikePaths';

const FixedRoutes = ({ strokeColor = 'green', strokeWidth = 7, onRoutesLoaded }) => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesData = await fetchBikePaths();

        if (routesData.length > 0) {
          setRoutes(routesData);
          if (onRoutesLoaded) {
            onRoutesLoaded(routesData);
          }
        } else {
          Alert.alert('Error', 'No se encontraron rutas de ciclovías.');
        }
      } catch (error) {
        Alert.alert('Error', `No se pudieron cargar las rutas de ciclovías. Detalle: ${error.message}`);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <>
      {routes.map((route, index) => (
        <Polyline
          key={index}
          coordinates={route || []}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}
    </>
  );
};

export default FixedRoutes;
