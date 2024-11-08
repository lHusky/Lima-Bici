import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import gestionUsuarioApi from '../../api/gestionUsuario.js';
import { Alert } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e5fede'
  },
  caja: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    borderRadius: 20,
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#228B22',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  message: {
    color: 'red',
    marginBottom: 20,
  },
  txt: {
    fontSize: 24,
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 30,
    fontFamily: 'Roboto',
    color: '#333'
  }
});

const InicioNuevaContraseña = ({ navigation, route }) => {
  const { email } = route.params; 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    const payloadUsuario = {
      email,
      newPassword
    }; 

    if (newPassword !== confirmPassword) {
      setMessage('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await gestionUsuarioApi.updatePass(payloadUsuario);
      console.log(response);
      console.log(response.status);

      if (response.status === 200) {
        console.log('Contraseña actualizada'); 
        Alert.alert('Contraseña actualizada correctamente');
        navigation.navigate('Iniciosesion');
      } else if (response.status === 404) {
        setMessage('Error: El usuario no fue encontrado.');
      } else {
        console.error('Error al actualizar contraseña');
        Alert.alert('Error', 'No se pudo actualizar la contraseña.');
      } 
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error.message || error);
      Alert.alert('Error', 'Hubo un problema al actualizar la contraseña.');
    }
};


  return (
    <View style={styles.container}>
    <View style={styles.caja}>
    <Text style={styles.txt}>Ingrese la nueva contraseña</Text>
      <TextInput 
        style={styles.textInput} 
        placeholder="Nueva contraseña" 
        secureTextEntry={true} 
        value={newPassword} 
        onChangeText={setNewPassword} 
      />
      
      <TextInput 
        style={styles.textInput} 
        placeholder="Confirmar contraseña" 
        secureTextEntry={true} 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
      />
      
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity onPress={handleResetPassword}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Restablecer contraseña</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default InicioNuevaContraseña;
