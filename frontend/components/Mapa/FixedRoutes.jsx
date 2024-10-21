// src/components/Mapa/FixedRoutes.jsx

import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Polyline } from 'react-native-maps';
import api from '../../api/ruta';

const FixedRoutes = ({ routeId, strokeColor = 'green', strokeWidth = 3 }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                setLoading(true);
                let response;
                if (routeId) {
                    // Si se proporciona un routeId, buscar solo esa ruta.
                    response = await api.findOne(routeId);
                    if (response && response.data) {
                        setRoutes([response.data]); // Guardamos la ruta en un array para mantener la estructura.
                    } else {
                        Alert.alert('Error', 'No se encontró la ruta específica.');
                    }
                } else {
                    // Si no hay routeId, cargamos todas las rutas.
                    response = await api.findAll();
                    if (response && response.data) {
                        setRoutes(response.data);
                    } else {
                        Alert.alert('Error', 'No se encontraron rutas');
                    }
                }
            } catch (error) {
                console.error('Error fetching routes:', error);
                Alert.alert('Error', 'No se pudieron cargar las rutas.');
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [routeId]);

    return (
        <>
            {routes.map((route, index) => (
                <Polyline
                    key={index}
                    coordinates={route.coordenadas.map(coord => ({
                        latitude: coord.lat,
                        longitude: coord.lng,
                    }))}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                />
            ))}
        </>
    );
};

export default FixedRoutes;

/*
// src/components/Mapa/FixedRoutes.jsx

import React from 'react';
import { Polyline } from 'react-native-maps';

const FixedRoutes = ({ strokeColor = 'green', strokeWidth = 3 }) => {
    // Coordenadas de ejemplo para una ruta fija.
    const testRouteCoordinates = [
        { latitude: -12.046374, longitude: -77.042793 },
        { latitude: -12.045874, longitude: -77.035793 },
        { latitude: -12.045874, longitude: -77.030793 },
        { latitude: -12.046874, longitude: -77.025793 },
        { latitude: -12.048374, longitude: -77.022793 },
    ];

    return (
        <Polyline
            coordinates={testRouteCoordinates}
            strokeColor={strokeColor}
            strokeWidth={strokeWidth}
        />
    );
};

export default FixedRoutes;
*/
