import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../../components/footer/footer.jsx';
import RutasFavoritas from '../../components/RutasFavoritas/RutasFavoritas.jsx';
import RutasRecientes from '../../components/RutasRecientes/RutasRecientes.jsx';

const PaginaInicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <RutasFavoritas />
                <RutasRecientes />
            </View>
            {/* Pasamos la navegación y la pantalla actual al Footer */}
            <Footer navigation={navigation} currentScreen="PaginaInicio" />
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

export default PaginaInicio;
