import React, { useEffect, useState } from 'react';
import { Modal, View, ActivityIndicator, ScrollView, Image, StyleSheet, Text, Linking, Alert, Share } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../api/gestionUsuario"; 

const PlaceDetailsModal = ({ visible, placeDetails, loading, onClose, setDestination, selectedLocation }) => {
    const [usuarioNombre, setUsuarioNombre] = useState(null);

    // Obtener el nombre del usuario desde AsyncStorage
    useEffect(() => {
        const fetchUsuario = async () => {
          try {
              const userId = await AsyncStorage.getItem("userId");
              if (!userId) {
                  console.error("No se encontró el userId en AsyncStorage");
                  return;
              }
  
              const response = await api.findOne(userId);
              if (!response?.usuario?.nombre) {
                  console.error("No se pudo obtener el nombre del usuario");
                  return;
              }
  
              setUsuarioNombre(response.usuario.nombre);
          } catch (error) {
              console.error("Error al obtener el usuario:", error);
          }
      };
      fetchUsuario();
      }, []);

    // Función para compartir el punto de interés
    const handleCompartir = () => {
        try {
            const mensaje = `¡${usuarioNombre || "Un usuario"} te ha compartido un punto que puede ser de tu interés! 🌍\n\n*${placeDetails?.name || "Nombre no disponible"}*\n📍 Dirección: ${placeDetails?.address || "Dirección no disponible"}\n📞 Teléfono: ${placeDetails?.phoneNumber || "Teléfono no disponible"}\n⭐ Calificación: ${placeDetails?.rating || "Calificación no disponible"}\n🌐 Ubicación: Latitud ${selectedLocation?.latitude || "No disponible"}, Longitud ${selectedLocation?.longitude || "No disponible"}\n\n¡Únete a Lima Bici para llegar a este y muchos más sitios en bicicleta de manera segura y óptima!`;

            Share.share({
                message: mensaje,
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
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={styles.scrollViewContent}>
                        <Card style={styles.card}>
                            <Card.Title title={placeDetails?.name || "Ubicación Seleccionada"} />
                            {loading ? (
                                <ActivityIndicator animating={true} color="#0000ff" />
                            ) : (
                                <>
                                    <Card.Content>
                                        <Paragraph>Dirección: {placeDetails?.address || "No disponible"}</Paragraph>
                                        <Paragraph>Teléfono: {placeDetails?.phoneNumber || "No disponible"}</Paragraph>
                                        <Paragraph>Calificación: {placeDetails?.rating} ⭐</Paragraph>
                                        <Paragraph>Tipos: {placeDetails?.types || "No disponible"}</Paragraph>
                                    </Card.Content>
                                    {placeDetails?.photos && placeDetails.photos.length > 0 && (
                                        <Image
                                            source={{ uri: placeDetails.photos[0] }}
                                            style={{ width: 100, height: 100, marginVertical: 10 }}
                                        />
                                    )}
                                    <ScrollView horizontal contentContainerStyle={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
                                        <Button
                                            mode="contained"
                                            onPress={() => {
                                                setDestination({
                                                    latitude: selectedLocation.latitude,
                                                    longitude: selectedLocation.longitude,
                                                });
                                                onClose();
                                            }}
                                            style={styles.button}
                                            labelStyle={styles.buttonText}
                                        >
                                            Indicaciones
                                        </Button>
                                        <Button
                                            mode="contained"
                                            onPress={() => {
                                                const url = `https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude},${selectedLocation.longitude}`;
                                                Linking.openURL(url).catch(() => {
                                                    Alert.alert('Error', 'No se pudo abrir Google Maps');
                                                });
                                            }}
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
                                            mode="contained"
                                            onPress={handleCompartir}
                                            style={styles.button}
                                            labelStyle={styles.buttonText}
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
                        </Card>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        maxHeight: '60%',
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    button: {
        marginHorizontal: 5,
        minWidth: 120,
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
    },
    closeButton: {
        marginHorizontal: 5,
        minWidth: 120,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 1,
    },
    closeButtonText: {
        color: 'green',
    },
});

export default PlaceDetailsModal;









