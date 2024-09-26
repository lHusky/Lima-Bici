import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderCuenta from '../../components/header/headerCuenta.jsx'
import Footer from '../../components/footer/footer.jsx';

const PaginaCuenta = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <HeaderCuenta />
            <View style={styles.content}>

            </View>
            {/* Pasamos la navegación y la pantalla actual al Footer */}
            <Footer navigation={navigation} currentScreen="PaginaCuenta" />
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

export default PaginaCuenta;
