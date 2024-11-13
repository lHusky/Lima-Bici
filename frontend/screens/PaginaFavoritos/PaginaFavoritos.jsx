import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../../components/footer/footer.jsx';

import RutasFavoritas from '../../components/RutasFavoritas/RutasFavoritas.jsx';
import PuntosDeInteres from '../../components/PuntosDeInteres/PuntosDeInteres.jsx';

const PaginaFavoritos = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <RutasFavoritas />
                <PuntosDeInteres />
            </View>
            {/* Pasamos la navegación y la pantalla actual al Footer */}
            <Footer navigation={navigation} currentScreen="PaginaFavoritos" />
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

export default PaginaFavoritos;
