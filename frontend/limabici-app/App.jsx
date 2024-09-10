import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './screens/RegistroUsuario/RegistroUsuario.jsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RegistroUsuario">
        <Stack.Screen name="RegistroUsuario" component={RegistroUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
