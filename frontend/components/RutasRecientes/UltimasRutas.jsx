import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Si usas Expo, puedes usar @expo/vector-icons
import api from '../../api/ruta.js'; // Importamos la API desde el archivo base.js

const UltimasRutas = () => {
  const [rutas, setRutas] = useState([]);  // Estado para almacenar las rutas recientes
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
  const [error, setError] = useState(null);  // Estado para manejar errores

  // useEffect para hacer la llamada a la API al montar el componente
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await api.findAll();  // Llamada a la función API findAll
        // Suponemos que la respuesta es un array de objetos con una propiedad `createdAt` para la fecha de creación
        const sortedRutas = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Ordenamos por fecha descendente
        const recentRutas = sortedRutas.slice(0, 2);  // Seleccionamos las dos rutas más recientes
        setRutas(recentRutas);  // Actualizamos el estado con las dos rutas más recientes
      } catch (error) {
        setError('Error al obtener las rutas recientes');  // Manejamos el error
      } finally {
        setLoading(false);  // Terminamos la carga
      }
    };

    fetchRutas();  // Ejecutamos la función
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome name="map-marker" size={24} color="green" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <Text style={styles.distance}>{item.distance}</Text>
    </View>
  );

  if (loading) {
    // Muestra un indicador de carga mientras los datos se están obteniendo
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    // Muestra un mensaje de error si ocurre algún problema
    return (
      <View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={rutas}
      keyExtractor={(item) => item.id.toString()}  // Usamos id como clave única
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
    justifyContent: 'space-between',
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
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default UltimasRutas;
