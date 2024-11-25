// src/components/Mapa/RutaMapa.jsx

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

import useUserLocation from '../../hooks/useUserLocation';
import useLocationTracker from '../../hooks/useLocationTracker';
import rutaApi from '../../api/ruta';

const { width, height } = Dimensions.get('window');

const RutaMapa = ({ id_ruta, trackUser }) => {
    const mapRef = useRef(null);
    const { routeCoordinates, startTracking, stopTracking, distance, duration, startTime } = useLocationTracker();
    const { location: userLocation, error } = useUserLocation();
    const [rutaCoordinates, setRutaCoordinates] = useState([]);
    const [initialRegion, setInitialRegion] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
    }, [error]);

    useEffect(() => {
        if (trackUser) {
            startTracking((newCoordinate) => {
                if (mapRef.current) {
                    mapRef.current.animateCamera({ center: newCoordinate });
                }
            });
        } else {
            stopTracking();
        }

        return () => {
            stopTracking();
        };
    }, [trackUser]);

    useEffect(() => {
        const fetchRutaCoordinates = async () => {
            try {
                const data = await rutaApi.obtenerCoordenadas(id_ruta);

                if (!data || data.length === 0) {
                    throw new Error('No se recibieron datos de coordenadas');
                }

                const coords = data.map(coord => ({
                    latitude: parseFloat(coord.latitud),
                    longitude: parseFloat(coord.longitud),
                }));

                setRutaCoordinates(coords);
                setInitialRegion({
                    latitude: coords[0].latitude,
                    longitude: coords[0].longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar las coordenadas de la ruta.');
            } finally {
                setLoading(false);
            }
        };

        fetchRutaCoordinates();
    }, [id_ruta]);

    useEffect(() => {
        if (duration > 0 && routeCoordinates.length > 0) {
            saveTrackedRoute();
        }
    }, [duration]);

    const saveTrackedRoute = async () => {
        if (distance >= 0 && duration >= 0 && startTime) {
            const fechaInicio = startTime;
            const fechaFin = new Date(startTime.getTime() + duration * 60000);

            const routeData = {
                userId: 1,
                nombre: `Ruta sin nombre asignado`,
                descripcion: `Ruta sin descripcion`,
                distancia: distance,
                duracion: duration,
                fechaInicio: fechaInicio.toISOString().slice(0, 19).replace('T', ' '),
                fechaFin: fechaFin.toISOString().slice(0, 19).replace('T', ' '),
                horaInicio: fechaInicio.toTimeString().slice(0, 8),
                horaFin: fechaFin.toTimeString().slice(0, 8),
                coordenadas: routeCoordinates.map(coord => ({
                    latitud: coord.latitude,
                    longitud: coord.longitude,
                })),
            };

            try {
                const response = await rutaApi.create(routeData);
                if (response.status === 201) {
                    Alert.alert('Ruta Guardada', 'La ruta recorrida ha sido guardada exitosamente.');
                } else {
                    Alert.alert('Error', 'No se pudo guardar la ruta recorrida.');
                }
            } catch (error) {
                Alert.alert('Error', 'No se pudo guardar la ruta recorrida.');
            }
        } else {
            Alert.alert('Error', 'Datos insuficientes para guardar la ruta.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    if (!initialRegion) {
        return (
            <View style={styles.container}>
                <Text>No hay datos de la ruta.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                followsUserLocation={trackUser}
            >
                {rutaCoordinates.length > 0 && (
                    <Polyline
                        coordinates={rutaCoordinates}
                        strokeWidth={5}
                        strokeColor="blue"
                    />
                )}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        pinColor="red"
                        title="Tu ubicación"
                    />
                )}
                {routeCoordinates.length > 0 && (
                    <Polyline
                        coordinates={routeCoordinates}
                        strokeWidth={5}
                        strokeColor="red"
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: width,
        height: height,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RutaMapa;
