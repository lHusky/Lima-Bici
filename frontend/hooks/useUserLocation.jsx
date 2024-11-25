import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useUserLocation = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocationPermission = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setError('Permiso de localización denegado');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            } catch (error) {
                setError('Error al obtener la ubicación');
            }
        };

        getLocationPermission();
    }, []);

    return { location, error };
};

export default useUserLocation;
