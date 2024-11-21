import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import ruta from '../../api/ruta';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrousel from '../../components/Sugerencias/Carrousel.jsx';
import InformacionLugar from '../../components/InformacionLugar/InformacionLugar.jsx';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';

const PaginaBuscar = ({ navigation }) => {
    const searchRef = useRef(null);

    // Estados existentes
    const [destination, setDestination] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [tracking, setTracking] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    // NUEVOS ESTADOS
    const [selectedMarker, setSelectedMarker] = useState(null); // Estado para el marcador seleccionado
    const [newPlaceDetails, setNewPlaceDetails] = useState(null); // Detalles del nuevo lugar
    const [newModalVisible, setNewModalVisible] = useState(false); // Visibilidad del nuevo modal

    const { apiKey, fetchRouteDetails, distance, duration } = useGooglePlaces();

    // Obtener la ubicación actual del usuario
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

    // Manejo de selección desde la barra de búsqueda (Nueva Funcionalidad)
    const handleNewPlaceSelected = (placeInfo) => {
        const {
            name = "No disponible",
            address = "No disponible",
            phoneNumber = "No disponible",
            rating = "No disponible",
            types = ["No disponible"],
            photos = [],
            coordinates,
        } = placeInfo;
    
        // Actualizamos el marcador en el mapa
        setSelectedMarker(coordinates);
    
        // Configuramos los detalles del nuevo lugar
        setNewPlaceDetails({
            name,
            address,
            phoneNumber,
            rating,
            types,
            photos,
        });
    
        // Mostramos el modal con los datos del lugar seleccionado
        setNewModalVisible(true);
    };

    // Manejo del marcador al buscar un lugar
    useEffect(() => {
        if (
            selectedMarker &&
            typeof selectedMarker.latitude === "number" &&
            typeof selectedMarker.longitude === "number"
        ) {
            setDestination(selectedMarker);
        }
    }, [selectedMarker]);

    return (
        <View style={styles.container}>
            <Mapa
                destination={destination}
                setDestination={setDestination} // No interfiere con lo nuevo
                trackUser={tracking}
                apiKey={apiKey}
                routeCoordinates={routeCoordinates}
                setRouteCoordinates={setRouteCoordinates}
                selectedMarker={selectedMarker} // NUEVO: Sincronizamos el marcador con el mapa
            />
            <BarraBusqueda
                ref={searchRef}
                apiKey={apiKey}
                setNewDestination={setSelectedMarker} // Pasamos la función para actualizar el marcador
                onNewPlaceSelected={handleNewPlaceSelected}
            />
            <Carrousel onSuggestionSelect={(suggestion) => searchRef.current?.handleSearch(suggestion)} />

            {/* Modal para detalles básicos */}
            <InformacionLugar
                visible={modalVisible}
                address={direccion}
                distance={distance}
                duration={duration}
                onClose={() => setModalVisible(false)}
                onTrackingToggle={() => setTracking((prev) => !prev)}
                tracking={tracking}
            />

            {/* Modal para nuevos detalles del lugar */}
            <InformacionLugar
                visible={newModalVisible}
                newPlaceDetails={newPlaceDetails} // Pasa el objeto completo
                newSelectedLocation={selectedMarker} // Pasa la ubicación seleccionada
                onClose={() => setNewModalVisible(false)}
                loadingDetails={false} // Si es necesario, ajusta este valor
                setNewDestination={setDestination} // Si aplicable
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






