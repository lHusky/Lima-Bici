import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import MapMarker from './Marker';
import FixedRoutes from './FixedRoutes';
import BlueRoute from './BlueRoute';
import YellowRoute from './YellowRoute';
import RedRoute from './RedRoute';
import RoutePlanner from '../../utils/RoutePlanner';

import useUserLocation from '../../hooks/useUserLocation';
import useLocationTracker from '../../hooks/useLocationTracker';

import api from '../../api/ruta';


const { width, height } = Dimensions.get('window');

const Mapa = ({ destination, setDestination, trackUser, apiKey, onMarkerDragEnd }) => {
    const mapRef = useRef(null);
    const { location: origin, error } = useUserLocation();
    const { routeCoordinates, startTracking, stopTracking, distance, duration } = useLocationTracker();
    const [initialOrigin, setInitialOrigin] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);

    const { fetchRouteDetails, blueRouteCoords } = useGooglePlaces();
    const [adjustedRouteCoords, setAdjustedRouteCoords] = useState([]);
    const [bikePaths, setBikePaths] = useState([]);

  // Obtener ubicación del usuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
    
  }, []);
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

                {/* Ruta Azul - Ruta original de Google Maps */}
                {blueRouteCoords && blueRouteCoords.length > 0 && (
                <BlueRoute coordinates={blueRouteCoords} />
                )}

                {/* Ruta Amarilla - Ruta ajustada a las ciclovías */}
                {adjustedRouteCoords && adjustedRouteCoords.length > 0 && (
                <YellowRoute coordinates={adjustedRouteCoords} />
                )}

                {/* Planificador de Ruta - Ajusta la ruta a las ciclovías */}
                {blueRouteCoords && blueRouteCoords.length > 0 && bikePaths.length > 0 && (
                <RoutePlanner
                    route={blueRouteCoords}
                    bikePaths={bikePaths}
                    onRouteCalculated={setAdjustedRouteCoords}
                />
                )}

                {/* Renderizar las ciclovías (FixedRoutes) primero */}
                <FixedRoutes
                onRoutesLoaded={(data) => setBikePaths(data)}
                />
                <RedRoute coordinates={routeCoordinates} />

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