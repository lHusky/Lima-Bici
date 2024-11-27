import React from 'react';
import { View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footer/footer';
import Usuario from '../../components/FormularioUsuario/Usuario';

const PaginaCuenta = ({ navigation }) => {

    const abrirWsp = () => {
        const phoneNumber = "51996620230"; 
        const message = "Hola, necesito ayuda con la aplicación"; 
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        Linking.openURL(url).catch(err => {
            console.error("No se pudo abrir WhatsApp:", err);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Usuario />
            </View>
            <Footer navigation={navigation} currentScreen="PaginaCuenta" />
            <TouchableOpacity style={styles.whatsappButton} onPress={abrirWsp}>
                <Icon name="whatsapp" size={28} color="#fff" />
            </TouchableOpacity>
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
    whatsappButton: {
        position: 'absolute',
        bottom: 120,
        right: 30, 
        backgroundColor: '#25D366', 
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
});

export default PaginaCuenta;
