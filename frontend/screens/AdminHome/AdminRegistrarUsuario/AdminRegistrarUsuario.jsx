import React, { useState} from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener instalada esta librería

import styles from './AdminRegistrarUsuarioStyle';

import { handleSubmit } from '../../../services/validacion_credenciales/handleSubmit.jsx';

const AdminRegistrarUsuario = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [confPasswordError, setConfPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    const payloadUsuario = {
        // rol: 'cliente',
        nombre,
        email,
        contrasena: password,
        // estado: 'Activo',
        telefono,
    }; 
    
    const handleSubmitPress = async () => {
        const validado = await handleSubmit(payloadUsuario, confPassword,setEmailError,setPasswordError,setPhoneError,setConfPasswordError);
        if (validado) {
          Alert.alert('Éxito', 'Usuario creado correctamente.', [
            { text: 'OK', onPress: () => navigation.navigate('AdministrarUsuarios') },
          ]);
        }
      };

    const handleLogout = () => {
        navigation.navigate('Iniciosesion');
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Administrador</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
      <View style={styles.container2}>
      <Text style={styles.titulo}>Registrar usuario</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre y apellido"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Teléfono"
                                value={telefono}
                                onChangeText={(text) => {
                                    const numericText = text.replace(/[^0-9]/g, '');
                                    setTelefono(numericText);
                                }}
                                keyboardType="numeric"
                            />
                            {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                            {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar Contraseña"
                                secureTextEntry
                                value={confPassword}
                                onChangeText={setConfPassword}
                            />
                            {confPasswordError ? <Text style={styles.errorMessage}>{confPasswordError}</Text> : null}
                            <TouchableOpacity style={styles.boton} onPress={handleSubmitPress}>
                                <Text style={styles.botonText}>Crear cuenta</Text>
                            </TouchableOpacity>
                        </View>
      </View>
    </View>
  );
};



export default AdminRegistrarUsuario;
