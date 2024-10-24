import React, { createContext, useState, useContext } from 'react';

const GooglePlacesContext = createContext();

export const useGooglePlaces = () => useContext(GooglePlacesContext);

export const GooglePlacesProvider = ({ children }) => {
    const [destination, setDestination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [distance, setDistance] = useState('');
    const [duration, setDuration] = useState('');

    const GOOGLE_MAPS_APIKEY = 'AIzaSyAOzTbIK8sF2OW_BQmSUuWJW9t98VQP5_U';

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
                setDistance(route.distance.text);
                setDuration(route.duration.text);
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
                fetchRouteDetails,
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
