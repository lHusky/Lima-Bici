import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Card from './Card';
import ruta from '../../api/ruta'; // Importa la API

const Carrousel = () => {
  const [rutas, setRutas] = useState([]);  // Estado para las rutas
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga de datos
  const [error, setError] = useState(null);  // Estado para manejar errores

  // useEffect para hacer la llamada a la API al montar el componente
  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const response = await ruta.findAll();  // Llamada a la función API findAll
        setRutas(response);  // Guardamos las rutas obtenidas en el estado
      } catch (error) {
        setError('Error al obtener las rutas');  // Manejamos el error
      } finally {
        setLoading(false);  // Terminamos la carga
      }
    };

    fetchRutas();  // Ejecutamos la función
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;  // Muestra un indicador de carga
  }

  if (error) {
    return (
      <View>
        <Text style={styles.errorText}>{error}</Text>  {/* Muestra el error */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={rutas}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card image={item.image} title={item.title} />}  // Muestra cada ruta con el componente Card
        keyExtractor={(item) => item.id.toString()}  // Asegúrate de que la clave sea un string
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Carrousel;
