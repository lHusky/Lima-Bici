import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario.jsx';
import Iniciosesion from './screens/InicioSesion/InicioSesion.jsx';

import PaginaInicio from './screens/PaginaInicio/PaginaInicio.jsx';
import PaginaMapas from './screens/PaginaMapas/PaginaMapas.jsx';
import PaginaBuscar from './screens/PaginaBuscar/PaginaBuscar.jsx';
import PaginaFavoritos from './screens/PaginaFavoritos/PaginaFavoritos.jsx';
import PaginaCuenta from './screens/PaginaCuenta/PaginaCuenta.jsx';

import Footer from './components/footer/footer.jsx';

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
    <>
    <StatusBar backgroundColor="black"/>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Footer">
      <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Iniciosesion">
            {(props) => <Iniciosesion {...props} userAccounts={userAccounts} />} 
        </Stack.Screen>
         <Stack.Screen name="RegistroUsuario">
            {(props) => <RegistroUsuario {...props} userAccounts={userAccounts} />}
        </Stack.Screen>
        <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
        <Stack.Screen name="PaginaMapas" component={PaginaMapas} />
        <Stack.Screen name="PaginaBuscar" component={PaginaBuscar} />
        <Stack.Screen name="PaginaFavoritos" component={PaginaFavoritos} />
        <Stack.Screen name="PaginaCuenta" component={PaginaCuenta} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
