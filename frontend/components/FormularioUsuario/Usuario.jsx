import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import FormularioUsuario from './FormularioUsuario';
import api from '../../api/gestionUsuario';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [verFormulario, setVerFormulario] = useState(false);
    const [idEditar, setIdEditar] = useState(null);

    const cargarUsuario = async () => {
        const data = await api.findAll();
        setUsuarios(data);
    };

    useEffect(() => {
        cargarUsuario();
    }, []);

    const handleEdit = (id) => {
        setIdEditar(id);
        setVerFormulario(true);
    };

    const handleAgregarNuevo = () => {
        setIdEditar(null);
        setVerFormulario(true);
    };

    const renderUsuario = ({ item }) => (
        <View style={styles.usuarioCard}>
            <Text style={styles.usuarioText}>Nombre: {item.nombre}</Text>
            <Text style={styles.usuarioText}>Teléfono: {item.telefono}</Text>
            <Text style={styles.usuarioText}>Email: {item.email}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {verFormulario ? (
                <FormularioUsuario id={idEditar} onUsuarioGuardado={cargarUsuarios} />
            ) : (
                <>
                    <FlatList
                        data={usuarios}
                        renderItem={renderUsuario}
                        keyExtractor={(item) => item.id.toString()}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAgregarNuevo}>
                        <Text style={styles.buttonText}>Agregar Nuevo Usuario</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    usuarioCard: {
        backgroundColor: '#ccffcc',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
    },
    usuarioText: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#a4d4a5',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#77dd77',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Usuarios;
