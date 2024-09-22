import React from 'react';
import { View, Alert } from 'react-native';
import Carrousel from '../../components/CarrouselFavoritos/Carrousel.jsx';

const PaginaPrincipal = ({ navigation }) => {
    const data = [
        { id: 1, nombre: 'Mapa 1', imagen: 'https://example.com/map1.jpg' },
        { id: 2, nombre: 'Mapa 2', imagen: 'https://example.com/map2.jpg' },
        // Agrega más mapas aquí
    ];

    const handleCardPress = (id) => {
        Alert.alert('Card Pressed', `You pressed card with ID: ${id}`);
        // Aquí puedes navegar a la pantalla de detalle si lo deseas
        // navigation.navigate('DetalleProducto', { itemId: id });
    };

    return (
        <View>
            <Carrousel data={data} onCardPress={handleCardPress} />
        </View>
    );
};

export default PaginaPrincipal;
