import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground, Alert, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api/gestionUsuario';
import apiImagen from '../../api/gestorImagenes';
import FormularioUsuario from './FormularioUsuario';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';


const Usuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [cargar, setCargar] = useState(true);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const[imagen,setImagen]=useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');

                if (userId) {
                    const { usuario } = await api.findOne(userId);
                    // console.log("USUARIO RECIBIDO", usuario);
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

    const handleCerrarSesion = async () => {
        try {
            // Obtener el ID del usuario desde AsyncStorage
            const userId = await AsyncStorage.getItem('userId');
            // if (!userId) {
            //     Alert.alert('Error', 'No se encontró el ID del usuario en AsyncStorage.');
            //     return;
            // }
           
            // Llamar al backend para cerrar sesión
            // const response = await api.cerrarSesion(userId);
    
            // if (response.success) {
                // Limpiar AsyncStorage
                await AsyncStorage.clear();
                navigation.navigate('Iniciosesion');
                // Mostrar mensaje de confirmación
            //     Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente.');
            // } else {
            //     Alert.alert('Error', response.message || 'No se pudo cerrar la sesión.');
            // }
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message);
            Alert.alert('Error', 'Ocurrió un problema al cerrar la sesión.');
        }
    };
    
    
    
    const handleAyuda = () => {
        Alert.alert('Ayuda', 'Aquí puedes añadir contenido relacionado con la ayuda.');
        setMostrarMenu(false); // Oculta el menú
    };
    

    const handleGuardarCambios = (usuarioActualizado) => {
        if (usuarioActualizado) {
            setUsuario(usuarioActualizado); // Actualiza los datos del usuario si hay cambios
        }
        setMostrarFormulario(false); // Vuelve a la vista principal
    };

    const seleccionarImagen = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permiso necesario',
                'Necesitamos acceso a tu galería para seleccionar una imagen.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        });

        if (!result.canceled && result.assets?.length) {
            const imagen = result.assets[0];
            subirImagenAlServidor(imagen);
        } else {
            console.log('Selección cancelada');
        }
    };

    const subirImagenAlServidor = async (imagen) => {
        try {
            console.log("Iniciando subida de imagen");
            const response = await apiImagen.subir('perfil', imagen);
            console.log("Respuesta del servidor:", response);
            if (!response?.path) {
                throw new Error("La respuesta del servidor no contiene la propiedad 'path'");
              }
            const rutaNormalizada = response.path.replace(/\\/g, '/'); // Normaliza las barras
            console.log("Ruta normalizada:", rutaNormalizada);
    
            const usuarioActualizado = {
                ...usuario,
                fotoPerfil: rutaNormalizada,
            };
    
            await api.editarUsuario(usuario.id, usuarioActualizado);
            setUsuario(usuarioActualizado);
            setImagen(rutaNormalizada);
            Alert.alert('Éxito', 'Imagen subida correctamente.');
        } catch (error) {
            Alert.alert('Error', 'No se pudo subir la imagen. Por favor, intenta nuevamente.');
            console.error("Error al subir la imagen:", error);
        }
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
            <ImageBackground
                source={require('../../assets/Ciclistas.png')} // Cambia a la imagen de fondo que desees
                style={styles.backgroundImage}
            >
                {/* Botón de engranaje */}
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => setMostrarMenu(true)} // Muestra el menú
                >
                     <Image source={require('../../assets/Engranaje.png')} style={styles.icon} />
                </TouchableOpacity>


                <View style={styles.header}>
                 {/* Imagen de perfil */}
                 <View style={styles.avatarContainer}>
                 <Image
                    source={
                         usuario.fotoPerfil
                            ? { uri: usuario.fotoPerfil }
                             : require('../../assets/PerfilImagen.png')
                            }
                     style={styles.avatar}
                    />

                    {/* Botón de lápiz */}
                     <TouchableOpacity style={styles.editAvatarButton} onPress={seleccionarImagen}>
                         <Image source={require('../../assets/Lapiz.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {/* Nombre y fecha */}
                    <Text style={styles.userName}>{usuario.nombre}</Text>
                    <Text style={styles.userDOB}>{usuario.fechaCumple || 'Sin fecha registrada'}</Text>
                </View>
            </ImageBackground>

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
            {/* Menú desplegable */}
            <Modal
                visible={mostrarMenu}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setMostrarMenu(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleCerrarSesion}
                        >
                            <Text style={styles.modalButtonText}>Cerrar Sesión</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleAyuda}
                        >
                            <Text style={styles.modalButtonText}>Ayuda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeModalButton}
                            onPress={() => setMostrarMenu(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        marginTop: -16,
        marginLeft:-17,
        marginRight:-17,
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    settingsButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 50,
        padding: 8,
    },
    icon: {
        width: 20,
        height: 20,
    },
    header: {
        alignItems: 'center',
        marginTop: 40,
    },
    avatarContainer: {
        position: 'relative',
        marginTop: 158,
    },
    avatar: {
        width: 160,
        height: 160,
        borderRadius: 90,
        backgroundColor: '#d9d9d9',
        marginBottom: 10,
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 50,
        borderWidth: 1,
        borderColor:'#808080',
        padding: 5,
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
        justifyContent: 'space-around',
        padding: 20,
        marginTop: 100,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#88C057',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    addFriendButton: {
        flex: 1,
        backgroundColor: '#88C057',
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
        marginTop: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        width: 300,
    },
    modalButton: {
        backgroundColor: '#88C057',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#2a582a',
        fontWeight: 'bold',
    },
    closeModalButton: {
        marginTop: 10,
        padding: 10,
    },
    
});

export default Usuario;