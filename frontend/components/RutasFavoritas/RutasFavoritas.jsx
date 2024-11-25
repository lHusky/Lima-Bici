import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import favoritoApi from '../../api/favorito.js';

const RutasFavoritas = ({ limite }) => {
    const navigation = useNavigation();
    const [rutas, setRutas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const usuarioActual = { id: 1 };

    const handlePress = (id_ruta) => {
        console.log('Navigating to PaginaRuta with id_ruta:', id_ruta);
        navigation.navigate('PaginaRuta', { id_ruta });
    };

    const toggleFavorito = async (id_ruta) => {
        try {
            const response = await favoritoApi.toggleFavorito({ id_usuario: usuarioActual.id, id_ruta });
            // Remove route from favorites if unfavorited
            if (!response.data.isFavorito) {
                const nuevasRutas = rutas.filter((ruta) => ruta.id !== id_ruta);
                setRutas(nuevasRutas);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        const fetchFavoritas = async () => {
            try {
                const response = await favoritoApi.getFavoritas(usuarioActual.id);
                console.log('Fetched favorite routes:', response.data);
                setRutas(response.data);
            } catch (error) {
                console.error('Error fetching favorite routes:', error);
                setError('Error al obtener las rutas favoritas');
            } finally {
                setLoading(false);
            }
        };

        fetchFavoritas();
    }, [limite]);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="map-marker" size={24} color="green" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.nombre}</Text>
                    <Text style={styles.description}>{item.descripcion}</Text>
                </View>
                <Text style={styles.distance}>{`${item.distancia} km`}</Text>
                <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                    <FontAwesome name="heart" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color="#00ff00" />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;

    return (
        <FlatList
            data={rutas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    iconContainer: {
        backgroundColor: '#E3F8E0',
        borderRadius: 10,
        padding: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#6B6B6B',
    },
    distance: {
        fontSize: 14,
        color: '#6B6B6B',
        marginRight: 20,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default RutasFavoritas;
