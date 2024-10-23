// src/screens/PaginaCiclovias.jsx

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import DistrictSelector from '../../components/Mapa/DistrictSelector.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';

const PaginaCiclovias = ({ navigation }) => {
    const [destination, setDestination] = useState(null);
    const [selectedDistricts, setSelectedDistricts] = useState(['ALL']);
    const routeId = '123';

    return (
        <View style={styles.container}>
            <Header title="Ciclovías" />
            <DistrictSelector
                selectedDistricts={selectedDistricts}
                setSelectedDistricts={setSelectedDistricts}
            />
            <View style={styles.content}>
                <Mapa
                    destination={destination}
                    setDestination={setDestination}
                    routeId={routeId}
                    selectedDistricts={selectedDistricts} // Asegúrate de que esto se esté pasando
                    showFixedRoutes={true}
                />
            </View>
            <Footer navigation={navigation} currentScreen="PaginaCiclovias" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    content: {
        flex: 1,
    },
});

export default PaginaCiclovias;
