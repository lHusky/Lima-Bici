import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, View, Text, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gestionUsuarioApi from '../../api/gestionUsuario.js';

const Signin = ({ userAccounts, navigation }) => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');

    // const navigation = useNavigation();
    

    const handleSubmit = async () => {
        setEmailError('');
        setPasswordError('');
        setError('');
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
        const emailExists = userAccounts.some(user => user.email === email);
        const phoneExists = userAccounts.some(user => user.telefono === telefono);
    
        if (emailExists) {
            setEmailError('El correo electrónico ya está registrado');
            return;
        }
        
        if (phoneExists) {
            setPhoneError('El número de celular ya está registrado');
            return;
        }

        const payloadUsuario = {
            // rol: 'cliente',
            nombre,
            email,
            password,
            // estado: 'Activo',
            telefono,
        }; 

        try {
            
            const response = await gestionUsuarioApi.create(payloadUsuario)
            if (response.status === 201) {
                setNombre('');
                setTelefono('');
                setEmail('');
                setPassword('');
                setConfPassword('');
                console.log(response.data.message); 
                navigation.navigate('Iniciosesion'); 
                console.error('Registro completado:', payloadUsuario.nombre);
            } else {
                console.error('Error en la creación del usuario:', response.data.message);
                Alert.alert('Error', response.data.message);
            }      
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
        }
    };

    return (
        // Envuelve todo en TouchableWithoutFeedback para cerrar el teclado al hacer clic fuera de los inputs
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={styles.container1}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined} // Para subir la vista cuando aparece el teclado (iOS)
                keyboardVerticalOffset={90} // Ajusta según la altura de tu header si lo tienes
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.header}>Hola! Regístrate para comenzar</Text>
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
                            {phoneError ? <Text style={styles.errorMessage}>{phoneError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {emailError ? <Text style={styles.errorMessage}>{emailError}</Text> : null}
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
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: "#BFEAAA",
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 40,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: "#BFEAAA",
        marginTop: 90,
        marginBottom: 40,
        marginLeft: 0,
        paddingLeft: 0,
    },
    container2: {
        width: '100%',
        padding: 48,
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
        marginBottom: 10,
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
