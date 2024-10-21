// src/screens/PaginaMapas/PaginaMapas.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import Mapa from '../../components/Mapa/Mapa.jsx';

const PaginaMapas = ({ navigation }) => {
    const routeId = '123'; // Reemplaza '123' con el ID de la ruta específica si es necesario.

    return (
        <View style={styles.container}>
            <Header title="Mapas" />
            <View style={styles.content}>
                <Mapa routeId={routeId} showFixedRoutes={true} />
            </View>
            <Footer navigation={navigation} currentScreen="PaginaMapas" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1, // Ocupa todo el espacio disponible excepto el del footer
    },
});

export default PaginaMapas;
