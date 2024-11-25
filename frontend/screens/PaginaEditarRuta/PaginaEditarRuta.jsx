import React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import EditarRuta from '../../components/EditarRuta/EditarRuta.jsx';

const PaginaEditarRuta = ({ route, navigation }) => {
    return (
        <View style={styles.container}>
            <Header title="Editar ruta" />
            <View style={styles.content}>
                <EditarRuta route={route} navigation={navigation} />
            </View>
            <Footer navigation={navigation} />
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

export default PaginaEditarRuta;
