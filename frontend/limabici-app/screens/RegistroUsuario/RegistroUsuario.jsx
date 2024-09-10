import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
//import usuarioApi from '../../api/usuario'; // Asegúrate de que las rutas sean correctas
//import clienteApi from '../../api/cliente';
import { useNavigation } from '@react-navigation/native';

const Signin = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);
    const [error, setError] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        handleOnLoad();
    }, []);

    // Función para cargar los usuarios desde la API
    const handleOnLoad = async () => {
        try {
            const usuariosData = await usuarioApi.findAll();
            setUserAccounts(usuariosData);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async () => {
        // Validación de contraseñas
        if (password !== confPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validación de usuario existente
        const existingUser = userAccounts.find(user => user.email === email);
        if (existingUser) {
            setError('El correo electrónico ya está registrado');
            return;
        }

        // Datos del usuario a crear
        const payloadUsuario = {
            rol: 'cliente',
            email,
            password,
            estado: 'Activo',
        };

        try {
            // Crear usuario
            const response = await usuarioApi.create(payloadUsuario);
            // Datos del cliente a crear
            const payloadCliente = {
                idUsuario: response.id,
                nombre,
                apellido,
                fechaRegistro: new Date(),
            };
            // Crear cliente
            await clienteApi.create(payloadCliente);
            // Navegar a la pantalla de inicio de sesión
            navigation.navigate('Login'); // Cambia 'Login' al nombre de tu pantalla de inicio de sesión
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
        }
    };

    return (
        <View style={styles.container1}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Crear cuenta</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={setApellido}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Password"
                    secureTextEntry
                    value={confPassword}
                    onChangeText={setConfPassword}
                />
                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                <Button title="Crear cuenta" onPress={handleSubmit} color="white" />
            </View>
        </View>
    );
};

// Estilos para el componente
const styles = StyleSheet.create({
    container1: {
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: "#e4e4e4",

    },
    headerContainer: {
        backgroundColor: "#064ec6",
        marginTop: 0,
        paddingVertical: 80,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderRadius: 20,
    },
    header: {
        fontSize: 45,
        color: 'white',
        textAlign: 'left',
    },
    container2: {
        flex: 1,
        padding: 48,
        marginTop: 0,
        justifyContent: 'center',
    },
    input: {
        height: 45,
        borderColor: 'white',
        backgroundColor: "white",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 200,
    },
    boton: {
        height: 40,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        backgroundColor: "blue",
        borderRadius: 20,
    },
    errorMessage: {
        color: 'red',
        marginBottom: 12,
        textAlign: 'center',
    },
});

export default Signin;
