import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Botón Principal */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Principal</Text>
      </TouchableOpacity>

      {/* Botón Mapas */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Mapas</Text>
      </TouchableOpacity>

      {/* Botón Buscar */}
      <TouchableOpacity style={[styles.button, styles.medio]}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Botón Favoritos */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Favoritos</Text>
      </TouchableOpacity>

      {/* Botón Perfil */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row', // Organiza los elementos en una fila
    justifyContent: 'space-around', // Espacio uniforme entre los botones
    backgroundColor: '#BFEAAA', // Color de fondo del footer
    paddingVertical: 10, // Espacio vertical dentro del footer
    borderTopWidth: 1, // Borde superior para separar el footer
    borderColor: '#eaeaea', // Color del borde
    borderRadius: 40,
  },
  medio: {
    backgroundColor: "green",
  },
  button: {
    alignItems: 'center', // Centra el texto dentro de cada botón
  },
  buttonText: {
    fontSize: 14, // Tamaño de la fuente del texto
    color: 'white', // Color del texto
  },
});

export default Footer;
