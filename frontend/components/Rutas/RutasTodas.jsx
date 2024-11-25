// src/components/Rutas/RutasTodas.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Rutas from './Rutas';

const RutasTodas = () => {
    return (
        <View style={styles.container}>
            <Rutas />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});

export default RutasTodas;
