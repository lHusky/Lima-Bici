import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const BarraBusqueda = forwardRef(({ setDestination, setDireccion, apiKey, onDestinationSelect }, ref) => {
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
                setDireccion(address);
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
                fetchDetails={true}
                onPress={(data, details) => onDestinationSelect(data, details)}
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
