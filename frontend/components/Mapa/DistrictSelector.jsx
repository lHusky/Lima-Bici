// src/components/Mapa/DistrictSelector.jsx

import React from 'react';
import { View, StyleSheet, TouchableOpacity, ActionSheetIOS, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const districts = ['ALL', 'SAN BORJA', 'SAN ISIDRO', 'LA MOLINA', 'MIRAFLORES', 'SURCO', 'SAN MIGUEL']; // Añade los distritos necesarios

const DistrictSelector = ({ selectedDistricts, setSelectedDistricts }) => {
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
    };

    const handlePress = () => {
        if (Platform.OS === 'ios') {
            showActionSheet();
        } else {
            // Android: Simplemente mostramos una alerta temporalmente.
            Alert.alert('Seleccionar Distritos', 'Funcionalidad solo disponible en iOS por ahora.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePress} style={styles.menuButton}>
                <Ionicons name="ellipsis-horizontal" size={15} color="#1C6C00" />
            </TouchableOpacity>
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
});

export default DistrictSelector;
