import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, TextInput, FlatList, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './AdministrarUsuariosStyle';
import { useFocusEffect } from '@react-navigation/native';
import AdminFooter from '../../../components/AdminFooter/AdminFooter';

// Importa el servicio de gestión de usuarios
import gestionUsuarioApi from '../../../api/gestionUsuario.js'

const AdministrarUsuarios = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);

  // Función para cargar los usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const data = await gestionUsuarioApi.findAll();
      console.log(data);
      if (data && data.usuarios) {
        setUsuarios(data.usuarios);
        setFilteredUsuarios(data.usuarios);
      } else {
        Alert.alert('Error', 'No se pudieron cargar los usuarios.');
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      Alert.alert('Error', 'Hubo un problema al cargar los usuarios.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUsuarios();
    }, [])
  );

  useEffect(() => {
    const results = usuarios.filter((usuario) =>
      usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsuarios(results);
  }, [searchQuery, usuarios]);

  const handleRegistrarUsuario = () => {
    navigation.navigate('AdminRegistrarUsuario');
  };

  const handleEditarUsuario = (usuario) => {
    navigation.navigate('AdminEditarUsuario', { usuarioId: usuario.id });
  };

  const handleEliminarUsuario = (id, nombre) => {
    Alert.alert('Confirmación', `¿Deseas eliminar al usuario: ${nombre}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            const response = await gestionUsuarioApi.remove(id);
            if (response.status === 200 && response.data.success) {
              setUsuarios((prevUsuarios) =>
                prevUsuarios.filter((usuario) => usuario.id !== id)
              );
              Alert.alert('Usuario eliminado correctamente.');
            } else {
              Alert.alert('Error', 'No se pudo eliminar el usuario.');
            }
          } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            Alert.alert('Error', 'Hubo un problema al eliminar el usuario.');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* ...resto del código permanece igual... */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Administrador</Text>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate('Iniciosesion')}
        >
          <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.registrarButton}
        onPress={handleRegistrarUsuario}
      >
        <Text style={styles.buttonText}>Registrar Usuario</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar usuario..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredUsuarios}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.nombre}</Text>
              <Text style={styles.userEmail}>{item.email}</Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity onPress={() => handleEditarUsuario(item)}>
                <Ionicons name="pencil-outline" size={24} color="#228B22" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleEliminarUsuario(item.id, item.nombre)}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.noUsersText}>No se encontraron usuarios</Text>
        }
      />
    <AdminFooter navigation={navigation} currentScreen="AdministrarUsuarios" />
    </View>
  );
};

export default AdministrarUsuarios;
