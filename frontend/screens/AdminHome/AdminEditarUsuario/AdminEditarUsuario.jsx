import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import styles from './AdminEditarUsuarioStyle.jsx'; 
import { handleEdit } from '../../../services/validacion_credenciales/handleEdit.jsx';
import gestionUsuarioApi from '../../../api/gestionUsuario.js';

const AdminEditarUsuario = ({ route, navigation }) => {
  const { usuarioId } = route.params; 
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await gestionUsuarioApi.findOne(usuarioId);
        console.log(response);
        console.log(response.success);
        console.log(response.usuario);
        if (response.success && response.usuario) {
          const usuario = response.usuario;
          setNombre(usuario.nombre);
          setTelefono(usuario.telefono);
          setEmail(usuario.email);
        } else {
          Alert.alert('Error', 'No se pudo cargar la información del usuario.');
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        Alert.alert('Error', 'Hubo un problema al cargar el usuario.');
      }
    };

    fetchUsuario();
  }, [usuarioId]);

  const handleGuardarCambios = async () => {
    const payloadUsuario = {
      id: usuarioId,
      nombre,
      email,
      telefono,
    };

    const validado = await handleEdit(payloadUsuario, setEmailError, setPhoneError);
    console
    if (validado) {
      Alert.alert('Éxito', 'Usuario actualizado correctamente.', [
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
        <Text style={styles.titulo}>Editando usuario</Text>
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
          <TouchableOpacity style={styles.boton} onPress={handleGuardarCambios}>
            <Text style={styles.botonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdminEditarUsuario;
