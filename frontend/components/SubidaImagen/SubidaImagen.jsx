import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import apiImagen from "../../api/gestorImagenes.js";

const SubidaImagen = ({
  onImageSelect = () => {}, // Imagen seleccionada
  onImageUpload = () => {},
  onImageRemove = () => {}, // Eliminación de la imagen
  renderPlaceholder = () => <View style={[containerStyle]}> </View>, // Componente que se muestre
  containerStyle = {}, // Estilo del contenedor
  previewStyle = {}, // Estilo Vista previa de imagen
  loadingIndicatorColor = "#4CAF50", // Color del indicador de carga
  tipo //puede ser: "puntointeres"  o   "perfil"
}) => {
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [imagenSubida,setImagenSubida]= useState(false);

  const pedirPermisoGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permiso necesario",
        "Necesitamos acceso a tu galería para seleccionar una imagen."
      );
      return false;
    }
    return true;
  };

  const seleccionarImagen = async () => {
    
    const permiso = await pedirPermisoGaleria();
    if (!permiso) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
  
    const handleGuardar = () => {
  if (
    !NombrePunto ||
    !Direccion ||
    !idTipoMarcadorSeleccionado ||
    !nombre ||
    !descripcion ||
    !imagenPath
  ) {
    Alert.alert("Error", "Por favor, completa todos los campos.");
    return;
  }

  console.log("Datos guardados:", datosFormulario);
  Alert.alert("Éxito", "Los datos del formulario se han guardado correctamente.");
  onClose(); // Cierra el modal
};
    
    if (!result.canceled && result.assets?.length) {
      setImagen(result.assets[0]);
      setCargando(true);
      onImageSelect(result.assets[0]);
      subirImagenAlServidor(tipo,result.assets[0]);
    
    } else {
      console.log("Selección cancelada");
      setImagenSubida(false); 
    
    }
    setImagenSubida(true);

  };
  
  const eliminarImagen = () => {
    setImagenSubida(false);
    setImagen(null);
    onImageRemove();
    
  };
  const subirImagenAlServidor = async (tipo, image) => {
    setCargando(true); // Inicia la carga
    try {
      // console.log("Intentando subir la imagen:", image.uri);
      const path = await apiImagen.subir(tipo, image);
      // console.log("Ruta de la imagen subida:", path);
  
      setImagen({ ...image, path });
      setImagenSubida(true); // Marca la imagen como subida
      onImageUpload(path);
    } catch (error) {
      console.error("Error al subir la imagen:", error.message);
      Alert.alert("Error", "No se pudo subir la imagen. Por favor, intenta nuevamente.");
      setImagenSubida(false); // Indica que la imagen no fue subida
    } finally {
      setCargando(false); // Asegura que la carga se detenga
    }
  };
  

  return (
    <View style={imagenSubida ? styles.previewContainer :containerStyle}>
      {!imagen ? 
        <TouchableOpacity onPress={seleccionarImagen}>
          {renderPlaceholder()}
        </TouchableOpacity>
       : 
        <View style={styles.container}>

          {cargando ? 
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={loadingIndicatorColor} />
              <Text style={styles.loadingText}>Subiendo archivo...</Text>
            </View>
           : 
            <View>
              <Image
                source={{ uri: imagen.uri }}
                style={[styles.previewImage, previewStyle]}
                resizeMode="cover"
              />
              <View style={styles.infoContainer}>
                <Text style={styles.imageInfo}>
                  {`Tamaño: ${(imagen.fileSize / 1024).toFixed(2)} KB`}
                </Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={eliminarImagen}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
    // paddingVertical: 20,
    minHeight: 100, 
  },
  previewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  infoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  imageInfo: {
    fontSize: 14,
    color: "#555",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    padding: 8,
    borderRadius: 5,
    
  },
  deleteButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "",
    height: 100,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: "#555",
  },
});

export default SubidaImagen;
