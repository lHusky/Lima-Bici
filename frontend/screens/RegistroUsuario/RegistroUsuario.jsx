//LIBRERIAS REACT
import React, { useState} from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TextInput, View, Text, Alert, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import gestionUsuarioApi from '../../api/gestionUsuario.js';

//ESTILOS
import styles from './RegistroUsuarioStyle.jsx';

//SERVICES
import { handleSubmit } from '../../services/validacion_credenciales/handleSubmit.jsx';


const RegistroUsuario = () => { //{ userAccounts, navigation }
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [confPasswordError, setConfPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const navigation = useNavigation();

    const payloadUsuario = {
        // rol: 'cliente',
        nombre,
        email,
        contrasena: password,
        // estado: 'Activo',
        telefono,
    }; 

    const handleSubmitPress = async () => {
        const validado = await handleSubmit(payloadUsuario, confPassword,setEmailError,setPasswordError,setPhoneError,setConfPasswordError);
        if (validado) {
            navigation.navigate('Iniciosesion');
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
                            {passwordError ? <Text style={styles.errorMessage}>{passwordError}</Text> : null}
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar Contraseña"
                                secureTextEntry
                                value={confPassword}
                                onChangeText={setConfPassword}
                            />
                            {confPasswordError ? <Text style={styles.errorMessage}>{confPasswordError}</Text> : null}
                            <TouchableOpacity style={styles.boton} onPress={handleSubmitPress}>
                                <Text style={styles.botonText}>Crear cuenta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default RegistroUsuario;