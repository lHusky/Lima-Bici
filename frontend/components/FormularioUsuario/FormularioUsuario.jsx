import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import api from '../../api/gestionUsuario';

const FormularioUsuario = ({ id, onUsuarioGuardado }) => {
    const usuarioDefault = {
        nombre: '',
        telefono: '',
        fechaCumple: '',
        fotoPerfil: '',
        contrasena: '',
        email: '',
        peso: '',
    };

    const [usuario, setUsuario] = useState(usuarioDefault);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (id) {
            api.findOne(id).then((data) => setUsuario(data));
            setIsEditing(true);
        }
    }, [id]);

    const handleSave = async () => {
        try {
            if (isEditing) {
                await api.editarUsuario(id, usuario);
                Alert.alert('Éxito', 'Usuario actualizado correctamente');
            } else {
                await api.create(usuario);
                Alert.alert('Éxito', 'Usuario agregado correctamente');
            }
            setIsEditing(false);
            onUsuarioGuardado(); // Recargar lista de usuarios
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al guardar el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{isEditing ? 'Editar Usuario' : 'Agregar Usuario'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={usuario.nombre}
                onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Teléfono"
                value={usuario.telefono}
                onChangeText={(text) => setUsuario({ ...usuario, telefono: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha de Nacimiento"
                value={usuario.fechaCumple}
                onChangeText={(text) => setUsuario({ ...usuario, fechaCumple: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={usuario.email}
                onChangeText={(text) => setUsuario({ ...usuario, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={usuario.contrasena}
                onChangeText={(text) => setUsuario({ ...usuario, contrasena: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Peso"
                value={usuario.peso}
                onChangeText={(text) => setUsuario({ ...usuario, peso: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>{isEditing ? 'Guardar Cambios' : 'Agregar Usuario'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    saveButton: {
        backgroundColor: '#77dd77',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FormularioUsuario;
