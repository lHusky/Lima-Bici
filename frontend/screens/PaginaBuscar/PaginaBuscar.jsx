import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import ruta from '../../api/ruta';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrousel from '../../components/Sugerencias/Carrousel.jsx';
import InformacionLugar from '../../components/InformacionLugar/InformacionLugar.jsx';
import BotonInformacion from '../../components/BotonInformacion/BotonInformacion.jsx';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';

const PaginaBuscar = ({ navigation }) => {
    const searchRef = useRef(null);
    const [destination, setDestination] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [tracking, setTracking] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    const { apiKey, fetchRouteDetails, distance, duration } = useGooglePlaces();
    const fixedRoutes = [
        {
            coordinates: [
                { latitude: -12.046374, longitude: -77.042793 },
                { latitude: -12.045874, longitude: -77.033793 },
            ],
        },
        {
            coordinates: [
                { latitude: -12.046374, longitude: -77.032793 },
                { latitude: -12.043874, longitude: -77.022793 },
            ],
        },
    ];

    useEffect(() => {
        const getCurrentLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permiso de localización denegado');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const currentLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
            setOrigin(currentLocation);
            setDestination(currentLocation);
        };

        getCurrentLocation();
    }, []);

    const handleSuggestionSelect = (suggestion) => {
        if (searchRef.current) {
            searchRef.current.handleSearch(suggestion);
            setModalVisible(true);
        }
    };

    const handleMarkerDragEnd = async (latitude, longitude) => {
        const newDestination = { latitude, longitude };
        setDestination(newDestination);

        if (searchRef.current) {
            searchRef.current.handleSearchFromCoords(latitude, longitude);
        }

        if (origin) {
            await fetchRouteDetails(origin, newDestination);
        }

        setModalVisible(true);
    };

    const handleDestinationSelect = async (data, details) => {
        if (details) {
            const { lat, lng } = details.geometry.location;
            const address = data.description;
            const newDestination = {
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setDestination(newDestination);
            setDireccion(address);

            if (origin) {
                await fetchRouteDetails(origin, newDestination);
            }

            setModalVisible(true);
        }
    };

    const handleTrackingToggle = () => {
        setTracking((prevTracking) => !prevTracking);
    };

    useEffect(() => {
        const saveRoute = async () => {
            if (origin && destination && (origin.latitude !== destination.latitude || origin.longitude !== destination.longitude)) {
                await fetchRouteDetails(origin, destination);

                const routeData = {
                    userId: 1,
                    nombre: "Ruta personalizada",
                    descripcion: "Recorrido desde el origen hasta el destino.",
                    distancia: distance,
                    duracion: duration,
                    fechaInicio: new Date().toISOString(),
                    fechaFin: new Date(new Date().getTime() + duration * 60).toISOString(),
                    coordenadas: routeCoordinates.map((coord) => ({
                        lat: coord.latitude,
                        lng: coord.longitude,
                    })),
                };

                try {
                    await ruta.create(routeData);
                    console.log("Ruta guardada exitosamente:", routeData);
                } catch (error) {
                    console.error("Error al guardar la ruta:", error);
                    Alert.alert("Error", "No se pudo guardar la ruta.");
                }
            }
        };

        saveRoute();
    }, [origin, destination]);

    return (
        <View style={styles.container}>
            <Mapa
                destination={destination}
                setDestination={setDestination}
                trackUser={tracking}
                apiKey={apiKey}
                fixedRoutes={fixedRoutes}
                onMarkerDragEnd={handleMarkerDragEnd}
                showFixedRoutes={false} // No mostrar rutas fijas en esta pantalla
            />
            <BarraBusqueda
                ref={searchRef}
                setDestination={setDestination}
                setDireccion={setDireccion}
                apiKey={apiKey}
                onDestinationSelect={handleDestinationSelect}
            />
            <Carrousel onSuggestionSelect={handleSuggestionSelect} />

            <BotonInformacion onPress={() => setModalVisible(true)} />

            <InformacionLugar
                visible={modalVisible}
                address={direccion}
                distance={distance}
                duration={duration}
                onClose={() => setModalVisible(false)}
                onTrackingToggle={handleTrackingToggle}
                tracking={tracking}
            />

            <Footer navigation={navigation} currentScreen="PaginaBuscar" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PaginaBuscar;
