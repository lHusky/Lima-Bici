import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator 

 } from 'react-native';
import * as Location from 'expo-location';
import ruta from '../../api/ruta';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrusel from '../../components/Sugerencias/CarruselGeneral.jsx';
import BotonInformacion from '../../components/BotonInformacion/BotonInformacion.jsx';
import InformacionLugar from '../../components/InformacionLugar/InformacionLugar.jsx';
import InformacionLugar1 from '../../components/InformacionLugar/InformacionLugar1.jsx';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminFooter from '../../components/AdminFooter/AdminFooter';
import puntoInteresApi from '../../api/puntoInteres.js';
import TipopuntoInteresApi from '../../api/tipoPuntoInteres.js';

const PaginaBuscar = ({ navigation }) => {
    const searchRef = useRef(null);

    const [isAdmin, setIsAdmin] = useState(false);
    // Estados existentes
    const [destination, setDestination] = useState(null);
    const [direccion, setDireccion] = useState('');
    const [tracking, setTracking] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);

    // NUEVOS ESTADOS
    const [selectedMarker, setSelectedMarker] = useState(null); // Estado para el marcador seleccionado
    const [newPlaceDetails, setNewPlaceDetails] = useState(null); // Detalles del nuevo lugar
    const [newModalVisible, setNewModalVisible] = useState(false); // Visibilidad del nuevo modal

    const { apiKey, fetchRouteDetails, distance, duration } = useGooglePlaces();

    const [cargaItemsCarrusel, setcargaItemsCarrusel] = useState(false);
    const [ItemsCarrusel, setItemsCarrusel] = useState(false);


    const datos = [
        { id: '1', titulo: '🚲 Ciclovías' },
        { id: '2', titulo: '🏪 Tiendas' },
        { id: '3', titulo: '🧑‍🔧 Talulores' },
        { id: '4', titulo: '🏯 Restaurantes' },
    ];
    const buscarItemsCarrusel = async () => {
        try {
            const userId = await AsyncStorage.getItem("userId");
    
            // Obtener los datos del backend
            const response = await puntoInteresApi.findOneByUser(userId);
            if (!response?.success || !Array.isArray(response.items) || response.items.length === 0) {
                console.log("El usuario no tiene puntos registrados.");
                setcargaItemsCarrusel(false);
                setItemsCarrusel([]);
                return;
            }
            // Extraer los puntos de interés
            const puntoInteres = response.items;
    
            // Obtener IDs únicos de tipos de puntos y ordenarlos
            const IDtipospuntoInteres = [...new Set(puntoInteres.map(item => item.id_tipo))].sort();
    
    
            // Obtener detalles de cada tipo de punto de interés
    
            const TipoPuntoInteres = await Promise.all(
                IDtipospuntoInteres.map(item => TipopuntoInteresApi.findOne(item))
            );
    
            const TodosTipoPuntoInteres = TipoPuntoInteres.map(res => res.item);
            console.log("Datos procesados para el carrusel:", TodosTipoPuntoInteres);
    
            // Actualizar los estados con los datos procesados
            setcargaItemsCarrusel(true);
            setItemsCarrusel(TodosTipoPuntoInteres);
        } catch (error) {
            console.error("Error al buscar items para el carrusel:", error);
            setcargaItemsCarrusel(false);
            setItemsCarrusel([]);
        }
    };
    
    useEffect(() => {
        const checkIfAdmin = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId && parseInt(userId, 10) === 1) {
                    setIsAdmin(true); // Es administrador
                } else {
                    setIsAdmin(false); // Usuario regular
                }
                console.log(isAdmin)
            } catch (error) {
                console.error('Error al obtener el ID de usuario:', error);
            }
        };
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
        checkIfAdmin();
        getCurrentLocation();
        buscarItemsCarrusel();
    }, []);
    const handleTrackingToggle = () => {
        setTracking((prevTracking) => !prevTracking);
    };
    
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
            {ItemsCarrusel.length > 0 && 
            <Carrusel 
                data={ItemsCarrusel} 
                onItemPress={(item) => console.log('Seleccionaste:', item)}
                tamanoLetra={16}
                altura={40}
                colorLetra="black"
                otrosEstilos={{
                    position: "absolute",
                    bottom: 95,
                    left: 0,
                    right: 0,
                    paddingVertical: 10,
                  }}
                />
            }
            <BotonInformacion onPress={() => setModalVisible1(true)} />
            <InformacionLugar1
                visible={modalVisible1}
                address={direccion}
                distance={distance}
                duration={duration}
                onClose={() => setModalVisible1(false)}
                onTrackingToggle={handleTrackingToggle}
                tracking={tracking}
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
            {isAdmin ? (
                <AdminFooter navigation={navigation} currentScreen="PaginaBuscar" />
            ) : (
                <Footer navigation={navigation} currentScreen="PaginaBuscar" />
            )}
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default PaginaBuscar;






