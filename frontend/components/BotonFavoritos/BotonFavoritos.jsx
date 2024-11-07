import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonFavoritos = () => {
    return (
        <TouchableOpacity style={styles.boton}>
            <Text style={styles.texto}>Favoritos</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#ECEAEA',
        padding: 15,
        borderRadius: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: '#777',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BotonFavoritos;
