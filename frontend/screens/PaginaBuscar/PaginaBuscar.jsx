// pages/PaginaBuscar.jsx
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';
import BarraBusqueda from '../../components/BarraBusqueda/BarraBusqueda.jsx';
import Carrousel from '../../components/Sugerencias/Carrousel.jsx';
import BotonRecorrido from '../../components/BotonRecorrido/BotonRecorrido.jsx';

const PaginaBuscar = ({ navigation }) => {
    const [region, setRegion] = React.useState({
        latitude: -12.0464,
        longitude: -77.0428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const searchRef = useRef(null);

    const handleSuggestionSelect = (suggestion) => {
        if (searchRef.current) {
            searchRef.current.handleSearch(suggestion);
        }
    };

    return (
        <View style={styles.container}>
            <Mapa region={region} setRegion={setRegion} />
            <BarraBusqueda setRegion={setRegion} searchRef={searchRef} />
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
