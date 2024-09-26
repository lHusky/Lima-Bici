import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import * as Location from 'expo-location'; // Necesitarás instalar expo-location

const BotonRecorrido = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [route, setRoute] = useState([]);
  const locationSubscription = useRef(null); // Referencia al suscriptor de ubicación

  const handlePress = async () => {
    if (!isTracking) {
      // Comenzar a rastrear la ubicación
      setIsTracking(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permiso de ubicación no concedido');
        return;
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setRoute((prevRoute) => [...prevRoute, { latitude, longitude }]);
        }
      );
    } else {
      // Detener el rastreo
      if (locationSubscription.current) {
        locationSubscription.current.remove(); // Detener el rastreo de ubicación
        locationSubscription.current = null;
      }
      setIsTracking(false);
      console.log('Recorrido terminado:', route);
    }
  };

  // Limpiar el rastreo cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.text}>{isTracking ? 'Detener' : 'Iniciar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 150,
    right: 20,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BotonRecorrido;
