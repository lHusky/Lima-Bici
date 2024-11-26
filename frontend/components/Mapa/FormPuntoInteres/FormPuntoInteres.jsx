import { MaterialIcons } from "@expo/vector-icons"; 
import React, { useEffect, useState} from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import InputConContador from "./InputConContador.jsx"
import Carrusel from "../../Sugerencias/CarruselGeneral.jsx"
import tipoPuntoInteresApi from '../../../api/tipoPuntoInteres.js';
import puntoInteresApi from '../../../api/puntoInteres.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import gestionUsuarioApi from '../../../api/gestionUsuario.js';

import SubidaImagen from '../../SubidaImagen/SubidaImagen.jsx';
import CampoEditable from './CampoEditable.jsx';

const FormPuntoInteres = ({ 
    visible = false,  
    transparent, 
    animationType, 
    onClose= () => {},
    volver = () => {},
    nombrePunto="No hay nombre registrado",
    direccion="No hay direccion registrada",
    latitud,
    longitud

}) => {
  // const [tipoMarcador, setTipoMarcador] = useState("Ciclovías");
  const [nombre, setNombre] = useState("");
  const [IdCreador, setIdCreador] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [datosTipoPunto, setDatosTipoPunto] = useState(null);
  const [cargando, setCargando] = useState(true);
 
  const [NombrePunto, setNombrePunto] = useState(nombrePunto);
  const [Direccion, setDireccion] = useState(direccion);

  const [idTipoMarcadorSeleccionado, setIdTipoMarcadorSeleccionado] = useState(null);
  
  const [imagenPath, setImagenPath] = useState("");

  const handleImageUpload = (path) => {
    setImagenPath(path);
  };

  const datosFormulario = {
    nombrePunto: NombrePunto,
    direccion: Direccion,
    idTipoPunto: idTipoMarcadorSeleccionado, 
    id_creador: IdCreador, 
    descripcion: descripcion, 
    imagenPath: imagenPath, 
    latitud:latitud,
    longitud: longitud
  };


  const handleGuardar = async () => {
    if (
      !NombrePunto ||
      !Direccion ||
      !idTipoMarcadorSeleccionado ||
      !IdCreador ||
      !longitud ||
      !latitud
    ) {
      Alert.alert("Por favor, completa todos los campos.",);
      return;
    }
    await puntoInteresApi.create(datosFormulario);
    Alert.alert("Éxito", "El Punto se han guardado correctamente.");
    onClose(); // Cierra el modal
  };


  const obtenerTiposPuntos = async ()=>{
    try {
      const data  = await tipoPuntoInteresApi.findAll();
      // console.log("Respuesta completa de la API:", data.items);
      setDatosTipoPunto(data.items);
    } catch (error) {
      console.error("Error al obtener datos de tipo de punto de interés:", error);
    } finally {
      setCargando(false); 
    }
  }

  const cargarCreador = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      await setIdCreador(userId);
      if (userId) {
        const { usuario } = await gestionUsuarioApi.findOne(userId);
        // console.log("USUARIO RECIBIDO", usuario)}
        setNombre(usuario.nombre); 
      }
    } catch (error) {
      console.error("Error al cargar el nombre del usuario:", error);
    }
  };

   useEffect(() => {
    if (visible) {
      console.log("DATOS:", datosFormulario);
    }
  }, [datosFormulario]);

  useEffect(() => {
    if (visible) {
      cargarCreador();
      obtenerTiposPuntos();
      setCargando(true);
    }
  }, [visible]);

  // useEffect(() => {
  //     console.log("TIPOS DE PUNTO ",datosTipoPunto);
  // }, [datosTipoPunto]);

  return (
    <Modal
  visible={visible}
  transparent={transparent}
  animationType={animationType}
  onRequestClose={volver}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      
        {cargando ? (
          <Text style={styles.label}>Cargando información...</Text>
        ) : (
          <ScrollView>
              <CampoEditable
                value={NombrePunto}
                onSave={(newValue) => setNombrePunto(newValue)}
                
                editableTitleStyle={styles.editableTitle}
                displayTitleStyle={styles.title}
                iconsContainerStyle={styles.iconsContainer}
                rowStyle={styles.row}
                iconColor={{ edit: "#4CAF50", save: "green", cancel: "red" }}
              />

              <CampoEditable
                value={Direccion}
                onSave={(newValue) => setDireccion(newValue)}
                
                editableTitleStyle={styles.editableSubtitle}
                displayTitleStyle={styles.subtitle}
                iconsContainerStyle={styles.iconsContainer}
                rowStyle={styles.row}
                iconColor={{ edit: "#4CAF50", save: "green", cancel: "red" }}
              />
            <Text style={styles.label}>Tipo de marcador</Text>
            {datosTipoPunto && (
              <Carrusel
                data={datosTipoPunto}
                onItemPress={(item) => setIdTipoMarcadorSeleccionado(item.id)}
                tamanoLetra={15}
                altura={40}
                colorLetraDefecto="black"
                colorLetraSelected="black"
                colorOpcionDefecto="white"
                colorOpcionSelected="#cef5b0"
                otrosEstilos={{
                  paddingVertical: 10,
                  flexDirection: "row",
                }}
              />
            )}
            <Text style={styles.label}>Creador</Text>
            <TextInput
              style={styles.inputCreador}
              value={nombre}
              onChangeText={setNombre}
              editable={false}
            />
            <Text style={styles.label}>Descripción</Text>
            <InputConContador
              maxCaracteres={150}
              value={descripcion}
              onChangeText={(text) => setDescripcion(text)}
              placeholder="Escribe una descripción aquí..."
              style={styles.textAreaContainer}
              alto={80}
              alineaTexto="top"
            />
            <Text style={styles.label}>Imagen de Referencia</Text>
            <SubidaImagen 
              onImageSelect={(image) =>
                console.log("Imagen seleccionada:", image)
              }
              onImageUpload={(path) => handleImageUpload(path)}
              onImageRemove={(image) =>
                console.log("Imagen removed:", image)
              }
              renderPlaceholder={() => (
                <Text style={styles.uploadButtonText}>📤 Subir Imagen</Text>
              )}
              containerStyle={styles.uploadButton} // Estilo personalizado para el contenedor
              previewStyle={{ width: 150, height: 150 }} // Estilo personalizado para la vista previa
              tipo="puntointeres"
            />
            {/* Botones dentro del ScrollView */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleGuardar}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={volver}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

    </View>
  </View>
</Modal>
  )
};

FormPuntoInteres.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    // paddingVertical: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    flex: 1, 
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#777",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tipoMarcadorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tipoMarcadorButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  tipoMarcadorSelected: {
    backgroundColor: "#4CAF50",
  },
  tipoMarcadorText: {
    fontSize: 14,
  },
  tipoMarcadorTextSelected: {
    color: "white",
  },
  inputCreador:{
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor:"#f6f6f6",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
    fontWeight:500,
    color: 'grey',
  },
  textArea: {
    height: 80,
    padding:10,
    textAlignVertical: "top",
  },
  uploadButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    alignItems: "left",

    marginBottom: 30,
    width: 145,
    height: 45
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10, 
    alignSelf: "stretch",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    minWidth: 150,
    alignSelf:"top",
    fontSize:"10px",
    borderRadius: 50,
    alignItems: "center",
    
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  },
  cancelButtonText: {
    color: "#4CAF50",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  editableRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Asegura que el contenedor ocupe todo el espacio
  },
  editableTitle: {
    flex: 1, 
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 5,
    marginRight: 10, 
  },
  editableSubtitle: {
    flex: 1, // El input ocupa el espacio restante
    fontSize: 14,
    borderBottomWidth: 1, // Ancho de la línea gris
    borderBottomColor: "#ccc", // Color de la línea gris
    padding: 5,
    marginRight: 10, // Da espacio entre el input y los íconos
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default FormPuntoInteres;


