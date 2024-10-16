import React, { createContext, useState, useContext } from 'react';
import 'react-native-get-random-values';
import uuid from 'react-native-uuid';
const GooglePlacesContext = createContext();

export const useGooglePlaces = () => useContext(GooglePlacesContext);

export const GooglePlacesProvider = ({ children }) => {
    const [destination, setDestination] = useState(null); // Estado para el destino
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState(''); // Nueva variable para la distancia
    const [duration, setDuration] = useState(''); // Nueva variable para el tiempo estimado

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAOzTbIK8sF2OW_BQmSUuWJW9t98VQP5_U'; // Reemplaza con tu clave de API

    // Función para obtener detalles del lugar usando la API de Google Directions
    const fetchRouteDetails = async (origin, destination) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=walking&key=${GOOGLE_MAPS_APIKEY}` // Modo bicicleta
            );
            const result = await response.json();
            
            if (result.routes.length > 0) {
                const route = result.routes[0].legs[0];
                setDistance(route.distance.text); // Guardamos la distancia
                setDuration(route.duration.text); // Guardamos la duración
            } else {
                setError('No se pudo calcular la ruta');
            }
        } catch (error) {
            console.error('Error al obtener la ruta', error);
            setError('Error al obtener la ruta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <GooglePlacesContext.Provider
            value={{
                destination,
                setDestination,
                fetchRouteDetails, // Nueva función para obtener los detalles de la ruta
                distance,
                duration,
                apiKey: GOOGLE_MAPS_APIKEY,
                loading,
                error,
            }}
        >
            {children}
        </GooglePlacesContext.Provider>
    );
};
