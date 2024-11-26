import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../api/gestionUsuario';

const FormularioUsuario = ({ usuario, onGuardarCambios }) => {
    const [nombre, setNombre] = useState(usuario.nombre);
    const [telefono, setTelefono] = useState(usuario.telefono);
    const [fechaCumple, setFechaCumple] = useState(usuario.fechaCumple);
    const [email, setEmail] = useState(usuario.email);
    const [contrasena, setContrasena] = useState(usuario.contrasena || '');
    const [peso, setPeso] = useState(usuario.peso);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const fotoPerfil = usuario.fotoPerfil; 

    const handleGuardar = async () => {
        try {
            const usuarioActualizado = {
                nombre,
                telefono,
                fechaCumple,
                fotoPerfil,
                contrasena,
                email,
                peso,
            };

            await api.editarUsuario(usuario.id, usuarioActualizado);
            Alert.alert("Éxito", "Usuario actualizado correctamente");

            onGuardarCambios(usuarioActualizado);
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al guardar los cambios");
            console.error("Error al actualizar el usuario:", error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const dia = String(selectedDate.getDate()).padStart(2, '0');
            const mes = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const año = selectedDate.getFullYear();
            const formattedDate = `${dia}/${mes}/${año}`;
            setFechaCumple(formattedDate);
        }
    };

    const getDateForPicker = () => {
        if (!fechaCumple) return new Date();
        const [dia, mes, año] = fechaCumple.split('/').map(Number);
        return new Date(año, mes - 1, dia); // Convierte a objeto Date
    };

    const getMaxDate = () => {
        const today = new Date();
        return new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Perfil</Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Nombre"
            />
            <Text style={styles.label}>Teléfono:</Text>
            <TextInput
                style={styles.input}
                value={telefono}
                onChangeText={setTelefono}
                placeholder="Teléfono"
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                <TextInput
                 style={styles.input}
                 value={fechaCumple}
                 placeholder="Fecha de Nacimiento"
                 editable={false} // Desactiva la escritura manual
                 pointerEvents="box-only" // Permite que TouchableOpacity reciba eventos
                />
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={getDateForPicker()} // Usa la función para obtener la fecha
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                    onChange={handleDateChange}
                    maximumDate={getMaxDate()}
                />
            )}
            <Text style={styles.label}>Correo Electrónico:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
                style={styles.input}
                value={contrasena}
                onChangeText={setContrasena}
                placeholder="Contraseña"
                secureTextEntry
            />
            <Text style={styles.label}>Peso:</Text>
            <TextInput
                style={styles.input}
                value={String(peso)}
                onChangeText={(text) => setPeso(parseFloat(text) || '')}
                placeholder="Peso"
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleGuardar}>
                    <Text style={styles.buttonText}>Guardar Cambios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => onGuardarCambios()}
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 14,
        marginVertical: 5,
        backgroundColor: '#f9f9f9',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#a1fca1',
        flex: 1,
        marginRight: 5,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        flex: 1,
        marginLeft: 5,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default FormularioUsuario;
