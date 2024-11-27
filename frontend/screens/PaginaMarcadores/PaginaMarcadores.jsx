// src/screens/PaginaMarcadores.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import PuntoInteresPrincipal from '../../components/PuntosDeInteres/PuntoInteresPrincipal.jsx';
import { useNavigation } from '@react-navigation/native';
const PaginaMarcadores = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <Header title="Marcadores" />
        <View style={styles.content}>
            <PuntoInteresPrincipal />
        </View>
        <Footer navigation={navigation} currentScreen="PaginaMarcadores" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    content: {
        flex: 1,
    },
});

export default PaginaMarcadores;
