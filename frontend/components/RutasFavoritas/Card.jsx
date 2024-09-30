import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ image, title }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />  {/* Muestra la imagen desde una URI */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 250,
    height: 150,
    marginHorizontal: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    padding: 5,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Card;
