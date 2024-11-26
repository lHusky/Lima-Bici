import React from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from '../../components/footer/footer';
import Usuario from '../../components/FormularioUsuario/Usuario';

const PaginaCuenta = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Usuario />
            </View>
            <Footer navigation={navigation} currentScreen="PaginaCuenta" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    content: {
        flex: 1,
        padding: 20,
    },
});

export default PaginaCuenta;
