import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Footer = ({ navigation, currentScreen }) => {
  // Imágenes para cada botón
  const buttonData = [
    { label: 'Inicio', image: require('../../assets/FooterCasa.png'), screen: 'PaginaInicio' },
    { label: 'Ciclovías', image: require('../../assets/FooterCiclovia.png'), screen: 'PaginaCiclovias' },
    { label: 'Buscar', image: require('../../assets/FooterLupa.png'), screen: 'PaginaBuscar' },
    { label: 'Favoritos', image: require('../../assets/FooterEstrella.png'), screen: 'PaginaFavoritos' },
    { label: 'Cuenta', image: require('../../assets/FooterPerfil.png'), screen: 'PaginaCuenta' },
  ];

  const handlePress = (screen) => {
    // Solo navegar si la pantalla no es la actual
    if (screen !== currentScreen && navigation) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.footerContainer}>
      {buttonData.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            currentScreen === button.screen && styles.selectedButton, // Comparar con currentScreen directamente
          ]}
          onPress={() => handlePress(button.screen)}
        >
          <Image source={button.image} style={styles.icon} />
          <Text
            style={[
              styles.buttonText,
              currentScreen === button.screen && styles.selectedButtonText, // Cambiar color del texto si está seleccionado
            ]}
          >
            {button.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#88C057',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#eaeaea',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
  },
  selectedButton: {
    backgroundColor: '#1C6C00',
    padding: 5,
    borderRadius: 40,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 2,
  },
  buttonText: {
    fontSize: 10,
    color: 'white',
  },
  selectedButtonText: {
    backgroundColor: '#1C6C00',
    borderRadius: 5,
    paddingHorizontal: 5,
    color: 'white',
  },
});

export default Footer;
