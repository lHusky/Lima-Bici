//LIBRERIAS REACT
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, View, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//ESTILOS
import styles from './InicioSesionStyle.jsx'; 

//SERVICES
import {handleLogin} from '../../services/validacion_credenciales/handleLogin.jsx'

 const Iniciosesion = () => {

 const navigation = useNavigation();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [isSelected, setSelection] = useState(false);
 const [emailError, setEmailError] = useState('');
 const [passwordError, setPasswordError] = useState(''); 

 const handleLoginPress = async () => {
  const validado = await handleLogin(email, password, setEmailError, setPasswordError);
  if (validado) {
    navigation.navigate('Footer');
  }
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
              keyboardType="email-address"
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

              <TouchableOpacity onPress={() => navigation.navigate('InicioRecuperarContraseña')}>
                <Text style={styles.textContraseña}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleLoginPress}>
              <View style={[styles.containerBoton, styles.botonLogin]}>
                <Text style={styles.textoLogin}>Iniciar sesión</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegistroUsuario')}>
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
