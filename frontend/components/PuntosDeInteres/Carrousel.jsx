// Carrousel.js
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Card from './Card';

// Lista de datos de ejemplo que contiene las imágenes
const data = [
  { id: '1', image: require('../../assets/MapaEjemplo.png'), title: 'Mapa 1' },
  { id: '2', image: require('../../assets/MapaEjemplo.png'), title: 'Mapa 2' },
  { id: '3', image: require('../../assets/MapaEjemplo.png'), title: 'Mapa 3' },
];

const Carrousel = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Card image={item.image} title={item.title} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});

export default Carrousel;
