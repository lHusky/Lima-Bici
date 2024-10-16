import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonFavorito = ({ onPress, tracking }) => {
    

    const buttonStyle = styles.BotonFavorito;

    return (
        <TouchableOpacity style={buttonStyle}>
            <Text style={styles.texto}>Favoritos</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    BotonFavorito: {
        backgroundColor: '#D9D9D6', // GRIS
        padding: 15,
        borderRadius: 100,
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: '#9B9B9B',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BotonFavorito;


    // botonFavoritos: {
    //     backgroundColor: '#D9D9D6', // Color gris
    //     padding: 15,
    //     borderRadius: 100,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // texto: {
    //     color: '#9B9B9B', // Color del texto
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },
