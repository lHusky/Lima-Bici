// components/Carrousel.js
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Card from './Card';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

// Lista de datos de sugerencias
const data = [
  { id: '1', title: '🚲 Ciclovías' },
  { id: '2', title: '🏪 Tiendas' },
  { id: '3', title: '🧑‍🔧 Talleres' },
  { id: '4', title: '🏯 Restaurantes' },

  // Puedes añadir más sugerencias aquí
];

const Carrousel = ({ onSuggestionSelect }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            onPress={() => onSuggestionSelect(item.title)} // Actualiza la búsqueda
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    position: 'absolute',
    bottom: 95, // Ajustamos la posición del carrusel en la parte inferior
    left: 0,
    right: 0,
  },
});

export default Carrousel;
