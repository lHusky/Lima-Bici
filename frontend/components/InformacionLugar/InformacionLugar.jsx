import React from "react";
import {
  Modal,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  Linking,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

const InformacionLugar = ({
  visible,
  onClose,
  newPlaceDetails,
  newSelectedLocation,
  loadingDetails = false,
  setNewDestination = ()=>{},
}) => {
  // Log de entrada para depuración
  console.log("Props recibidos en InformacionLugar:", {
    visible,
    newPlaceDetails,
    newSelectedLocation,
    loadingDetails,
  });

  // Verificar si los datos del lugar y las coordenadas son válidos
  const isValidPlaceDetails =
    newPlaceDetails &&
    newSelectedLocation &&
    typeof newSelectedLocation.latitude === "number" &&
    typeof newSelectedLocation.longitude === "number";

  // Log para verificar si los datos son válidos
  console.log("isValidPlaceDetails:", isValidPlaceDetails);

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

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.card}>
              {/* Título del Modal */}
              <Text style={styles.title}>
                {loadingDetails
                  ? "Cargando información..."
                  : newPlaceDetails?.name || "Ubicación Seleccionada"}
              </Text>

              {/* Indicador de carga o detalles */}
              {loadingDetails ? (
                <ActivityIndicator animating={true} color="#0000ff" />
              ) : (
                <>
                  {/* Información del lugar */}
                  <View style={styles.cardContent}>
                    <Text style={styles.text}>
                      Dirección: {newPlaceDetails?.address || "No disponible"}
                    </Text>
                    <Text style={styles.text}>
                      Teléfono: {newPlaceDetails?.phoneNumber || "No disponible"}
                    </Text>
                    <Text style={styles.text}>
                      Calificación:{" "}
                      {newPlaceDetails?.rating || "No disponible"} ⭐
                    </Text>
                    <Text style={styles.text}>
                      Tipos:{" "}
                      {newPlaceDetails?.types?.join(", ") || "No disponible"}
                    </Text>
                  </View>

                  {/* Imagen del lugar si está disponible */}
                  {newPlaceDetails?.photos &&
                    newPlaceDetails.photos.length > 0 && (
                      <Image
                        source={{ uri: newPlaceDetails.photos[0] }}
                        style={styles.photo}
                      />
                    )}

                  {/* Botones */}
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
                    >
                      Agregar a Favoritos
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
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
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
  card: {
    backgroundColor: "white",
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







