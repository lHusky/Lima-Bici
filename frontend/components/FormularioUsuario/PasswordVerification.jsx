// src/components/PasswordVerification.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const PasswordVerification = ({ onVerified }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const verifyPassword = () => {
    // Aquí podrías llamar a una API para verificar la contraseña actual.
    if (currentPassword === '12345') { // Ejemplo de verificación, debes ajustarlo a tu lógica.
      setIsVerified(true);
      Alert.alert('Verificación', 'Contraseña verificada correctamente.');
    } else {
      Alert.alert('Error', 'Contraseña incorrecta.');
    }
  };

  const handleSaveNewPassword = () => {
    onVerified(newPassword);
  };

  return (
    <View style={styles.container}>
      {!isVerified ? (
        <>
          <Text style={styles.label}>Contraseña actual</Text>
          <TextInput
            style={styles.input}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry
            placeholder="Ingrese su contraseña actual"
          />
          <Button title="Verificar" onPress={verifyPassword} color="#88C057" />
        </>
      ) : (
        <>
          <Text style={styles.label}>Nueva contraseña</Text>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="Ingrese su nueva contraseña"
          />
          <Button title="Guardar nueva contraseña" onPress={handleSaveNewPassword} color="#88C057" />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default PasswordVerification;
