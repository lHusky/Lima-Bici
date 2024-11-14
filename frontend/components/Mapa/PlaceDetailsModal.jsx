import React from 'react';
import { Modal, View, ActivityIndicator, ScrollView, Image, StyleSheet, Text, Linking } from 'react-native';
import { Card, Paragraph, Button } from 'react-native-paper';

const PlaceDetailsModal = ({ visible, placeDetails, loading, onClose, setDestination, selectedLocation }) => {
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








