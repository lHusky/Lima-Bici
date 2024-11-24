// components/Card.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';

const Card = ({ 
      title,
      // imagen,
      onPress,
      tamanoLetra=14,
      altura = 35,
      colorLetra='black'
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[
        styles.card,
        {
          height:altura
        }
        ]}>
        <Text 
          style={[styles.title,
            {color:colorLetra,
            fontSize:tamanoLetra,
            }]}
        >{title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 150, // Ajusta el ancho de las tarjetas
    marginHorizontal: 7,
    backgroundColor: 'white',
    borderRadius: 100,
    shadowColor: '#000', // Sombra
    shadowOffset: { width: 1, height: 2 }, // Offset de la sombra
    shadowOpacity: 0.2, // Opacidad de la sombra
    shadowRadius: 2, // Difusión de la sombra
    elevation: 2, // Sombra en Android
    marginBottom:2,
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
