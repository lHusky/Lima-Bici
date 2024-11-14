// src/hooks/useLocationTracker.js

import { useState } from 'react';
import * as Location from 'expo-location';

const useLocationTracker = () => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [watcher, setWatcher] = useState(null);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(null);

    const startTracking = async (onLocationChange) => {
        setStartTime(new Date());
        setRouteCoordinates([]);
        setDistance(0);

        try {
            const subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                    distanceInterval: 10,
                },
                (location) => {
                    const newCoordinate = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };
                    setRouteCoordinates((prev) => [...prev, newCoordinate]);

                    // Actualizamos la distancia usando la última coordenada
                    setRouteCoordinates((prev) => {
                        if (prev.length > 0) {
                            const lastCoordinate = prev[prev.length - 1];
                            const distanceBetween = getDistance(lastCoordinate, newCoordinate);
                            setDistance((prevDistance) => prevDistance + distanceBetween);
                        }
                        return [...prev, newCoordinate];
                    });

                    if (onLocationChange) {
                        onLocationChange(newCoordinate);
                    }
                }
            );
            setWatcher(subscription);
        } catch (error) {
            console.error('Error al iniciar el rastreo', error);
        }
    };

    const stopTracking = () => {
        if (watcher) {
            watcher.remove();
            setWatcher(null);
            if (startTime) {
                const endTime = new Date();
                const elapsedTime = (endTime - startTime) / 60000; // Convertir a minutos
                setDuration(elapsedTime);
            }
        }
    };

    const getDistance = (coord1, coord2) => {
        const R = 6371e3; // Radio de la tierra en metros
        const φ1 = (coord1.latitude * Math.PI) / 180;
        const φ2 = (coord2.latitude * Math.PI) / 180;
        const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
        const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distancia en metros
        return distance / 1000; // Convertir a kilómetros
    };

    return { routeCoordinates, startTracking, stopTracking, distance, duration };
};

export default useLocationTracker;