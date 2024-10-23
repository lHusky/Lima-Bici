// src/components/Mapa/FixedRoutes.jsx

import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Polyline } from 'react-native-maps';
import axios from 'axios';

const FixedRoutes = ({ selectedDistricts = [], strokeColor = 'green', strokeWidth = 3 }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                setLoading(true);

                let whereClause = '1=1'; // Default para ALL
                if (!selectedDistricts.includes('ALL') && selectedDistricts.length > 0) {
                    const formattedDistricts = selectedDistricts.map(d => `distrito='${d.replace(/'/g, "''")}'`).join(' OR ');
                    whereClause = formattedDistricts;
                }

                const response = await axios.get('https://sit.icl.gob.pe/arcgis/rest/services/AGOL_Servicios/CICLOVIA_17_11_2022_V3/MapServer/1/query', {
                    params: {
                        where: whereClause,
                        outFields: '*',
                        f: 'geojson',
                    },
                    timeout: 10000,
                });

                if (response.data && response.data.features && response.data.features.length > 0) {
                    const routesData = response.data.features.map((feature) => ({
                        coordinates: feature.geometry.coordinates.map(([lng, lat]) => ({
                            latitude: lat,
                            longitude: lng,
                        })),
                    }));
                    setRoutes(routesData);
                } else {
                    Alert.alert('Error', 'No se encontraron rutas de ciclovías para los distritos seleccionados.');
                }
            } catch (error) {
                Alert.alert('Error', `No se pudieron cargar las rutas de ciclovías. Detalle: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRoutes();
    }, [selectedDistricts]);

    return (
        <>
            {routes.map((route, index) => (
                <Polyline
                    key={index}
                    coordinates={route.coordinates || []}
                    strokeColor={strokeColor}
                    strokeWidth={strokeWidth}
                />
            ))}
        </>
    );
};

export default FixedRoutes;
