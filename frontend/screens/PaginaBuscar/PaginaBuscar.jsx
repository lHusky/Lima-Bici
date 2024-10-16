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
    const [destination, setDestination] = useState(null); // Lugar destino seleccionado
    const [direccion, setDireccion] = useState(''); // Dirección como texto
    const [tracking, setTracking] = useState(false); // Estado de rastreo
    const [modalVisible, setModalVisible] = useState(false); // Control de visibilidad del modal de información
    const [origin, setOrigin] = useState(null); // Guardamos la ubicación actual del usuario
    const [routeCoordinates, setRouteCoordinates] = useState([]); // Coordenadas del recorrido

    const { apiKey, fetchRouteDetails, distance, duration } = useGooglePlaces(); // Extraemos distancia y duración

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
            setOrigin(currentLocation); // Guardamos la ubicación actual
            setDestination(currentLocation); // Inicializamos el destino en la misma ubicación que el origen
        };

        getCurrentLocation(); // Obtenemos la ubicación al montar el componente
    }, []);

    // Al seleccionar una sugerencia del carrusel, actualizamos el destino y la barra de búsqueda
    const handleSuggestionSelect = (suggestion) => {
        if (searchRef.current) {
            searchRef.current.handleSearch(suggestion);
            setModalVisible(true);  // Mostrar el modal al seleccionar una sugerencia
        }
    };

    // Cuando el marcador se mueve manualmente, actualizamos la barra de búsqueda y mostramos el modal
    const handleMarkerDragEnd = (latitude, longitude) => {
        if (searchRef.current) {
            searchRef.current.handleSearchFromCoords(latitude, longitude);
            setModalVisible(true);  // Mostrar el modal al mover el marcador
        }
    };

    // Alternar el estado de rastreo
    const handleTrackingToggle = () => {
        console.log('Toggling tracking:', !tracking);
        setTracking((prevTracking) => !prevTracking); // Alternamos entre rastrear y detener rastreo
    };

    // Guardar la ruta y sus coordenadas en la base de datos
    useEffect(() => {
        const saveRoute = async () => {
            // Verificar si origen y destino son diferentes
            if (origin && destination && (origin.latitude !== destination.latitude || origin.longitude !== destination.longitude)) {
                await fetchRouteDetails(origin, destination); // Usar la ubicación actual como origen

                // Enviar datos de la ruta a la API
                const routeData = {
                    userId: 1, // ID del usuario, reemplazar según el contexto de autenticación
                    nombre: "Ruta personalizada",
                    descripcion: "Recorrido desde el origen hasta el destino.",
                    distancia: distance,
                    duracion: duration,
                    fechaInicio: new Date().toISOString(),
                    fechaFin: new Date(new Date().getTime() + duration * 60 * 1000).toISOString(), // Duración estimada
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
                setDestination={setDestination} // Actualiza el destino desde el marcador
                trackUser={tracking}
                onMarkerDragEnd={handleMarkerDragEnd}
                apiKey={apiKey}
                routeCoordinates={routeCoordinates}
                setRouteCoordinates={setRouteCoordinates} // Actualiza las coordenadas de la ruta en tiempo real
            />
            <BarraBusqueda
                ref={searchRef}
                setDestination={setDestination} // Actualiza el destino desde la barra de búsqueda
                setDireccion={setDireccion}
                apiKey={apiKey}
            />
            <Carrousel onSuggestionSelect={handleSuggestionSelect} />

            <InformacionLugar
                visible={modalVisible}
                address={direccion}
                distance={distance}
                duration={duration}
                onClose={() => setModalVisible(false)}
                onTrackingToggle={handleTrackingToggle}
                tracking={tracking} // Estado de rastreo para el botón
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
