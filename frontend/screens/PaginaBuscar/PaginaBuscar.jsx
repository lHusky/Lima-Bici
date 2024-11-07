import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import ruta from '../../api/ruta';
import { fetchBikePaths } from '../../services/fetchBikePaths.jsx';
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
    const [bikePaths, setBikePaths] = useState([]);
    const [loadingBikePaths, setLoadingBikePaths] = useState(true);

    const { apiKey, fetchRouteDetails, distance, duration } = useGooglePlaces();

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permiso de localización denegado');
                    return;
                }
                const location = await Location.getCurrentPositionAsync({});
                const currentLocation = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };
                setOrigin(currentLocation);
                setDestination(currentLocation);
            } catch (error) {
                Alert.alert('Error', 'No se pudo obtener la ubicación actual.');
                console.error('Error al obtener la ubicación:', error);
            }
        };

        getCurrentLocation();
    }, []);

    useEffect(() => {
        const loadBikePaths = async () => {
            if (!origin) return;
            setLoadingBikePaths(true);
            try {
                const paths = await fetchBikePaths({
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    radius: 5000, // Cargar ciclovías dentro de un radio de 5 km
                });
                setBikePaths(paths);
            } catch (error) {
                Alert.alert('Error', 'No se pudieron cargar las ciclovías. Intenta nuevamente.');
                console.error('Error al cargar ciclovías:', error);
            } finally {
                setLoadingBikePaths(false);
            }
        };

        loadBikePaths();
    }, [origin]);

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

    return (
        <View style={styles.container}>
            <Mapa
                destination={destination}
                setDestination={setDestination}
                trackUser={tracking}
                apiKey={apiKey}
                onMarkerDragEnd={handleMarkerDragEnd}

            />
            <BarraBusqueda
                ref={searchRef}
                setDestination={setDestination}
                setDireccion={setDireccion}
                apiKey={apiKey}
                onDestinationSelect={handleDestinationSelect}
            />
            {loadingBikePaths && <ActivityIndicator size="large" color="#00aaff" />}
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
