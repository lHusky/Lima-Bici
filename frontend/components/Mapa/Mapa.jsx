import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Modal, ActivityIndicator, TouchableOpacity, Linking, Image, ScrollView, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Card, Paragraph, Button } from 'react-native-paper';
import * as Location from 'expo-location';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

const { width, height } = Dimensions.get('window');

const Mapa = ({ apiKey }) => {
    const mapRef = useRef(null);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getCurrentLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso de localización denegado');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });
        };

        getCurrentLocation();
    }, []);

    const fetchPlaceDetails = async (latitude, longitude) => {
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
                        name: place.name,
                        address: place.formatted_address,
                        phoneNumber: place.formatted_phone_number || 'No disponible',
                        rating: place.rating || 'No disponible',
                        types: place.types ? place.types.join(', ') : 'No disponible',
                        photos: place.photos ? place.photos.map(photo => `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`) : [],
                    });
                } else {
                    setPlaceDetails({ name: "Lugar desconocido", address: "No se encontró información" });
                }
            }
        } catch (error) {
            console.error("Error al obtener detalles del lugar:", error);
            setPlaceDetails({ name: "Error", address: "No se pudo obtener información del lugar" });
        } finally {
            setLoading(false);
        }
    };

    const handleLongPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        setModalVisible(true);
        fetchPlaceDetails(latitude, longitude);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedLocation(null);
        setPlaceDetails(null);
    };

    const cancelRoute = () => {
        setDestination(null);
        setRouteCoordinates([]);
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: origin ? origin.latitude : -12.0464,
                    longitude: origin ? origin.longitude : -77.0428,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                onLongPress={handleLongPress}
            >
                {origin && <Marker coordinate={origin} title="Tu ubicación" />}

                {destination && (
                    <Marker
                        coordinate={destination}
                        title="Destino"
                        pinColor="blue"
                    />
                )}

                {origin && destination && (
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={apiKey}
                        strokeWidth={6}
                        strokeColor="blue"
                        mode="WALKING"
                        onReady={(result) => {
                            setRouteCoordinates(result.coordinates);
                            mapRef.current.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: 50,
                                    bottom: 50,
                                    left: 50,
                                    top: 50,
                                },
                            });
                        }}
                        onError={(errorMessage) => {
                            console.error("Error al obtener la ruta:", errorMessage);
                        }}
                    />
                )}

                <Polyline coordinates={routeCoordinates} strokeWidth={5} strokeColor="red" />

                {selectedLocation && (
                    <Marker
                        coordinate={selectedLocation}
                        title="Ubicación seleccionada"
                    />
                )}
            </MapView>

            {destination && (
                <TouchableOpacity style={styles.cancelButton} onPress={cancelRoute}>
                    <Text style={styles.cancelButtonText}>Cancelar ruta</Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <Card style={styles.card}>
                                <Card.Title title={placeDetails?.name || "Ubicación Seleccionada"} />
                                {loading ? (
                                    <ActivityIndicator animating={true} color="#0000ff" />
                                ) : (
                                    <>
                                        <Card.Content>
                                            <Paragraph>Dirección: {placeDetails?.address || "No disponible"}</Paragraph>
                                            <Paragraph>Teléfono: {placeDetails?.phoneNumber || "No disponible"}</Paragraph>
                                            <Paragraph>Calificación: {placeDetails?.rating} ⭐</Paragraph>
                                            <Paragraph>Tipos: {placeDetails?.types || "No disponible"}</Paragraph>
                                        </Card.Content>
                                        {placeDetails?.photos && placeDetails.photos.length > 0 && (
                                            <Image
                                                source={{ uri: placeDetails.photos[0] }}
                                                style={{ width: 100, height: 100, marginVertical: 10 }}
                                            />
                                        )}
                                        <ScrollView horizontal contentContainerStyle={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
                                            <Button
                                                mode="contained"
                                                onPress={() => {
                                                    setDestination({
                                                        latitude: selectedLocation.latitude,
                                                        longitude: selectedLocation.longitude,
                                                    });
                                                    closeModal();
                                                }}
                                                style={[styles.button, { backgroundColor: 'green' }]}
                                            >
                                                <Text style={styles.buttonText}>Indicaciones</Text>
                                            </Button>
                                            <Button
                                                mode="contained"
                                                onPress={() =>
                                                    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`)
                                                }
                                                style={[styles.button, { backgroundColor: 'green' }]}
                                            >
                                                <Text style={styles.buttonText}>Ir a Google Maps</Text>
                                            </Button>
                                            <Button mode="contained" style={[styles.button, { backgroundColor: 'green' }]}>
                                                <Text style={styles.buttonText}>Agregar a Favoritos</Text>
                                            </Button>
                                            <Button mode="outlined" onPress={closeModal} style={[styles.button, { borderColor: 'green' }]}>
                                                <Text style={[styles.buttonText, { color: 'green' }]}>Cerrar</Text>
                                            </Button>
                                        </ScrollView>
                                    </>
                                )}
                            </Card>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        maxHeight: '60%', 
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    button: {
        marginHorizontal: 5,
        minWidth: 100,
    },
    buttonText: {
        color: 'white',
    },
    cancelButton: {
        position: 'absolute',
        top: 92, 
        right: 20,
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default Mapa;













