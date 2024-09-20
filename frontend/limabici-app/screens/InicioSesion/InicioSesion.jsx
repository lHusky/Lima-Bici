import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, View, Text, StyleSheet, ImageBackground } from 'react-native';
import usuarioApi from '../../api/usuario';

const styles = StyleSheet.create({
  fondo: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  container: { 
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: '10%',
    paddingBottom: 10,
    justifyContent: 'space-between',
    marginBottom: 30, 
    marginTop: 20,
  },
  textInput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
  },
  placeholderText: {
    color: 'gray',
  },
  containerOpciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#000',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 13,
  },
  textContraseña: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 13,
  },
  containerBoton: {
    borderRadius: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonLogin: {
    backgroundColor: '#228B22',
  },
  textoLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  textoCrear: {
    color: '#228B22',
    fontWeight: 'bold',
    fontSize: 18
  }
});

const Iniciosesion = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userAccounts, setUserAccounts] = useState([]);
  
  const handleLogin = async () => {
    try {
      setEmailError('');
      setPasswordError('');

      const usuariosData = await usuarioApi.findAll();
      setUserAccounts(usuariosData);

      const user = userAccounts.find(user => user.email === email);
      if (!user) {
        setEmailError('*El correo no está registrado');
        return;
      }

      if (user.password !== password) {
        setPasswordError('*La contraseña es incorrecta');
        return;
      }

      // se ingresa a home de la aplicacion
      console.log('Inicio de sesión exitoso');

    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const handleCreateAccount = () => {
    navigation.navigate('RegistroUsuario'); 
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <ImageBackground source={require('./fondofinal.jpeg')} style={styles.fondo}>
          <View style={styles.container}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Email" 
              placeholderTextColor={styles.placeholderText.color} 
              onChangeText={setEmail} 
              value={email}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput 
              style={styles.textInput} 
              placeholder="Contraseña" 
              placeholderTextColor={styles.placeholderText.color} 
              secureTextEntry={true} 
              onChangeText={setPassword} 
              value={password}
            />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <View style={styles.containerOpciones}>
              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  style={[styles.checkbox, isSelected && styles.checked]} 
                  onPress={() => setSelection(!isSelected)}
                >
                  {isSelected && <View style={{ width: 16, height: 16, backgroundColor: 'black' }} />}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>Recordar</Text>
              </View>

              <TouchableOpacity>
                <Text style={styles.textContraseña}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLogin}>
              <View style={[styles.containerBoton, styles.botonLogin]}>
                <Text style={styles.textoLogin}>Iniciar sesión</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCreateAccount}>
              <View style={[styles.containerBoton]}>
                <Text style={styles.textoCrear}>Crear cuenta</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Iniciosesion;
