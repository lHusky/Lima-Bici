import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const BarraBusqueda = forwardRef(({ apiKey, setNewDestination, setNewDireccion, onNewPlaceSelected }, ref) => {
    const searchRef = useRef(null);

    useImperativeHandle(ref, () => ({
        handleSearch(query) {
            if (searchRef.current) {
                searchRef.current.setAddressText(query);
            }
        },
        async handleSearchFromCoords(latitude, longitude) {
            await fetchAddressFromCoords(latitude, longitude);
        }
    }));

    const fetchAddressFromCoords = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
            );
            const result = await response.json();
            if (result.status === "OK" && result.results.length > 0) {
                const address = result.results[0].formatted_address;
                if (searchRef.current) {
                    searchRef.current.setAddressText(address);
                }
                setNewDireccion && setNewDireccion(address); // Actualizamos la nueva dirección
            }
        } catch (error) {
            console.error('Error fetching address from coordinates', error);
        }
    };

    const handleNewDestinationSelect = (data, details) => {
        if (details && details.geometry && details.geometry.location) {
            const { lat, lng } = details.geometry.location;
            const address = details.formatted_address || "No disponible";
            const name = details.name || "No disponible";
            const phoneNumber = details.formatted_phone_number || "No disponible";
            const rating = typeof details.rating !== "undefined" ? details.rating : "No disponible";
            const types = details.types?.length
                ? details.types.map((type) => type.replace("_", " "))
                : ["No disponible"];
            const photos = details.photos?.length
                ? details.photos.map((photo) =>
                      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`
                  )
                : [];

            // Actualizamos el marcador y detalles
            setNewDestination?.({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });

            setNewDireccion?.(address);

            onNewPlaceSelected?.({
                name,
                address,
                phoneNumber,
                rating,
                types,
                photos,
                coordinates: { latitude: lat, longitude: lng },
            });
        } else {
            Alert.alert("Error", "No se pudo obtener la información del lugar.");
        }
    };

    const clearText = () => {
        if (searchRef.current) {
            searchRef.current.setAddressText(''); // Borra el texto
        }
    };

    return (
        <View style={styles.searchContainer}>
            {/* Barra de búsqueda */}
            <GooglePlacesAutocomplete
                ref={searchRef}
                placeholder="Buscar"
                fetchDetails={true}
                onPress={handleNewDestinationSelect} // Usamos el nuevo manejador
                query={{
                    key: apiKey,
                    language: 'es',
                }}
                styles={{
                    ...styles,
                    textInputContainer: {
                        ...styles.textInputContainer,
                    },
                }}
            />
            {/* Botón de borrar (X) sobrepuesto en la barra */}
            <TouchableOpacity style={styles.clearButton} onPress={clearText}>
                <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    searchContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        alignItems: 'center',
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
        position: 'relative', // Asegura que el botón "X" se posicione relativo a este contenedor
        width: '90%',
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
    clearButton: {
        position: 'absolute',
        right: 25, // Pegado al borde derecho del contenedor
        top: '50%', // Centrado verticalmente
        transform: [{ translateY: -10 }], // Ajuste vertical
        zIndex: 1, // Asegura que esté encima de otros elementos
        padding: 0, // Sin relleno adicional
    },
    clearButtonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default BarraBusqueda;






