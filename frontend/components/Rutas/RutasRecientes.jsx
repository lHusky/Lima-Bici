import React from 'react';
import { View, StyleSheet } from 'react-native';
import Rutas from './Rutas';

const RutasRecientes = () => {
    return (
        <View style={styles.container}>
          <Rutas limite={4} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
});

export default RutasRecientes;
