// components/SearchBar.jsx
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// Usamos `forwardRef` para manejar la referencia de la barra de búsqueda desde el padre
const BarraBusqueda = forwardRef(({ setRegion }, ref) => {
    const searchRef = useRef(null);

    // Expone el método `handleSearch` al componente padre a través de la referencia
    useImperativeHandle(ref, () => ({
        handleSearch(query) {
            if (searchRef.current) {
                searchRef.current.setAddressText(query); // Actualiza el texto de la barra de búsqueda
            }
        }
    }));

    return (
        <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
                ref={searchRef}
                placeholder="Buscar"
                onPress={(data, details = null) => {
                    // 'details' es el resultado completo del lugar
                    const { lat, lng } = details.geometry.location;
                    setRegion({
                        latitude: lat,
                        longitude: lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    });
                }}
                query={{
                    key: 'TU_CLAVE_DE_API', // Reemplaza con tu API key de Google Places
                    language: 'es', // Opcional, para establecer el idioma
                }}
                styles={{
                    container: styles.container,
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView,
                }}
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
        alignItems: 'center', // Centra el elemento horizontalmente
    },
    container: {
        marginTop: 40,

        width: '90%', // Controla el ancho de la barra de búsqueda
    },
    textInputContainer: {
        borderRadius: 10, // Bordes redondeados
        backgroundColor: '#fff', // Fondo blanco del contenedor
        height: 40, // Controla el alto del contenedor
        shadowColor: '#000', // Sombra
        shadowOffset: { width: 1, height: 2 }, // Offset de la sombra
        shadowOpacity: 0.2, // Opacidad de la sombra
        shadowRadius: 2, // Difusión de la sombra
        elevation: 2, // Sombra en Android
    },
    textInput: {
        height: 40, // Alto del input
        color: '#000', // Color del texto
        fontSize: 16, // Tamaño del texto
        paddingHorizontal: 10, // Padding interno
        borderRadius: 10, // Bordes redondeados
    },
    listView: {
        backgroundColor: 'white', // Fondo de la lista de sugerencias
        borderRadius: 10, // Bordes redondeados en la lista
    },
});

export default BarraBusqueda;
