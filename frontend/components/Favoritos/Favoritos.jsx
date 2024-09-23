// Favoritos.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Carrousel from './Carrousel';

const Favoritos = ({ navigation }) => {
  const handleVerTodos = () => {
    // Lógica que deseas implementar al hacer clic en "Ver todos"
    Alert.alert('Ver todos', 'Navegar a la página de todos los favoritos');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos</Text>
        <TouchableOpacity onPress={handleVerTodos}>
          <Text style={styles.seeAll}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      <Carrousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20, // Espaciado para el contenedor general
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1, // Espaciado inferior entre el título y el carrusel
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C6C00', // Color azul para el texto "Ver todos"
  },
});

export default Favoritos;

