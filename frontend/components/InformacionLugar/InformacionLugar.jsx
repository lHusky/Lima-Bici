import React, { useState, useEffect } from "react";
import { Modal, View, ActivityIndicator, ScrollView, Image, StyleSheet, Text, Linking, Alert, Share } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api/gestionUsuario"; 
import FormPuntoInteres from "../Mapa/FormPuntoInteres/FormPuntoInteres.jsx";

const InformacionLugar = ({
  visible,
  onClose = () => {},
  onOpen = () => {},
  newPlaceDetails,
  newSelectedLocation,
  loadingDetails = false,
  setNewDestination = () => {},
}) => {
  const [showFormPuntoInteres, setShowFormPuntoInteres] = useState(false);
  const [usuarioNombre, setUsuarioNombre] = useState(null);

  // Obtener el nombre del usuario al cargar el componente
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (userId) {
          const response = await api.findOne(userId); 
          if (response?.usuario?.nombre) {
            setUsuarioNombre(response.usuario.nombre);
          } else {
            console.error("No se pudo obtener el nombre del usuario");
          }
        } else {
          console.error("No se encontró el userId en AsyncStorage");
        }
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    fetchUsuario();
  }, []);

  // Verificar si los datos del lugar y las coordenadas son válidos
  const isValidPlaceDetails =
    newPlaceDetails &&
    newSelectedLocation &&
    typeof newSelectedLocation.latitude === "number" &&
    typeof newSelectedLocation.longitude === "number";

  // Función para abrir Google Maps
  const handleOpenGoogleMaps = () => {
    if (isValidPlaceDetails) {
      const url = `https://www.google.com/maps/search/?api=1&query=${newSelectedLocation.latitude},${newSelectedLocation.longitude}`;
      Linking.openURL(url).catch(() => {
        Alert.alert("Error", "No se pudo abrir Google Maps");
      });
    } else {
      Alert.alert(
        "Error",
        "La ubicación seleccionada no es válida. Verifique los datos del lugar."
      );
    }
  };

  const handleGuardarPunto = () => {
    onClose();
    setShowFormPuntoInteres(true); 
  };

  const volverAInformacion = () => {
    setShowFormPuntoInteres(false);
    onOpen(); 
  };

  const handleCompartir = () => {
    try {
      const mensaje = `¡${usuarioNombre || "Un usuario"}te ha compartido un punto que puede ser de tu interés! 🌍\n\n*${newPlaceDetails?.name || "Nombre no disponible"}*\n📍 Dirección: ${
        newPlaceDetails?.address || "Dirección no disponible"
      }\n📞 Teléfono: ${newPlaceDetails?.phoneNumber || "Teléfono no disponible"}\n⭐ Calificación: ${
        newPlaceDetails?.rating || "Calificación no disponible"}\n🌐 Ubicación: Latitud ${newSelectedLocation?.latitude || "No disponible"}, Longitud ${
        newSelectedLocation?.longitude || "No disponible"}
¡Únete a Lima Bici para llegar a este y muchos más sitios en bicicleta de manera segura y óptima!`;

      Share.share({
        message: mensaje, // Mensaje a compartir
      }).catch((error) => {
        console.error("Error al compartir:", error);
        Alert.alert("Error", "No se pudo compartir el mensaje.");
      });
    } catch (error) {
      Alert.alert("Error", "No se pudo generar el mensaje para compartir.");
      console.error(error);
    }
  };

  return (
    <>
      {visible && (
        <Modal
          visible={visible}
          transparent={true} 
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>
                  {loadingDetails
                    ? "Cargando información..."
                    : newPlaceDetails?.name || "Ubicación Seleccionada"}
                </Text>

                {loadingDetails ? (
                  <ActivityIndicator animating={true} color="#0000ff" />
                ) : (
                  <>
                    <View style={styles.cardContent}>
                      {newPlaceDetails && (
                        <>
                          <Text style={styles.text}>
                            Dirección:{" "}
                            {newPlaceDetails?.address || "No disponible"}
                          </Text>
                          <Text style={styles.text}>
                            Teléfono:{" "}
                            {newPlaceDetails?.phoneNumber || "No disponible"}
                          </Text>
                          <Text style={styles.text}>
                            Calificación:{" "}
                            {newPlaceDetails?.rating || "No disponible"} ⭐
                          </Text>
                          <Text style={styles.text}>
                            Tipos:{" "}
                            {newPlaceDetails?.types?.join(", ") ||
                              "No disponible"}
                          </Text>
                        </>
                      )}
                    </View>

                    {newPlaceDetails?.photos &&
                      newPlaceDetails.photos.length > 0 && (
                        <Image
                          source={{ uri: newPlaceDetails.photos[0] }}
                          style={styles.photo}
                        />
                      )}

                    <ScrollView
                      horizontal
                      contentContainerStyle={styles.buttonContainer}
                      showsHorizontalScrollIndicator={false}
                    >
                      <Button
                        mode="contained"
                        onPress={() => {
                          if (newSelectedLocation) {
                            setNewDestination({
                              latitude: newSelectedLocation.latitude,
                              longitude: newSelectedLocation.longitude,
                            });
                            onClose();
                          } else {
                            Alert.alert(
                              "Error",
                              "No se pudo establecer un destino válido."
                            );
                          }
                        }}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                      >
                        Indicaciones
                      </Button>
                      <Button
                        mode="contained"
                        onPress={handleOpenGoogleMaps}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                      >
                        Ir a Google Maps
                      </Button>
                      <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={handleGuardarPunto}
                      >
                        Guardar punto
                      </Button>
                      <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                      >
                        Agregar a Favoritos
                      </Button>
                      <Button
                        mode="contained"
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        onPress={handleCompartir}
                      >
                        Compartir
                      </Button>
                      <Button
                        mode="outlined"
                        onPress={onClose}
                        style={styles.closeButton}
                        labelStyle={styles.closeButtonText}
                      >
                        Cerrar
                      </Button>
                    </ScrollView>
                  </>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
      {showFormPuntoInteres && (
        <FormPuntoInteres
          visible={showFormPuntoInteres}
          transparent={true}
          animationType="slide"
          volver={() => volverAInformacion()}
          onClose={() => setShowFormPuntoInteres(false)}
          nombrePunto={newPlaceDetails?.name}
          direccion={newPlaceDetails?.address}
          latitud={newSelectedLocation.latitude}
          longitud={newSelectedLocation.longitude}
        />
      )}
    </>
  );
};

InformacionLugar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  newPlaceDetails: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    phoneNumber: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    types: PropTypes.arrayOf(PropTypes.string),
    photos: PropTypes.arrayOf(PropTypes.string),
  }),
  newSelectedLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  loadingDetails: PropTypes.bool.isRequired,
  setNewDestination: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    maxHeight: "60%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  cardContent: {
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  photo: {
    width: 100,
    height: 100,
    marginVertical: 10,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  button: {
    marginHorizontal: 5,
    minWidth: 120,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
  },
  closeButton: {
    marginHorizontal: 5,
    minWidth: 120,
    backgroundColor: "white",
    borderColor: "green",
    borderWidth: 1,
  },
  closeButtonText: {
    color: "green",
  },
});

export default InformacionLugar;







