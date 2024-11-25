// src/screens/PaginaRuta.js

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import InformacionLugar from '../../components/InformacionLugar/InformacionLugar.jsx';
import RutaMapa from '../../components/Mapa/RutaMapa.jsx';
import useLocationTracker from '../../hooks/useLocationTracker';

const PaginaRuta = ({ navigation, route }) => {
    const id_ruta = route?.params?.id_ruta || null;
    const [modalVisible, setModalVisible] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [direccion, setDireccion] = useState('Ruta Activa');
    const { distance, duration, startTracking, stopTracking } = useLocationTracker();

    if (!id_ruta) {
        return (
            <View style={styles.container}>
                <Text>Error: No se recibió el ID de la ruta.</Text>
            </View>
        );
    }

    const handleTrackingToggle = () => {
        if (tracking) {
            stopTracking();
            setTracking(false);
            Alert.alert('Tracking detenido', 'El tracking ha sido detenido.');
        } else {
            startTracking();
            setTracking(true);
            Alert.alert('Tracking iniciado', 'El tracking ha sido iniciado.');
        }
    };

    return (
        <View style={styles.container}>
            <Header title="Ruta" />
            <View style={styles.editButtonContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('PaginaEditarRuta', { id_ruta })}
                >
                    <Ionicons name="pencil" size={24} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <RutaMapa id_ruta={id_ruta} trackUser={tracking} />
            </View>
            <InformacionLugar
                visible={modalVisible}
                address={direccion}
                distance={`${distance.toFixed(2)} m`}
                duration={`${duration.toFixed(2)} min`}
                onClose={() => setModalVisible(false)}
                onTrackingToggle={handleTrackingToggle}
                tracking={tracking}
            />
            <Footer navigation={navigation} currentScreen="PaginaRuta" />
            <TouchableOpacity
                style={styles.infoButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="information-circle" size={32} color="#1C6C00" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    editButtonContainer: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
    },
    editButton: {
        backgroundColor: '#1C6C00',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    infoButton: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'white',
        borderRadius: 50,
        padding: 10,
        elevation: 5,
    },
});

export default PaginaRuta;
