import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import 'react-native-get-random-values';

import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario';
import Iniciosesion from './screens/InicioSesion/InicioSesion';
import InicioRecuperarContraseña from './screens/InicioRecuperarContraseña/InicioRecuperarContraseña.jsx';
import InicioIngresarCodigo from './screens/InicioRecupContraIngCod/InicioIngresarCodigo.jsx';
import InicioNuevaContraseña from './screens/InicioColocaNuevaContra/InicioColocarNuevaContra.jsx';
import PaginaInicio from './screens/PaginaInicio/PaginaInicio';
import PaginaRutas from './screens/PaginaRutas/PaginaRutas';
import PaginaBuscar from './screens/PaginaBuscar/PaginaBuscar';
import PaginaFavoritos from './screens/PaginaFavoritos/PaginaFavoritos';
import PaginaCuenta from './screens/PaginaCuenta/PaginaCuenta';
import PaginaRuta from './screens/PaginaRuta/PaginaRuta';
import PaginaEditarRuta from './screens/PaginaEditarRuta/PaginaEditarRuta';

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
            <Stack.Screen name="InicioRecuperarContraseña" component={InicioRecuperarContraseña} />
            <Stack.Screen name="InicioIngresarCodigo" component={InicioIngresarCodigo} />
            <Stack.Screen name="InicioNuevaContraseña" component={InicioNuevaContraseña} />
            <Stack.Screen name="RegistroUsuario">
              {(props) => <RegistroUsuario {...props} />}
            </Stack.Screen>
            <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
            <Stack.Screen name="PaginaRutas" component={PaginaRutas} />
            <Stack.Screen name="PaginaBuscar" component={PaginaBuscar} />
            <Stack.Screen name="PaginaFavoritos" component={PaginaFavoritos} />
            <Stack.Screen name="PaginaCuenta" component={PaginaCuenta} />
            <Stack.Screen name="PaginaRuta" component={PaginaRuta} />
            <Stack.Screen name="PaginaEditarRuta" component={PaginaEditarRuta} />

          </Stack.Navigator>
        </NavigationContainer>
      </GooglePlacesProvider>
    </>
  );
};

export default App;


