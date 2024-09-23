import React from 'react';
import { View, StyleSheet } from 'react-native';
import Headerfavoritos from '../../components/header/headerFavoritos.jsx'
import Footer from '../../components/footer/footer.jsx';

const PaginaFavoritos = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Headerfavoritos />
            <View style={styles.content}>

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
