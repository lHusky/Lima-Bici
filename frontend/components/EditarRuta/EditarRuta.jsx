import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import ruta from '../../api/ruta.js';

const EditarRuta = ({ route, navigation }) => {
    const { id_ruta } = route.params;
    const [rutaData, setRutaData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    useEffect(() => {
        const fetchRuta = async () => {
            try {
                const response = await ruta.findOne(id_ruta);
                setRutaData(response);
                setNombre(response.nombre);
                setDescripcion(response.descripcion);
            } catch (error) {
                console.error('Error al obtener la ruta:', error);
                if (error.response && error.response.status === 404) {
                    setError('La ruta no existe o no se encuentra disponible.');
                } else {
                    setError('Error al obtener la información de la ruta');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchRuta();
    }, [id_ruta]);

    const handleSave = async () => {
        try {
            await ruta.update({ id: id_ruta, nombre, descripcion });
            alert('Ruta actualizada exitosamente');
            navigation.goBack();
        } catch (error) {
            console.error('Error al actualizar la ruta:', error.response?.data || error.message);
            alert('Error al actualizar la ruta');
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#00ff00" />;
    }

    if (error) {
        return (
            <View>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                    placeholder="Nombre de la ruta"
                />

                <Text style={styles.label}>Descripción:</Text>
                <TextInput
                    style={styles.input}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    placeholder="Descripción de la ruta"
                />

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Distancia:</Text>
                        <Text style={styles.infoValue}>{`${rutaData.distancia} km`}</Text>
                    </View>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoLabel}>Duración:</Text>
                        <Text style={styles.infoValue}>{`${rutaData.duracion} hrs`}</Text>
                    </View>
                    <View style={styles.infoBox2}>
                        <Text style={styles.infoLabel}>Fecha:</Text>
                        <Text style={styles.infoValue}>{rutaData.fechaInicio}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.boton} onPress={handleSave}>
                    <Text style={styles.botonText}>Guardar Cambios</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    infoContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    infoBox: {
        width: '48%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    infoBox2: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    boton: {
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#228B22',
        marginTop: 20,
    },
    botonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorMessage: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default EditarRuta;
