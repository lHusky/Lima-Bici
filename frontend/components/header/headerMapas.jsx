import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const headerMapas = ({ navigation, currentScreen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mapas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20, // Espaciado para el contenedor general
      },
      header: {
        marginTop: 40,
        marginBottom: 10, // Espaciado inferior entre el título y el carrusel
      },
      title: {
        fontSize: 40,
        fontWeight: 'bold',
      },
      seeAll: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1C6C00', // Color azul para el texto "Ver todos"
      },
});

export default headerMapas;
