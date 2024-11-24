import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ 
  title,
  onPress,
  letraDefecto,
  letraSelected,
  cardDefecto,
  cardSelected,
  altura = 35,
  isSelected = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          { height: altura },
          isSelected ? cardSelected : cardDefecto, // Aplica estilo dinámico para la tarjeta
        ]}>
        <Text
          style={[
            styles.title,
            isSelected ? letraSelected : letraDefecto, // Aplica estilo dinámico para el texto
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
    
const styles = StyleSheet.create({
  card: {
    maxWidth: 280, // Ajusta el ancho de las tarjetas
    minWidth: 80,
    marginHorizontal: 7,
    borderRadius: 100,
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 1, height: 2 }, // Offset de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Difusión de la sombra
    elevation: 2, // Sombra en Android
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10, // Padding interno
  },
});

export default Card;
