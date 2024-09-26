// components/MapComponent.jsx
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

// Obtenemos las dimensiones de la pantalla para que el mapa ocupe todo el fondo
const { width, height } = Dimensions.get('window');

const Mapa = ({ region, setRegion }) => {
    return (
        <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(region) => setRegion(region)}
        />
    );
};

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
    },
});

export default Mapa;
