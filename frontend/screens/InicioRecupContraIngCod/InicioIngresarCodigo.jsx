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
  textContraseña: {
    color: 'gray',
    textDecorationLine: 'underline',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  message: {
    color: 'red',
    marginBottom: 5,
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

const InicioIngresarCodigo = ({route, navigation }) => {
    const { email } = route.params; 
    const [codigo, setCodigo] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSendEmail = async () => {
      const payloadUsuario = {
        email,
      }; 
      try {
            
        const response = await gestionUsuarioApi.createVerfCode(payloadUsuario)
        if (response.status === 201) {
            console.log('Correo enviado a ', email); 
            Alert.alert('Se envió nuevamente el correo a: ' + email);
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

    const handleVerifyCode = async () => {
      const payloadUsuario = { email };
      if (!codigo) {
          setMessage('Por favor, ingrese el código');
          return;
      }
      try {
          const response = await gestionUsuarioApi.findVerfCode(payloadUsuario);
          console.log(response); 
          console.log(response.status);
          if (response.status === 200) {
              console.log(response.data.codigo); 
              if (response.data.codigo === codigo) {
                  navigation.navigate('InicioNuevaContraseña', { email });
                  setMessage('');
              } else {
                  setMessage('El código es incorrecto');
              }
          } else if (response.status === 410) {
              setMessage('El código ha expirado');
          } else if (response.status === 404) {
              console.error('Código no disponible', response.message); 
          } else {
              console.error('Error al recuperar código', response.message); 
          }
      } catch (error) {
          console.error('Error al verificar el código:', error.message || 'Hubo un problema inesperado');
          Alert.alert('Error', error.message || 'Hubo un problema al verificar el código.');
      }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.caja}>
      <Text style={styles.txt}>Ingrese el código de verificación</Text>
      <TextInput 
        style={styles.textInput} 
        placeholder="Ingrese el código" 
        value={codigo}
        onChangeText={setCodigo}
        keyboardType="numeric"
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity onPress={handleSendEmail}>
                <Text style={styles.textContraseña}>Volver a enviar correo</Text>
              </TouchableOpacity>

      <TouchableOpacity onPress={handleVerifyCode}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </View>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default InicioIngresarCodigo;
