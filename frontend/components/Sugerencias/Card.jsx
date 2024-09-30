// components/Card.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140, // Ajusta el ancho de las tarjetas
    height: 35, // Ajusta el alto de las tarjetas
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 1, height: 2 }, // Offset de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Difusión de la sombra
    elevation: 2, // Sombra en Android

    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black', // Color del texto
    fontWeight: 'bold',

    paddingHorizontal: 10, // Padding interno

  },
});

export default Card;
