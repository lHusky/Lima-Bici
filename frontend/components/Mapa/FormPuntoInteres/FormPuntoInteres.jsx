import React, { useState } from "react";
import {
  Modal,
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import PropTypes from "prop-types";
import InputConContador from "./InputConContador.jsx"

const FormPuntoInteres = ({ 
    visible = false,  
    transparent, 
    animationType, 
    onClose= () => {},
    volver = () => {}
}) => {
  const [tipoMarcador, setTipoMarcador] = useState("Ciclovías");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleGuardar = () => {
    console.log("Datos guardados:", { tipoMarcador, nombre, descripcion });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType={animationType}
      onRequestClose={volver}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Centro Comercial La Rambla</Text>
            <Text style={styles.subtitle}>
              Av. Javier Prado Este 2010, Lima 15036
            </Text>

            {/* Selector de tipo de marcador */}
            <Text style={styles.label}>Tipo de marcador</Text>
            <View style={styles.tipoMarcadorContainer}>
              <TouchableOpacity
                style={[
                  styles.tipoMarcadorButton,
                  tipoMarcador === "Ciclovías" && styles.tipoMarcadorSelected,
                ]}
                onPress={() => setTipoMarcador("Ciclovías")}
              >
                <Text
                  style={[
                    styles.tipoMarcadorText,
                    tipoMarcador === "Ciclovías" && styles.tipoMarcadorTextSelected,
                  ]}
                >
                  🚴 Ciclovías
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tipoMarcadorButton,
                  tipoMarcador === "Tiendas" && styles.tipoMarcadorSelected,
                ]}
                onPress={() => setTipoMarcador("Tiendas")}
              >
                <Text
                  style={[
                    styles.tipoMarcadorText,
                    tipoMarcador === "Tiendas" && styles.tipoMarcadorTextSelected,
                  ]}
                >
                  🏬 Tiendas
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tipoMarcadorButton,
                  tipoMarcador === "Puntos Aparcado" &&
                    styles.tipoMarcadorSelected,
                ]}
                onPress={() => setTipoMarcador("Puntos Aparcado")}
              >
                <Text
                  style={[
                    styles.tipoMarcadorText,
                    tipoMarcador === "Puntos Aparcado" &&
                      styles.tipoMarcadorTextSelected,
                  ]}
                >
                  🅿️ Puntos Aparcado
                </Text>
              </TouchableOpacity>
            </View>

            {/* Campos de texto */}
            <Text style={styles.label}>Creador</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de Usuario"
              value={nombre}
              onChangeText={setNombre}
            />
            <Text style={styles.label}>Descripción</Text>
            
            <InputConContador
                maxCaracteres={150}
                value={descripcion}
                onChangeText={(text) => setDescripcion(text)}
                placeholder="Escribe una descripción aquí..."
                style={styles.textAreaContainer}
                alto={80}
                alineaTexto = "top"
            />
            {/* Botón para subir imagen */}
            <Text style={styles.label}>Imagen de Referencia</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>📤 Subir Imagen</Text>
            </TouchableOpacity>

            {/* Botones de acción */}
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
        </View>
      </View>
    </Modal>
  );
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
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 12,
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
    height:45
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#4CAF50",
    minWidth: 150,
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
});

export default FormPuntoInteres;
