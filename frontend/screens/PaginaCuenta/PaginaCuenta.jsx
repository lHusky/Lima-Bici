// src/screens/PaginaCuenta.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import Header from '../../components/header/header.jsx';
import Footer from '../../components/footer/footer.jsx';
import gestionUsuarioApi from '../../api/gestionUsuario.js';

const PaginaCuenta = ({ navigation }) => {
  const userId = 1; // Aquí debes obtener el ID del usuario, puede venir desde la navegación o un estado global
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Carga de datos del usuario al montar el componente
    const fetchUserData = async () => {
      try {
        const response = await gestionUsuarioApi.getUserData(userId);
        if (response.status === 200) {
          const { nombre, telefono, email } = response.data;
          setNombre(nombre);
          setTelefono(telefono);
          setEmail(email);
        }
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar la información del usuario.');
      }
    };
    fetchUserData();
  }, [userId]);

  const handleInputChange = (setter) => (value) => {
    setter(value);
    setHasChanges(true);
  };

  const validateFields = () => {
    let newErrors = {};
    if (!nombre.trim()) newErrors.nombre = '*El nombre es obligatorio';
    if (!telefono.match(/^\d{10}$/)) newErrors.telefono = '*El teléfono debe tener 10 dígitos';
    if (!email.includes('@')) newErrors.email = '*El correo electrónico no es válido';
    if (password && password !== confPassword) {
      newErrors.password = '*Las contraseñas no coinciden';
    } else if (password && password.length < 6) {
      newErrors.password = '*La contraseña debe tener al menos 6 caracteres';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateFields()) return;

    const updatedData = {
      nombre,
      telefono,
      email,
      ...(password ? { password } : {}),
    };

    try {
      const response = await gestionUsuarioApi.updateUser(userId, updatedData);
      if (response.status === 200) {
        Alert.alert('Éxito', 'Los datos se han actualizado correctamente');
        setHasChanges(false);
      } else {
        Alert.alert('Error', response.data.message || 'No se pudieron guardar los cambios.');
      }
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar la información.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <Header title="Cuenta" />
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.label}>Nombre y apellido</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre y apellido"
            value={nombre}
            onChangeText={handleInputChange(setNombre)}
          />
          {errors.nombre && <Text style={styles.errorMessage}>{errors.nombre}</Text>}

          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={handleInputChange(setTelefono)}
            keyboardType="numeric"
          />
          {errors.telefono && <Text style={styles.errorMessage}>{errors.telefono}</Text>}

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleInputChange(setEmail)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

          <Text style={styles.label}>Nueva Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva Contraseña"
            secureTextEntry
            value={password}
            onChangeText={handleInputChange(setPassword)}
          />

          {password.length > 0 && (
            <>
              <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Nueva Contraseña"
                secureTextEntry
                value={confPassword}
                onChangeText={handleInputChange(setConfPassword)}
              />
            </>
          )}
          {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

          {hasChanges && (
            <TouchableOpacity style={styles.boton} onPress={handleSave}>
              <Text style={styles.botonText}>Guardar Cambios</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
        <Footer navigation={navigation} currentScreen="PaginaCuenta" />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  boton: {
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#228B22',
    marginTop: 20,
  },
  botonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default PaginaCuenta;
