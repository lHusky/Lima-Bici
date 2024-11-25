// src/hooks/useLocationTracker.js

import { useState, useRef } from 'react';
import * as Location from 'expo-location';

const useLocationTracker = () => {
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const watcher = useRef(null);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [startTime, setStartTime] = useState(null);

    const startTracking = async (onLocationChange) => {
        const currentStartTime = new Date();
        setStartTime(currentStartTime);
        setRouteCoordinates([]);
        setDistance(0);
        setDuration(0);

        try {
            watcher.current = await Location.watchPositionAsync(
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
        } catch (error) {
            console.error('Error al iniciar el rastreo', error);
        }
    };

    const stopTracking = () => {
        if (watcher.current) {
            watcher.current.remove();
            watcher.current = null;
            if (startTime) {
                const endTime = new Date();
                const elapsedTime = (endTime - startTime) / 60000; // Convert milliseconds to minutes
                setDuration(elapsedTime);
            }
        }
    };

    const getDistance = (coord1, coord2) => {
        const R = 6371e3;
        const φ1 = (coord1.latitude * Math.PI) / 180;
        const φ2 = (coord2.latitude * Math.PI) / 180;
        const Δφ = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
        const Δλ = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    return { routeCoordinates, startTracking, stopTracking, distance, duration, startTime };
};

export default useLocationTracker;
