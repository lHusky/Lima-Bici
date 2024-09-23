import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario.jsx';
import Iniciosesion from './screens/InicioSesion/InicioSesion.jsx';
import gestionUsuarioApi from './api/gestionUsuario.js';

const Stack = createStackNavigator();

const App = () => {
  const [userAccounts, setUserAccounts] = useState([]);

    useEffect(() => {
        const cargaDeDatos = async () => {
            try {
                const response = await gestionUsuarioApi.findAll();
                
                const usuariosData = response.usuarios; // Accede a la propiedad 'usuarios'
            
                setUserAccounts(usuariosData); 
            } catch (error) {
                console.error('Error al cargar usuarios:', error);
            }
        };
        cargaDeDatos();
    }, []);
// PROP: es un componente inmutable que se declara en app (padre) y se puede utilizar en cada pestaña (hijo)
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Iniciosesion">
        <Stack.Screen name="Iniciosesion">
            {(props) => <Iniciosesion {...props} userAccounts={userAccounts} />} 
            
        </Stack.Screen>
        <Stack.Screen name="RegistroUsuario">
            {(props) => <RegistroUsuario {...props} userAccounts={userAccounts} />}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
