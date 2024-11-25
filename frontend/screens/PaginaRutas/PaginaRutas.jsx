// src/screens/PaginaRutas.jsx

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import RutasTodas from '../../components/Rutas/RutasTodas.jsx';

const PaginaRutas = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <Header title="Rutas" />
        <View style={styles.content}>
            <RutasTodas />
        </View>
        <Footer navigation={navigation} currentScreen="PaginaRutas" />
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

export default PaginaRutas;
