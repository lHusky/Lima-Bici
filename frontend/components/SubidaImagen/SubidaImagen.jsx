// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Alert,
//   ActivityIndicator,
// } from "react-native";
// import { launchImageLibrary } from "react-native-image-picker";
// import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";

// const SubidaImagen = ({
//   onImageSelect = () => {}, //Imagen Seleccionada
//   onImageRemove = () => {}, //Eliminación de la imagen
//   renderPlaceholder = () => <Text>📤 Subir Imagen</Text>, // Componente que se muestre
//   containerStyle = {}, // Estilo del contenedor 
//   previewStyle = {}, // Estilo Vista previa de imagen
//   loadingIndicatorColor = "#4CAF50", // Color del indicador de carga
// }) => {
//   const [imagen, setImagen] = useState(null);
//   const [cargando, setCargando] = useState(false);

//   const pedirPermisoGaleria = async () => {
//     const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//     if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) { //si la app no tiene permiso lo solicita (request)
//       const status = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//       return status === RESULTS.GRANTED;
//     }
//     return result === RESULTS.GRANTED; //sino solo muestra que si hay permiso
//   };

//   const seleccionarImagen = async () => {
//     const permiso = await pedirPermisoGaleria();
//     if (!permiso) {
//       Alert.alert(
//         "Permiso necesario",
//         "Necesitamos acceso a tu galería para seleccionar una imagen.",
//         [
//           {
//             text: "Cancelar",
//             style: "cancel",
//           },
//           {
//             text: "Continuar",
//             onPress: async () => {
//               const nuevoPermiso = await pedirPermisoGaleria();
//               if (nuevoPermiso) {
//                 seleccionarImagen(); // Reintentar la selección de imagen.
//               }
//             },
//           },
//         ]
//       );
//       return;
//     }
  
//     launchImageLibrary(
//       {
//         mediaType: "photo",
//         quality: 0.8,
//       },
//       (response) => {
//         if (response.didCancel) {
//           console.log("Selección cancelada");
//         } else if (response.errorMessage) {
//           Alert.alert("Error", response.errorMessage);
//         } else if (response.assets && response.assets[0]) {
//           const file = response.assets[0];
//           setImagen(file);
//           setCargando(true);
//           onImageSelect(file);
//           // Simular carga
//           setTimeout(() => {
//             setCargando(false);
//           }, 2000);
//         }
//       }
//     );
//   };
  
//   // Eliminar imagen seleccionada
//   const eliminarImagen = () => {
//     setImagen(null);
//     onImageRemove();
//   };

//   return (
//     <View style={[styles.container, containerStyle]}>
//       {!imagen ? (
//         <TouchableOpacity onPress={seleccionarImagen}>
//           {renderPlaceholder()}
//         </TouchableOpacity>
//       ) : (
//         <View style={styles.previewContainer}>
//           {cargando ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="small" color={loadingIndicatorColor} />
//               <Text style={styles.loadingText}>Subiendo archivo...</Text>
//             </View>
//           ) : (
//             <>
//               <Image
//                 source={{ uri: imagen.uri }}
//                 style={[styles.previewImage, previewStyle]}
//                 resizeMode="cover"
//               />
//               <View style={styles.infoContainer}>
//                 <Text style={styles.imageInfo}>
//                   {`Tamaño: ${(imagen.fileSize / 1024).toFixed(2)} KB`}
//                 </Text>
//               </View>
//               <TouchableOpacity style={styles.deleteButton} onPress={eliminarImagen}>
//                 <Text style={styles.deleteButtonText}>Eliminar</Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   previewContainer: {
//     alignItems: "center",
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   infoContainer: {
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   imageInfo: {
//     fontSize: 14,
//     color: "#555",
//   },
//   deleteButton: {
//     backgroundColor: "#f44336",
//     padding: 8,
//     borderRadius: 5,
//   },
//   deleteButtonText: {
//     color: "white",
//     fontSize: 14,
//     fontWeight: "bold",
//   },
//   loadingContainer: {
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 14,
//     color: "#555",
//   },
// });

// export default SubidaImagen;
