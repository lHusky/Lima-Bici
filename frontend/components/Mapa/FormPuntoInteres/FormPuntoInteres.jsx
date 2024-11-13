import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';


const FormPuntoInteres = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedType, setSelectedType] = useState('Ciclovías');

    
    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    return (
            <View style={[styles.container]}>
                <Text style={styles.title}>Centro Comercial La Rambla</Text>
                <Text style={styles.subtitle}>Av. Javier Prado Este 2010, Lima 15036</Text>
    
                <Text style={styles.sectionTitle}>Tipo de marcador</Text>
                <View style={styles.markerTypeContainer}>
                    <TouchableOpacity onPress={() => handleTypeSelect('Ciclovías')} style={[styles.markerButton, selectedType === 'Ciclovías' && styles.selectedMarkerButton]}>
                        <Text style={styles.markerButtonText}>🚲 Ciclovías</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTypeSelect('Tiendas')} style={[styles.markerButton, selectedType === 'Tiendas' && styles.selectedMarkerButton]}>
                        <Text style={styles.markerButtonText}>🏬 Tiendas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTypeSelect('Puntos Aparcado')} style={[styles.markerButton, selectedType === 'Puntos Aparcado' && styles.selectedMarkerButton]}>
                        <Text style={styles.markerButtonText}>🅿️ Puntos Aparcado</Text>
                    </TouchableOpacity>
                </View>
    
                <Text style={styles.sectionTitle}>Creador</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nombre de Usuario" 
                    value={name} 
                    onChangeText={setName} 
                />
    
                <Text style={styles.sectionTitle}>Descripción</Text>
                <TextInput 
                    style={styles.textArea} 
                    placeholder="Escribe una descripción aquí" 
                    value={description} 
                    onChangeText={setDescription} 
                    maxLength={350} 
                    multiline 
                />
    
                <TouchableOpacity style={styles.uploadButton}>
                    <Text style={styles.uploadButtonText}>📷 Subir Imagen</Text>
                </TouchableOpacity>
    
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    markerTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    markerButton: {
        padding: 10,
        borderRadius: 20,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    selectedMarkerButton: {
        backgroundColor: '#d0f0c0',
    },
    markerButtonText: {
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        marginTop: 5,
        height: 80,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    uploadButtonText: {
        fontSize: 14,
        color: 'gray',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
        flex: 0.45,
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        flex: 0.45,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
});

export default FormPuntoInteres;
