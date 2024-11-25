import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, Alert } from 'react-native';
import BotonIniciar from '../BotonIniciar/BotonIniciar';
import BotonFavoritos from '../BotonFavoritos/BotonFavoritos';
import { PanGestureHandler } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const InformacionLugar = ({ visible, address, distance, duration, onClose, onTrackingToggle, tracking, isFavorite, favoriteId }) => {

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

                        <View style={styles.infoContainer}>
                            <View style={styles.infoItem}>
                                <Icon name="bicycle" size={20} color="#000" />
                                <Text style={styles.infoText}>{distance}</Text>
                            </View>
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
    distance: PropTypes.string,
    duration: PropTypes.string,
    isFavorite: PropTypes.bool, // Nuevo prop para indicar si es favorito
    favoriteId: PropTypes.number, // Nuevo prop para el ID del favorito (si existe)
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
        height: '30%',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '60%',
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
        marginLeft: 5,
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
