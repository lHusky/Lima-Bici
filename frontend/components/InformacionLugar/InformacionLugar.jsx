import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import BotonIniciar from '../BotonRecorrido/BotonInicio.jsx';
import BotonFavoritos from '../BotonFavorito/BotonFavorito.jsx';
import { PanGestureHandler } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos los íconos de FontAwesome
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

const InformacionLugar = ({ visible, address, distance, duration, onClose, onTrackingToggle, tracking }) => {
    const handleGesture = ({ nativeEvent }) => {
        if (nativeEvent.translationY > 50) {
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <PanGestureHandler onGestureEvent={handleGesture}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.handleBar} />

                        <Text style={styles.addressText}>Dirección seleccionada:</Text>
                        <Text style={styles.address}>{address}</Text>

                        {/* Contenedor que muestra la distancia y duración uno al lado del otro */}
                        <View style={styles.infoContainer}>
                            {/* Ícono de bicicleta para la distancia */}
                            <View style={styles.infoItem}>
                                <Icon name="bicycle" size={20} color="#000" />
                                <Text style={styles.infoText}>{distance}</Text>
                            </View>

                            {/* Ícono de reloj para la duración */}
                            <View style={styles.infoItem}>
                                <Icon name="clock-o" size={20} color="#000" />
                                <Text style={styles.infoText}>{duration}</Text>
                            </View>
                        </View>

                        <View style={styles.buttonContainer}>
                            <BotonIniciar 
                                onPress={onTrackingToggle} 
                                tracking={tracking}
                            />
                            <BotonFavoritos style={styles.button} />
                        </View>
                    </View>
                </View>
            </PanGestureHandler>
        </Modal>
    );
};

InformacionLugar.propTypes = {
    visible: PropTypes.bool.isRequired,
    address: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onTrackingToggle: PropTypes.func, 
    tracking: PropTypes.bool, 
    distance: PropTypes.string, // Añadimos distancia como prop
    duration: PropTypes.string, // Añadimos duración como prop
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: '100%',
        height: '30%', // Ajustamos el tamaño para mostrar más información
        padding: 20,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        alignItems: 'center',
    },
    handleBar: {
        width: 50,
        height: 5,
        backgroundColor: '#ccc',
        borderRadius: 2.5,
        marginBottom: 10,
    },
    addressText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    address: {
        fontSize: 14,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    infoContainer: {
        flexDirection: 'row', // Pone los elementos uno al lado del otro
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%', // Ajustamos el tamaño del contenedor
        marginBottom: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    infoText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5, // Espacio entre el ícono y el texto
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },
});

export default InformacionLugar;
