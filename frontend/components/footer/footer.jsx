import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const Footer = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  // Imágenes para cada botón
  const buttonData = [
    { label: 'Principal', image: require('../../assets/FooterCasa.png') },
    { label: 'Mapas', image: require('../../assets/FooterMapa.png') },
    { label: 'Buscar', image: require('../../assets/FooterLupa.png') },
    { label: 'Favoritos', image: require('../../assets/FooterEstrella.png') },
    { label: 'Perfil', image: require('../../assets/FooterPerfil.png') },
  ];

  return (
    <View style={styles.footerContainer}>
      {buttonData.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            selectedButton === index && styles.selectedButton,
          ]}
          onPress={() => setSelectedButton(index)}
        >
          {/* Muestra la imagen del botón */}
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
    borderRadius: 0,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70, // Establece un ancho fijo para cada botón
    height: 70, // Establece una altura fija para cada botón
  },
  selectedButton: {
    backgroundColor: '#1C6C00',
    padding: 5,
    borderRadius: 40,
  },
  icon: {
    width: 30, // Ancho fijo de la imagen
    height: 30, // Altura fija de la imagen
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
