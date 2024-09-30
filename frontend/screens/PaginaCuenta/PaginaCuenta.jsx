// src/screens/PaginaCuenta.jsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeaderCuenta from '../../components/header/headerCuenta.jsx';
import Footer from '../../components/footer/footer.jsx';
import FormularioUsuario from '../../components/FormularioUsuario/FormularioUsuario.jsx';

const PaginaCuenta = ({ navigation }) => {
  const userId = 1; // Aquí debes obtener el ID del usuario, puede venir desde la navegación o un estado global

  return (
    <View style={styles.container}>
      <HeaderCuenta />
      <View style={styles.content}>
        <FormularioUsuario userId={userId} />
      </View>
      <Footer navigation={navigation} currentScreen="PaginaCuenta" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20, // Añadimos algo de padding al contenido
  },
});

export default PaginaCuenta;
