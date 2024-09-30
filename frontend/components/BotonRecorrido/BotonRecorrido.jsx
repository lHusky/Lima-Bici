import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const BotonRecorrido = () => {
  const handleStartPress = () => {
    // Aquí puedes manejar la acción cuando se presione el botón
    console.log("Botón Iniciar presionado");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
        <Text style={styles.buttonText}>Iniciar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Posiciona de manera absoluta
    bottom: '25%', // Centrado en la mitad de la pantalla verticalmente
    left: '50%', // Centrado horizontalmente
    transform: [{ translateX: -40 }, { translateY: 40 }], // Ajuste para el centrado del botón (depende de su tamaño)
    zIndex: 1, // Asegura que esté por encima del mapa
  },
  startButton: {
    backgroundColor: 'orange',
    width: 80,
    height: 80,
    borderRadius: 40, // Hace que el botón sea circular
    justifyContent: 'center', // Centra el texto dentro del botón
    alignItems: 'center',
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BotonRecorrido;
