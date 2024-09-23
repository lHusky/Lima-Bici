import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Footer = ({ navigation, currentScreen }) => {
  const [selectedButton, setSelectedButton] = useState(null);

  // Imágenes para cada botón
  const buttonData = [
    { label: 'Inicio', image: require('../../assets/FooterCasa.png'), screen: 'PaginaInicio' },
    { label: 'Mapas', image: require('../../assets/FooterMapa.png'), screen: 'Mapas' },
    { label: 'Buscar', image: require('../../assets/FooterLupa.png'), screen: 'Buscar' },
    { label: 'Favoritos', image: require('../../assets/FooterEstrella.png'), screen: 'PaginaFavoritos' },
    { label: 'Cuenta', image: require('../../assets/FooterPerfil.png'), screen: 'Cuenta' },
  ];

  // Efecto que establece el botón seleccionado según la pantalla actual
  useEffect(() => {
    const index = buttonData.findIndex(button => button.screen === currentScreen);
    setSelectedButton(index);
  }, [currentScreen]);

  const handlePress = (index, screen) => {
    setSelectedButton(index);
    // Navegar a la pantalla seleccionada si existe
    if (screen && navigation) {
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
            selectedButton === index && styles.selectedButton,
          ]}
          onPress={() => handlePress(index, button.screen)}
        >
          <Image source={button.image} style={styles.icon} />
          <Text
            style={[
              styles.buttonText,
              selectedButton === index && styles.selectedButtonText,
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
