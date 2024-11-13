// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../../api/gestionUsuario'; 
// import FormularioUsuario from './FormularioUsuario';

// const Usuario = () => {
//     const [usuario, setUsuario] = useState(null); 
//     const [cargar, setCargar] = useState(true); 
//     const [mostrarFormulario, setMostrarFormulario] = useState(false); 

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const userId = await AsyncStorage.getItem('userId');
//                 if (userId) {
//                     const userData = await api.findOne(userId);
//                     setUsuario(userData); 
//                 } else {
//                     console.error("ID de usuario no encontrado en AsyncStorage");
//                 }
//             } catch (error) {
//                 console.error("Error al obtener el perfil del usuario", error);
//             } finally {
//                 setCargar(false); 
//             }
//         };
//         fetchUserProfile();
//     }, []);

//     const handleCerrarSesion = async () => {
//         await AsyncStorage.removeItem('userId');
//         // Redirigir a la pantalla de inicio de sesión o bienvenida
//     };

//     const handleGuardarCambios = (usuarioActualizado) => {
//         setUsuario(usuarioActualizado); 
//         setMostrarFormulario(false); 
//     };

//     if (cargar) {
//         return <ActivityIndicator size="large" color="#0000ff" />;
//     }

//     if (!usuario) {
//         return <Text>Error al cargar el perfil del usuario.</Text>;
//     }

//     return (
//         <View style={styles.container}>
//             {mostrarFormulario ? (
//                 // Mostrar el formulario de edición
//                 <FormularioUsuario usuario={usuario} onGuardarCambios={handleGuardarCambios} />
//             ) : (
//                 // Mostrar el perfil de usuario
//                 <View>
//                     <Text style={styles.title}>Perfil de Usuario</Text>
//                     <View style={styles.profileContainer}>
//                         <Text style={styles.label}>Nombre</Text>
//                         <Text>{usuario.nombre}</Text>
//                         <Text style={styles.label}>Teléfono</Text>
//                         <Text>{usuario.telefono}</Text>
//                         <Text style={styles.label}>Fecha de Nacimiento</Text>
//                         <Text>{usuario.fechaCumple}</Text>
//                         <Text style={styles.label}>Correo Electrónico</Text>
//                         <Text>{usuario.email}</Text>

//                         <TouchableOpacity style={styles.editButton} onPress={() => setMostrarFormulario(true)}>
//                             <Text style={styles.buttonText}>Editar Usuario</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.logoutButton} onPress={handleCerrarSesion}>
//                             <Text style={styles.buttonText}>Cerrar Sesión</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         paddingTop: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     profileContainer: {
//         width: '90%',
//         backgroundColor: '#a1fca1',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#2a582a',
//         marginVertical: 5,
//     },
//     editButton: {
//         backgroundColor: '#a1fca1',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginVertical: 10,
//         width: '100%',
//     },
//     logoutButton: {
//         backgroundColor: '#e0e0e0',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         width: '100%',
//     },
//     buttonText: {
//         color: '#2a582a',
//         fontWeight: 'bold',
//     },
// });

// export default Usuario;

























// // import React, { useState, useEffect } from 'react';
// // import { View, Text, Button, ActivityIndicator } from 'react-native';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import api from '../../api/gestionUsuario'; 
// // import FormularioUsuario from './FormularioUsuario';

// // const Usuarios = () => {
// //     const [usuario, setUsuario] = useState(null); 
// //     const [cargar, setCargar] = useState(true); 

// //     useEffect(() => {
// //         const fetchUserProfile = async () => {
// //             try {
// //                 const userId = await AsyncStorage.getItem('userId');
// //                 if (userId) {
// //                     // Llama a la función `findOne` de la API para obtener los datos del usuario
// //                     const userData = await api.findOne(userId);
// //                     setUsuario(userData); 
// //                 } else {
// //                     console.error("ID de usuario no encontrado en AsyncStorage");
// //                 }
// //             } catch (error) {
// //                 console.error("Error al obtener el perfil del usuario", error);
// //             } finally {
// //                 setCargar(false); 
// //             }
// //         };
// //         fetchUserProfile();
// //     }, []);

// //     if (cargar) {
// //         return <ActivityIndicator size="large" color="#0000ff" />;
// //     }

// //     if (!usuario) {
// //         return <Text>Error al cargar el perfil del usuario.</Text>;
// //     }

// //     return (
// //         <View>
// //             <Text>Nombre: {usuario.nombre}</Text>
// //             <Text>Teléfono: {usuario.telefono}</Text>
// //             <Text>Fecha de Nacimiento: {usuario.fechaCumple}</Text>
// //             <Text>Correo Electrónico: {usuario.email}</Text>
// //             <Button title="Editar Usuario" onPress={() => {FormularioUsuario}} />
// //             <Button title="Cerrar Sesión" onPress={async () => {
// //                 await AsyncStorage.removeItem('userId');
// //                 // Redirigir a la pantalla de inicio de sesión o de bienvenida
// //             }} />
// //         </View>
// //     );
// // };

// // export default Usuarios;



