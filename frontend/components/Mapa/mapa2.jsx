// src/components/Mapa/Mapa.jsx

import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';

import MapMarker from './Marker';
import BlueRoute from './BlueRoute';
import RedRoute from './RedRoute';
import FixedRoutes from './FixedRoutes';
import useUserLocation from '../../hooks/useUserLocation';
import useLocationTracker from '../../hooks/useLocationTracker';
import api from '../../api/ruta';

const { width, height } = Dimensions.get('window');

const Mapa = ({ destination, setDestination, trackUser, apiKey, fixedRoutes, onMarkerDragEnd, showFixedRoutes, selectedDistricts }) => {
    const mapRef = useRef(null);
    const { location: origin, error } = useUserLocation();
    const { routeCoordinates, startTracking, stopTracking, distance, duration } = useLocationTracker();
    const [initialOrigin, setInitialOrigin] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }

        // Establecer la ubicación inicial del usuario
        if (origin && !initialOrigin) {
            setInitialOrigin(origin);
            setDestination(origin);
        }
    }, [origin, error, initialOrigin]);

    useEffect(() => {
        if (trackUser) {
            startTracking((newCoordinate) => {
                if (mapRef.current) {
                    mapRef.current.animateCamera({ center: newCoordinate });
                }
            });
        } else {
            stopTracking();
            if (routeCoordinates.length > 0) {
                saveTrackedRoute();
            }
        }

        return () => {
            stopTracking();
        };
    }, [trackUser]);

    const saveTrackedRoute = async () => {
        if (initialOrigin && destination && distance && duration) {
            const routeData = {
                userId: 1,
                nombre: "Ruta recorrida",
                descripcion: "Ruta desde el origen hasta el destino.",
                distancia: distance,
                duracion: duration,
                fechaInicio: new Date().toISOString(),
                fechaFin: new Date(new Date().getTime() + duration * 60).toISOString(),
                coordenadas: routeCoordinates.map(coord => ({
                    lat: coord.latitude,
                    lng: coord.longitude,
                })),
            };

            try {
                await api.create(routeData);
                Alert.alert('Ruta Guardada', 'La ruta recorrida ha sido guardada exitosamente.');
                console.log("Ruta guardada exitosamente:", routeData);
            } catch (error) {
                console.error("Error al guardar la ruta:", error);
                Alert.alert('Error', 'No se pudo guardar la ruta recorrida.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: initialOrigin ? initialOrigin.latitude : -12.046374,
                    longitude: initialOrigin ? initialOrigin.longitude : -77.042793,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                onMapReady={() => setIsMapReady(true)}
            >
                {initialOrigin && <MapMarker coordinate={initialOrigin} />}
                {destination && (
                    <MapMarker
                        coordinate={destination}
                        draggable
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            if (onMarkerDragEnd) {
                                onMarkerDragEnd(latitude, longitude);
                            }
                        }}
                    />
                )}
                {initialOrigin && destination && (
                    <BlueRoute
                        origin={initialOrigin}
                        destination={destination}
                        apiKey={apiKey}
                        onReady={(result) => {
                            if (isMapReady && mapRef.current) {
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: { right: 50, bottom: 50, left: 50, top: 50 },
                                });
                            }
                        }}
                    />
                )}
                <RedRoute coordinates={routeCoordinates} />
                {showFixedRoutes && (
                    <FixedRoutes
                        selectedDistricts={selectedDistricts} // Pasar los distritos seleccionados a FixedRoutes
                        strokeColor="green"
                        strokeWidth={3}
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
});

export default Mapa;