import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../../components/footer/footer.jsx';

const PaginaMapas = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

            </View>
            {/* Pasamos la navegación y la pantalla actual al Footer */}
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
