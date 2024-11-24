import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator 

 } from 'react-native';
import * as Location from 'expo-location';
import ruta from '../../api/ruta';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrousel from '../../components/Sugerencias/CarruselGeneral.jsx';
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


    const datos = [
        { id: '1', title: '🚲 Ciclovías' },
        { id: '2', title: '🏪 Tiendas' },
        { id: '3', title: '🧑‍🔧 Talleres' },
        { id: '4', title: '🏯 Restaurantes' },
    ];

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
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
            } catch (error) {
                console.error("Error obteniendo la ubicación:", error);
                Alert.alert('Error', 'No se pudo obtener la ubicación.');
            }
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
            {origin?(
            <Mapa
                destination={destination}
                setDestination={setDestination} // No interfiere con lo nuevo
                trackUser={tracking}
                apiKey={apiKey}
                routeCoordinates={routeCoordinates}
                setRouteCoordinates={setRouteCoordinates}
                selectedMarker={selectedMarker} // NUEVO: Sincronizamos el marcador con el mapa
            />
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
            <BarraBusqueda
                ref={searchRef}
                apiKey={apiKey}
                setNewDestination={setSelectedMarker} // Pasamos la función para actualizar el marcador
                onNewPlaceSelected={handleNewPlaceSelected}
            />
            <Carrousel 
                data={datos} 
                onItemPress={(item) => console.log('Seleccionaste:', item)}
                tamanoLetra={16}
                altura={40}
                colorLetra="black"
                />
          
            {/* Modal para detalles básicos */}
            <InformacionLugar
                visible={modalVisible}
                address={direccion}
                distance={distance}
                duration={duration}
                onClose={() => setModalVisible(false)}
                onTrackingToggle={() => setTracking((prev) => !prev)}
                tracking={tracking}
                loadingDetails={false} // Si es necesario, ajusta este valor
                setNewDestination={setDestination} // Si aplicable
            />

            {/* Modal para nuevos detalles del lugar */}
            <InformacionLugar
                visible={newModalVisible}
                newPlaceDetails={newPlaceDetails} // Pasa el objeto completo
                newSelectedLocation={selectedMarker} // Pasa la ubicación seleccionada
                onClose={() => setNewModalVisible(false)}
                onOpen={() => setNewModalVisible(true)}
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






