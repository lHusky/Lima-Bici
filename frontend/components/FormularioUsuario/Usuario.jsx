import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/gestionUsuario';
import FormularioUsuario from './FormularioUsuario';

const Usuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargar, setCargar] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (userId) {
                    const { usuario } = await api.findOne(userId);
                    console.log("USUARIO RECIBIDO", usuario);
                    if (usuario.fechaCumple) {
                        const dateObj = new Date(usuario.fechaCumple); // Convierte a objeto Date
                        const dia = String(dateObj.getDate()).padStart(2, '0');
                        const mes = String(dateObj.getMonth() + 1).padStart(2, '0'); // Los meses son 0-11
                        const año = dateObj.getFullYear();
                        usuario.fechaCumple = `${dia}/${mes}/${año}`; // Asigna en formato dd/mm/yyyy
                    }
                    setUsuario(usuario);
                } else {
                    console.error("ID de usuario no encontrado en AsyncStorage");
                }
            } catch (error) {
                console.error("Error al obtener el perfil del usuario", error);
            } finally {
                setCargar(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleGuardarCambios = (usuarioActualizado) => {
        if (usuarioActualizado) {
            setUsuario(usuarioActualizado); // Actualiza los datos del usuario si hay cambios
        }
        setMostrarFormulario(false); // Vuelve a la vista principal
    };

    if (cargar) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!usuario) {
        return <Text style={styles.errorText}>Error al cargar el perfil del usuario.</Text>;
    }

    if (mostrarFormulario) {
        return (
            <FormularioUsuario
                usuario={usuario}
                onGuardarCambios={handleGuardarCambios}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/FooterPerfil.png')} // Cambia a tu imagen de avatar
                    style={styles.avatar}
                />
                <Text style={styles.userName}>{usuario.nombre}</Text>
                <Text style={styles.userDOB}>{usuario.fechaCumple || 'Sin fecha registrada'}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setMostrarFormulario(true)} // Abre el formulario
                >
                    <Text style={styles.buttonText}>Editar Usuario</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.addFriendButton}
                    onPress={() => console.log('Agregar amigo')}
                >
                    <Text style={styles.buttonText}>Agregar Amigo</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#d9d9d9',
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    userDOB: {
        fontSize: 16,
        color: '#555',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#a1fca1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    addFriendButton: {
        flex: 1,
        backgroundColor: '#a1fca1',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#2a582a',
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default Usuario;

