import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';

const BarraBusqueda = forwardRef((_, ref) => {
    const { fetchPlaceDetails, apiKey, setDestination } = useGooglePlaces();
    const searchRef = useRef(null);

    // Usamos useImperativeHandle para exponer funciones hacia el componente padre
    useImperativeHandle(ref, () => ({
        handleSearch(query) {
            if (searchRef.current) {
                console.log('Searching with query:', query);  // Debug para verificar
                searchRef.current.setAddressText(query);
            }
        },
        async handleSearchFromCoords(latitude, longitude) {
            console.log('Searching from coords:', latitude, longitude);  // Debug para verificar
            await fetchAddressFromCoords(latitude, longitude);  // Convierte coordenadas a dirección y actualiza la barra de búsqueda
        }
    }));

    // Función para convertir coordenadas en una dirección usando la API de Google Geocode
    const fetchAddressFromCoords = async (latitude, longitude) => {
        try {
            console.log('Fetching address for coords:', latitude, longitude);  // Debug para verificar
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const result = await response.json();

            // Aseguramos que obtenemos resultados válidos
            if (result.status === "OK" && result.results.length > 0) {
                const address = result.results[0].formatted_address;
                console.log('Fetched address:', address);  // Debug para verificar

                // Actualizamos la barra de búsqueda con la dirección si es válida
                if (searchRef.current) {
                    searchRef.current.setAddressText(address);
                }
            } else {
                // Si no se encuentra una dirección, mantenemos el valor actual en lugar de borrar
                console.warn('No address found for these coordinates.');
                if (searchRef.current) {
                    searchRef.current.setAddressText(''); // O muestra un valor predeterminado si prefieres
                }
            }
        } catch (error) {
            console.error('Error fetching address from coordinates', error);

            // En caso de error, mostramos un valor predeterminado en lugar de dejar la barra en blanco
            if (searchRef.current) {
                searchRef.current.setAddressText('Error al obtener dirección');
            }
        }
    };

    return (
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                ref={searchRef}
                placeholder="Buscar"
                fetchDetails={true}
                onPress={(data, details = null) => {
                    if (details) {
                        const { lat, lng } = details.geometry.location;
                        setDestination({
                            latitude: lat,
                            longitude: lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        });
                    }
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
