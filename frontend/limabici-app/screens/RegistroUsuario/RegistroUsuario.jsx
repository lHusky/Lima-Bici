import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Asegúrate de que la importación de usuarioApi esté correctamente configurada
// import usuarioApi from '../../api/usuario';

const Signin = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [userAccounts, setUserAccounts] = useState([]);
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState(''); // Agregar estado para errores de contraseña
    const navigation = useNavigation();

    useEffect(() => {
        handleOnLoad();
    }, []);

    const handleOnLoad = async () => {
        try {
            const usuariosData = await usuarioApi.findAll();
            setUserAccounts(usuariosData);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    const handleSubmit = async () => {
        if (password !== confPassword) {
            setError('*Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setPasswordError('*La contraseña debe tener al menos 6 caracteres');
            return;
        } else {
            setPasswordError('');
        }

        const existingUser = userAccounts.find(user => user.email === email);
        if (existingUser) {
            setError('El correo electrónico ya está registrado');
            return;
        }

        const payloadUsuario = {
            rol: 'cliente',
            email,
            password,
            estado: 'Activo',
            nombre,
            telefono,
        };

        try {
            await usuarioApi.create(payloadUsuario);
            navigation.navigate('Login'); // Asegúrate de que 'Login' sea el nombre correcto de tu pantalla de inicio de sesión
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
        }
    };

    return (
        <View style={styles.container1}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Hola! Regístrate para comenzar</Text>
            </View>
            <View style={styles.container2}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre y apellido"
                    value={nombre}
                    onChangeText={setNombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono"
                    value={telefono}
                    onChangeText={(text) => {
                        const numericText = text.replace(/[^0-9]/g, '');
                        setTelefono(numericText);
                    }}
                    keyboardType="numeric"
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
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirmar Contraseña"
                    secureTextEntry
                    value={confPassword}
                    onChangeText={setConfPassword}
                />
                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}
                {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                <TouchableOpacity style={styles.boton} onPress={handleSubmit}>
                    <Text style={styles.botonText}>Crear cuenta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#BFEAAA",
    },
    headerContainer: {
        backgroundColor: "#BFEAAA",
        paddingVertical: 80,
        paddingHorizontal: 16,
        marginBottom: 16,
        borderRadius: 20,
    },
    header: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
    },
    container2: {
        flex: 1,
        padding: 48,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 40,
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    boton: {
        borderRadius: 20,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#228B22'
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

export default Signin;
