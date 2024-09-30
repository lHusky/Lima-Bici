// src/components/FormularioUsuario.jsx
import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import EditableField from './EditableField';
import PasswordVerification from './PasswordVerification';
import api from '../../api/gestionUsuario';

const FormularioUsuario = ({ userId }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const response = await api.findOne(userId);
        const { nombre, email, telefono } = response.data;
        setNombre(nombre);
        setEmail(email);
        setTelefono(telefono);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los datos del usuario.');
      }
    };

    cargarDatosUsuario();
  }, [userId]);

  const handleGuardarNombre = async (nuevoNombre) => {
    try {
      await api.update({ userId, nombre: nuevoNombre });
      setNombre(nuevoNombre);
      Alert.alert('Éxito', 'Nombre actualizado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el nombre.');
    }
  };

  const handleGuardarEmail = async (nuevoEmail) => {
    try {
      await api.update({ userId, email: nuevoEmail });
      setEmail(nuevoEmail);
      Alert.alert('Éxito', 'Email actualizado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el email.');
    }
  };

  const handleGuardarTelefono = async (nuevoTelefono) => {
    try {
      await api.update({ userId, telefono: nuevoTelefono });
      setTelefono(nuevoTelefono);
      Alert.alert('Éxito', 'Teléfono actualizado correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el teléfono.');
    }
  };

  const handleGuardarPassword = async (nuevaPassword) => {
    try {
      await api.update({ userId, password: nuevaPassword });
      setPassword(nuevaPassword);
      Alert.alert('Éxito', 'Contraseña actualizada correctamente.');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar la contraseña.');
    }
  };

  return (
    <View style={styles.formContainer}>
      <EditableField label="Nombre" value={nombre} onSave={handleGuardarNombre} />
      <EditableField label="Email" value={email} onSave={handleGuardarEmail} />
      <EditableField label="Teléfono" value={telefono} onSave={handleGuardarTelefono} />
      <PasswordVerification onVerified={handleGuardarPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
});

export default FormularioUsuario;
