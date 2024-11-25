import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import RutasFavoritasTodas from '../../components/RutasFavoritas/RutasFavoritasTodas.jsx';
import RutasRecientes from '../../components/Rutas/Rutas.jsx';

const PaginaInicio = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="Inicio" />
            <View style={styles.content}>
                <RutasFavoritasTodas />
                <RutasRecientes />
            </View>
            <Footer navigation={navigation} currentScreen="PaginaInicio" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
});

export default PaginaInicio;
