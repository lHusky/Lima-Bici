// src/components/Mapa/Mapa.jsx

import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import MapMarker from './Marker';
import BlueRoute from './BlueRoute';
import YellowRoute from './YellowRoute';
import FixedRoutes from './FixedRoutes';
import RoutePlanner from '../../utils/RoutePlanner';
import { useGooglePlaces } from '../../context/ContextAPI/GooglePlacesContext';

const { width, height } = Dimensions.get('window');

const Mapa = () => {
  const mapRef = useRef(null);
  const { fetchRouteDetails, blueRouteCoords } = useGooglePlaces();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [adjustedRouteCoords, setAdjustedRouteCoords] = useState([]);
  const [bikePaths, setBikePaths] = useState([]);

  // Obtener ubicación del usuario
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'No se pudo obtener la ubicación');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  // Establecer un destino fijo inicial
  useEffect(() => {
    setDestination({
      latitude: -12.046374,
      longitude: -77.042793,
    });
  }, []);

  // Obtener ruta de Google Maps cuando cambian el origen o el destino
  useEffect(() => {
    if (origin && destination) {
      fetchRouteDetails(origin, destination);
    }
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: origin ? origin.latitude : -12.046374,
          longitude: origin ? origin.longitude : -77.042793,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {origin && <MapMarker coordinate={origin} />}
        
        {destination && (
          <MapMarker
            coordinate={destination}
            draggable // Hacer el marcador de destino movible
            onDragEnd={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setDestination({ latitude, longitude });
            }}
          />
        )}

        {/* Ruta Azul - Ruta original de Google Maps */}
        {blueRouteCoords && blueRouteCoords.length > 0 && (
          <BlueRoute coordinates={blueRouteCoords} />
        )}

        {/* Ruta Amarilla - Ruta ajustada a las ciclovías */}
        {adjustedRouteCoords && adjustedRouteCoords.length > 0 && (
          <YellowRoute coordinates={adjustedRouteCoords} />
        )}



        {/* Planificador de Ruta - Ajusta la ruta a las ciclovías */}
        {blueRouteCoords && blueRouteCoords.length > 0 && bikePaths.length > 0 && (
          <RoutePlanner
            route={blueRouteCoords}
            bikePaths={bikePaths}
            onRouteCalculated={setAdjustedRouteCoords}
          />
        )}


        {/* Renderizar las ciclovías (FixedRoutes) primero */}
        <FixedRoutes
          onRoutesLoaded={(data) => setBikePaths(data)}
          strokeColor="green" // Color visible para las ciclovías
          strokeWidth={10}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
});

export default Mapa;
