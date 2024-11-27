import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

const AdminFooter = ({ navigation, currentScreen }) => {
  const adminButtonData = [
    { label: 'Usuarios', image: require('../../assets/FooterPerfil.png'), screen: 'AdministrarUsuarios' },
    { label: 'Puntos', image: require('../../assets/FooterMapa.png'), screen: 'PaginaBuscar' },
  ];

  const handlePress = (screen) => {
    if (screen !== currentScreen && navigation) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.footerContainer}>
      {adminButtonData.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            currentScreen === button.screen && styles.selectedButton,
          ]}
          onPress={() => handlePress(button.screen)}
        >
          <Image source={button.image} style={styles.icon} />
          <Text
            style={[
              styles.buttonText,
              currentScreen === button.screen && styles.selectedButtonText,
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

export default AdminFooter;
