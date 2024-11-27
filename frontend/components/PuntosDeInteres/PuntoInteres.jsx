import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import puntoInteresApi from '../../api/puntoInteres.js';

const PuntoInteres = ({ limite }) => {
    const navigation = useNavigation();
    const [puntosInt, setpuntosInt] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    const toggleFavorito = async (id_puntoInt) => {
        try {
            console.log('Favorito a id_puntoInt:', id_puntoInt);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                setUserId(parseInt(userId, 10)); 
            } catch (error) {
                console.error('Error al cargar el ID del usuario:', error);
            }
        };
        cargarUsuario();
    }, []);
    
    useEffect(() => {
        const obtenerPuntos = async () => {
            if (!userId) return;
            setLoading(true);
            try {
                const response = await puntoInteresApi.findOneByUser(userId);
                if (!response?.success || !Array.isArray(response.items) || response.items.length === 0) {
                    console.log("El usuario no tiene puntos registrados.");
                    setError('No tienes puntos registrados');
                    setpuntosInt([]);
                    return;
                }
                setpuntosInt(response.items);
            } catch (error) {
                console.error('Error al obtener puntos de interés:', error);
                setError('No se pudieron cargar los puntos de interés.');
            } finally {
                setLoading(false);
            }
        };
        obtenerPuntos();
    }, [userId]);

    const MostrarItem = ({ item }) => (
        <TouchableOpacity> 
            <View style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome name="thumb-tack" size={24} color="green" />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.titulo}</Text>
                    <Text style={styles.description}>{item.direccion}</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavorito(item.id)}>
                    <FontAwesome name={item.esFavorito ? 'heart' : 'heart-o'} size={24} color="green" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color="#00ff00" />;
    if (error) return <Text style={styles.errorText}>{error}</Text>;
    if (!puntosInt || puntosInt.length === 0) {
        return <Text style={styles.errorText}>No se encontraron puntos registrados.</Text>;
    }

    return (
        <View>
            <FlatList
                data={puntosInt}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <MostrarItem item={item} />}
                contentContainerStyle={styles.listContainer}
            />
        </View>
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
        paddingLeft:5,
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

export default PuntoInteres;
