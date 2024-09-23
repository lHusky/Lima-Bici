import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario.jsx';
import Iniciosesion from './screens/InicioSesion/InicioSesion.jsx';
import PaginaInicio from './screens/PaginaInicio/PaginaInicio.jsx';
import PaginaFavoritos from './screens/PaginaFavoritos/PaginaFavoritos.jsx';

import Footer from './components/footer/footer.jsx';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Footer">
      <Stack.Screen name="Footer" component={Footer} />
        <Stack.Screen name="Iniciosesion" component={Iniciosesion} />
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
        <Stack.Screen name="PaginaInicio" component={PaginaInicio} />
        <Stack.Screen name="PaginaFavoritos" component={PaginaFavoritos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
