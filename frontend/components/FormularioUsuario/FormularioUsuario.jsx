import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../../api/gestionUsuario';

const FormularioUsuario = ({ usuario, onGuardarCambios }) => {
    const [nombre, setNombre] = useState(usuario.nombre);
    const [telefono, setTelefono] = useState(usuario.telefono);
    const [fechaCumple, setFechaCumple] = useState(usuario.fechaCumple);
    const [email, setEmail] = useState(usuario.email);
    const [contrasena, setContrasena] = useState(usuario.contrasena || '');

    const handleGuardar = async () => {
        try {
            const usuarioActualizado = {
                nombre,
                telefono,
                fechaCumple,
                email,
                contrasena,
            };

            await api.editarUsuario(usuario.id, usuarioActualizado); //comprobar
            Alert.alert("Éxito", "Usuario actualizado correctamente");

            onGuardarCambios(usuarioActualizado); 
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al guardar los cambios");
            console.error("Error al actualizar el usuario:", error);
        }
    };

    return (
        <View>
            <Text>Editar Usuario</Text>
            <Text>Nombre:</Text>
            <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" />
            <Text>Teléfono:</Text>
            <TextInput value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" />
            <Text>Fecha de Nacimiento:</Text>
            <TextInput value={fechaCumple} onChangeText={setFechaCumple} placeholder="Fecha de Nacimiento" />
            <Text>Correo Electrónico:</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="Correo Electrónico" keyboardType="email-address" />
            <Text>Contraseña:</Text>
            <TextInput value={contrasena} onChangeText={setContrasena} placeholder="Contraseña" secureTextEntry />
            <Button title="Guardar Cambios" onPress={handleGuardar} />
        </View>
    );
};

export default FormularioUsuario;




