// src/components/Mapa/DistrictSelector.jsx

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActionSheetIOS, Platform, Modal, Text, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const districts = ['ALL', 'SAN BORJA', 'SAN ISIDRO', 'LA MOLINA', 'MIRAFLORES', 'SURCO', 'SAN MIGUEL'];

const DistrictSelector = ({ selectedDistricts, setSelectedDistricts }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showActionSheet = () => {
        const options = districts.map((district) =>
            selectedDistricts.includes(district) ? `✓ ${district}` : district
        );
        options.push('Cancelar');

        ActionSheetIOS.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex: options.length - 1,
                title: 'Seleccionar Distritos',
            },
            (buttonIndex) => {
                if (buttonIndex !== options.length - 1) {
                    const selectedDistrict = districts[buttonIndex];
                    toggleSelection(selectedDistrict);
                }
            }
        );
    };

    const toggleSelection = (district) => {
        if (district === 'ALL') {
            setSelectedDistricts(['ALL']);
        } else {
            const newSelections = selectedDistricts.includes(district)
                ? selectedDistricts.filter((d) => d !== district)
                : [...selectedDistricts.filter((d) => d !== 'ALL'), district];
            setSelectedDistricts(newSelections);
        }
        setModalVisible(false); // Cerrar el modal después de la selección
    };

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            showActionSheet();
        } else {
            setModalVisible(true);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.menuButton}>
                <Ionicons name="ellipsis-horizontal" size={15} color="#1C6C00" />
            </TouchableOpacity>

            {/* Modal para Android */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Seleccionar Distritos</Text>
                    <FlatList
                        data={districts}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.modalItem}
                                onPress={() => toggleSelection(item)}
                            >
                                <Text style={selectedDistricts.includes(item) ? styles.selectedItem : styles.item}>
                                    {selectedDistricts.includes(item) ? `✓ ${item}` : item}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity
                        style={styles.modalCancelButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.modalCancelText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1000,
    },
    menuButton: {
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#1C6C00',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    item: {
        fontSize: 16,
    },
    selectedItem: {
        fontSize: 16,
        color: '#1C6C00',
        fontWeight: 'bold',
    },
    modalCancelButton: {
        padding: 10,
        backgroundColor: '#1C6C00',
        borderRadius: 5,
        marginTop: 10,
    },
    modalCancelText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default DistrictSelector;
