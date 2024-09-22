import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario.jsx';
import Iniciosesion from './screens/InicioSesion/InicioSesion.jsx';
import PaginaPrincipal from './screens/PaginaPrincipal/PaginaPrincipal.jsx';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Iniciosesion">
        <Stack.Screen name="Iniciosesion" component={Iniciosesion} />
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
        <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
