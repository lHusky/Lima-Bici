import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

const Mapa = ({ onMarkerDragEnd, destination, setDestination }) => {
    const { apiKey } = useGooglePlaces();
    const mapRef = useRef(null);

    const [origin, setOrigin] = useState({
        latitude: -12.0464,
        longitude: -77.0428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

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
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            };
            setOrigin(currentPosition);
            setDestination(currentPosition);  // Inicializar el destino en la misma posición que el origen
        }

        getLocationPermission();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={origin}
                region={destination || origin} // Cambiar la región según el destino
            >
                <Marker coordinate={origin} />
                {destination && (
                    <Marker
                        coordinate={destination}
                        draggable  // Permite mover el marcador
                        onDragEnd={(e) => {
                            const { latitude, longitude } = e.nativeEvent.coordinate;
                            setDestination({
                                ...destination,
                                latitude,
                                longitude
                            });
                            onMarkerDragEnd(latitude, longitude);  // Llamamos al callback para actualizar la barra de búsqueda
                        }}
                    />
                )}
                {destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={apiKey}
                        strokeWidth={6}
                        strokeColor="red"
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
