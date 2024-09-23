import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderInicio from '../../components/header/headerInicio.jsx'
import Footer from '../../components/footer/footer.jsx';
import Favoritos from '../../components/Favoritos/Favoritos.jsx';
import RutasRecientes from '../../components/RutasRecientes/RutasRecientes.jsx';

const PaginaInicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderInicio />
            <View style={styles.content}>
                <Favoritos />
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
