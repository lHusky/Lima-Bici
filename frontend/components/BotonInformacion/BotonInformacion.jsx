// src/components/BotonInformacion/BotonInformacion.jsx

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Asegúrate de que la biblioteca esté instalada

const BotonInformacion = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Icon name="eye" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 170, // Ajusta según la posición que desees
        right: 10, // Pegado al lado derecho
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#1C6C00', // Color naranja FFA500
        width: 50, // Ancho del botón
        height: 50, // Alto del botón
        borderRadius: 25, // Para hacer un círculo completo
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
    },
});

export default BotonInformacion;
