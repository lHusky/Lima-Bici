import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario';
import Iniciosesion from './screens/InicioSesion/InicioSesion';
import PaginaInicio from './screens/PaginaInicio/PaginaInicio';
import PaginaMapas from './screens/PaginaMapas/PaginaMapas';
import PaginaBuscar from './screens/PaginaBuscar/PaginaBuscar';
import PaginaFavoritos from './screens/PaginaFavoritos/PaginaFavoritos';
import PaginaCuenta from './screens/PaginaCuenta/PaginaCuenta';

import Footer from './components/footer/footer';
import { GooglePlacesProvider } from './context/ContextAPI/GooglePlacesContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="black" />
      <GooglePlacesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Iniciosesion" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Footer" component={Footer} />
            <Stack.Screen name="Iniciosesion">
              {(props) => <Iniciosesion {...props} />}
            </Stack.Screen>
            <Stack.Screen name="RegistroUsuario">
              {(props) => <RegistroUsuario {...props} />}
            </Stack.Screen>
            <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
            <Stack.Screen name="PaginaMapas" component={PaginaMapas} />
            <Stack.Screen name="PaginaBuscar" component={PaginaBuscar} />
            <Stack.Screen name="PaginaFavoritos" component={PaginaFavoritos} />
            <Stack.Screen name="PaginaCuenta" component={PaginaCuenta} />
          </Stack.Navigator>
        </NavigationContainer>
      </GooglePlacesProvider>
    </>
  );
};

export default App;


