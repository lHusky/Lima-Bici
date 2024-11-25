// src/components/Rutas/RutasTodas.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import RutasFavoritas from './RutasFavoritas';

const RutasFavoritasTodas = () => {
    return (
        <View style={styles.container}>
            <RutasFavoritas />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});

export default RutasFavoritasTodas;
