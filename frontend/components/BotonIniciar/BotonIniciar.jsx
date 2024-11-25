import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonIniciar = ({ onPress, tracking }) => {
    useEffect(() => {
        console.log('BotonIniciar: el estado de tracking ha cambiado a:', tracking);
    }, [tracking]);

    const buttonStyle = tracking ? styles.botonDetener : styles.botonIniciar;

    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress}>
            <Text style={styles.texto}>{tracking ? 'Detener' : 'Iniciar'}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    botonIniciar: {
        backgroundColor: '#6ECF68', // Verde para "Iniciar"
        padding: 15,
        borderRadius: 100,
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonDetener: {
        backgroundColor: '#FF0000', // Rojo para "Detener"
        padding: 15,
        borderRadius: 100,
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default BotonIniciar;
