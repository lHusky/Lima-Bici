import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';

const BarraBusqueda = forwardRef((_, ref) => {
    const { fetchPlaceDetails, apiKey, setDestination } = useGooglePlaces();
    const searchRef = useRef(null);

    useImperativeHandle(ref, () => ({
        handleSearch(query) {
            if (searchRef.current) {
                searchRef.current.setAddressText(query);
            }
        },
        handleSearchFromCoords(latitude, longitude) {
            fetchAddressFromCoords(latitude, longitude);  // Convierte coordenadas a dirección y actualiza la barra de búsqueda
        }
    }));

    // Función para convertir coordenadas en una dirección usando la API de Google Places
    const fetchAddressFromCoords = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const result = await response.json();
            const address = result.results[0]?.formatted_address || '';
            if (searchRef.current) {
                searchRef.current.setAddressText(address);
            }
        } catch (error) {
            console.error('Error fetching address from coordinates', error);
        }
    };

    return (
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                ref={searchRef}
                placeholder="Buscar"
                onPress={(data, details = null) => {
                    // Utilizamos fetchPlaceDetails para obtener detalles del lugar y mover el marcador
                    fetchPlaceDetails(data.place_id).then((location) => {
                        setDestination({
                            latitude: location.lat,
                            longitude: location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });
                    });
                }}
                query={{
                    key: apiKey,
                    language: 'es',
                }}
                styles={styles}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    container: {
        marginTop: 40,
        width: '90%',
    },
    textInputContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        height: 40,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    textInput: {
        height: 40,
        color: '#000',
        fontSize: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    listView: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default BarraBusqueda;
