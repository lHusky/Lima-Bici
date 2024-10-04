import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrousel from '../../components/Sugerencias/Carrousel.jsx';
import BotonRecorrido from '../../components/BotonRecorrido/BotonRecorrido.jsx';

const PaginaBuscar = ({ navigation }) => {
    const barraBusquedaRef = useRef(null); // Creamos una referencia para la barra de búsqueda

    const searchRef = useRef(null);
    const [destination, setDestination] = useState(null);

    const handleSuggestionSelect = (suggestion) => {
        if (searchRef.current) {
            searchRef.current.handleSearch(suggestion);
        }
    };

    // Función para manejar el arrastre del marcador
    const handleMarkerDragEnd = (latitude, longitude) => {
        console.log('Marker dragged to:', latitude, longitude);  // Debug para verificar
        if (searchRef.current) {
            searchRef.current.handleSearchFromCoords(latitude, longitude);
        }
    };

    return (
        <View style={styles.container}>
            <Mapa destination={destination} barraBusquedaRef={barraBusquedaRef} setDestination={setDestination} onMarkerDragEnd={handleMarkerDragEnd} />
            <BarraBusqueda ref={searchRef} setDestination={setDestination} />
            <BotonRecorrido />
            <Carrousel onSuggestionSelect={handleSuggestionSelect} />
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
