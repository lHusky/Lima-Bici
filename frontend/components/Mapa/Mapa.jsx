import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get('window');

const Mapa = ({ destination, setDestination, onMarkerDragEnd, trackUser, apiKey }) => {
    const mapRef = useRef(null);
    const [origin, setOrigin] = useState(null); // Origen del usuario
    const [routeCoordinates, setRouteCoordinates] = useState([]); // Coordenadas de la ruta
    const [watcher, setWatcher] = useState(null); // Estado de rastreo

    // Solicitar permisos de ubicación y obtener la ubicación actual
    useEffect(() => {
        async function getLocationPermission() {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const currentPosition = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setOrigin(currentPosition);

            // Inicializamos el destino en la ubicación actual si no hay destino ya establecido
            if (!destination) {
                setDestination(currentPosition);
            }

            // Centrar el mapa en la ubicación actual al inicio
            if (mapRef.current) {
                mapRef.current.animateToRegion(currentPosition, 1000);
            }
        }

        getLocationPermission();
    }, []);

    // Función para iniciar el rastreo continuo
    const startTracking = async () => {
        console.log("Iniciando rastreo de ubicación...");
        try {
            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10,
                },
                (location) => {
                    const newCoordinate = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    setOrigin(prevOrigin => ({ ...prevOrigin, ...newCoordinate }));
                    setRouteCoordinates(prev => [...prev, newCoordinate]);

                    if (mapRef.current) {
                        mapRef.current.animateCamera({
                            center: newCoordinate,
                        });
                    }
                }
            );
            setWatcher(subscription); // Guardamos la suscripción para detenerla luego
        } catch (error) {
            console.error('Error al iniciar el rastreo', error);
        }
    };

    // Función para detener el rastreo
    const stopTracking = () => {
        if (watcher) {
            console.log("Rastreo detenido");
            watcher.remove(); // Eliminamos el watcher
            setWatcher(null); // Reiniciamos el estado del watcher
        }
    };

    // Efecto para iniciar/detener el rastreo dependiendo del estado de trackUser
    useEffect(() => {
        if (trackUser) {
            startTracking();  // Solo iniciamos el rastreo si trackUser es true
        } else {
            stopTracking();  // Detenemos el rastreo cuando trackUser es false
        }

        // Limpiar el watcher al desmontar el componente o cambiar el rastreo
        return () => {
            if (watcher) {
                stopTracking();
            }
        };
    }, [trackUser]); // Este efecto solo se ejecuta cuando cambia trackUser

    // Actualizar el mapa cuando cambia el destino
    useEffect(() => {
        if (destination && mapRef.current) {
            mapRef.current.animateToRegion({
                ...destination,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }, 1000);
        }
    }, [destination]);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={origin}
            >
                {origin && <Marker coordinate={origin} />}

                {destination && (
                    <Marker
                        coordinate={destination}
                        draggable
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            const newDestination = { latitude, longitude, latitudeDelta: 0.005, longitudeDelta: 0.005 };
                            setDestination(newDestination);
                            onMarkerDragEnd(latitude, longitude); // Informar sobre el nuevo destino
                        }}
                    />
                )}

                {origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={apiKey}
                        strokeWidth={6}
                        strokeColor="blue"
                        onReady={(result) => {
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 50,
                                    bottom: 50,
                                    left: 50,
                                    top: 50,
                                },
                            });
                        }}
                    />
                )}

                <Polyline coordinates={routeCoordinates} strokeWidth={5} strokeColor="red" />
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
});

export default Mapa;
