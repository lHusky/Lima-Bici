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
    marginBottom: 5,
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

const InicioRecuperarContraseña = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  

  const handleSendEmail = async () => {
    const payloadUsuario = {
      email,
    }; 
    if (!email) {
      setMessage('Por favor, ingrese su correo electrónico.');
      return;
    }
    try {
          
      const response = await gestionUsuarioApi.createVerfCode(payloadUsuario)
      if (response.status === 201) {
          console.log('Correo enviado a ', email); 
          navigation.navigate('InicioIngresarCodigo', { email });
          setMessage('');
      } else if (response.status === 404) {
          setMessage('El correo electrónico no está registrado.');
      } else {
          console.error('Error al enviar codigo:', response.data.message);
          Alert.alert('Error', response.data.message);
      }      
      } catch (error) {
      console.error('Error al enviar codigo:', error);
      Alert.alert('Error', 'Hubo un problema al enviar codigo.');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.caja}>
      <Text style={styles.txt}>Recuperar contraseña</Text>
      <TextInput 
        style={styles.textInput} 
        placeholder="Ingrese su correo electrónico" 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity onPress={handleSendEmail}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enviar correo</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default InicioRecuperarContraseña;
