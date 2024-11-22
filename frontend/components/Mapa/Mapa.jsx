import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert, ActivityIndicator  } from 'react-native';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

import MapMarker from './Marker';
import FixedRoutes from './FixedRoutes';
import BlueRoute from './BlueRoute';
import YellowRoute from './YellowRoute';
import RedRoute from './RedRoute';
import RoutePlanner from '../../utils/RoutePlanner';
import PlaceDetailsModal from './PlaceDetailsModal';

import useUserLocation from '../../hooks/useUserLocation';
import useLocationTracker from '../../hooks/useLocationTracker';

const { width, height } = Dimensions.get('window');

const Mapa = ({ destination, setDestination, trackUser, apiKey, onMarkerDragEnd }) => {
    const mapRef = useRef(null);
    const { location: origin, error } = useUserLocation();
    const { routeCoordinates, startTracking, stopTracking, distance, duration } = useLocationTracker();
    const [initialOrigin, setInitialOrigin] = useState(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    const { fetchRouteDetails, blueRouteCoords } = useGooglePlaces();
    const [adjustedRouteCoords, setAdjustedRouteCoords] = useState([]);
    const [bikePaths, setBikePaths] = useState([]);

    const handleLongPress = async (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        setModalVisible(true);
        setLoading(true);
        try {
            const responseGeocode = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const geocodeResult = await responseGeocode.json();
            if (geocodeResult.results && geocodeResult.results.length > 0) {
                const placeId = geocodeResult.results[0].place_id;
                const responseDetails = await fetch(
                    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
                );
                const detailsResult = await responseDetails.json();
                if (detailsResult.result) {
                    const place = detailsResult.result;
                    setPlaceDetails({
                        name: place.name || "Ubicación Seleccionada",
                        address: place.formatted_address || "No disponible",
                        phoneNumber: place.formatted_phone_number || "No disponible",
                        rating: place.rating || "No disponible",
                        types: place.types ? place.types.join(", ") : "No disponible",
                        photos: place.photos ? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`) : [],
                    });
                }
            } else {
                setPlaceDetails({ name: "Ubicación Seleccionada", address: "No disponible" });
            }
        } catch (error) {
            console.error("Error al obtener detalles del lugar:", error);
            setPlaceDetails({ name: "Error", address: "No se pudo obtener información del lugar" });
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedLocation(null);
        setPlaceDetails(null);
    };

    useEffect(() => {
        if (error) {
            Alert.alert('Error', error);
        }
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
            } catch (error) {
                Alert.alert('Error', 'No se pudo guardar la ruta recorrida.');
            }
        }
    };

    return (
        <View style={styles.container}>
            {initialOrigin ? (
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
                onLongPress={handleLongPress}
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
                {blueRouteCoords && <BlueRoute coordinates={blueRouteCoords} />}
                {adjustedRouteCoords && <YellowRoute coordinates={adjustedRouteCoords} />}
                
                <RoutePlanner route={blueRouteCoords} bikePaths={bikePaths} onRouteCalculated={setAdjustedRouteCoords} />
                <FixedRoutes onRoutesLoaded={(data) => setBikePaths(data)} />
                <RedRoute coordinates={routeCoordinates} />
            </MapView>): (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )}
            <PlaceDetailsModal
                visible={modalVisible}
                placeDetails={placeDetails}
                loading={loading}
                onClose={closeModal}
                setDestination={setDestination}
                selectedLocation={selectedLocation}
            />
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














