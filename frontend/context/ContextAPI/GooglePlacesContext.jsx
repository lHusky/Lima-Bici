import React, { createContext, useState, useContext } from 'react'; // Asegúrate de importar useState aquí
import ruta from '../../api/ruta.js'; // Importamos la API desde el archivo base.js

const GooglePlacesContext = createContext();

export const useGooglePlaces = () => useContext(GooglePlacesContext);

export const GooglePlacesProvider = ({ children }) => {
  const [destination, setDestination] = useState(null); // Aquí es donde useState es necesario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyAOzTbIK8sF2OW_BQmSUuWJW9t98VQP5_U';

  // Función para obtener detalles del lugar usando fetch desde 'ruta.js'
  const fetchPlaceDetails = async (placeId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ruta.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_APIKEY}`);
      const location = response.result.geometry.location;  // Ajusta según la estructura real de la respuesta
      const newDestination = {
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setDestination(newDestination);
    } catch (error) {
      console.error('Error fetching place details', error);
      setError('Error al obtener detalles del lugar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GooglePlacesContext.Provider
      value={{
        destination,
        setDestination,
        fetchPlaceDetails,
        apiKey: GOOGLE_MAPS_APIKEY,
        loading,
        error,
      }}
    >
      {children}
    </GooglePlacesContext.Provider>
  );
};
