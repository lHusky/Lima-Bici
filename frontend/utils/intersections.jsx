// src/utils/intersections.js

import haversine from 'haversine';

export const adjustRouteToBikePaths = (routeCoords, bikePaths, proximityRadius = 200) => {
  const adjustedRoute = [];
  let followingBikePath = false;
  let currentBikePath = null;

  routeCoords.forEach((point) => {
    let closestBikePathPoint = null;
    let minDistance = Infinity;
    let closestBikePath = null;

    // Buscar el punto de ciclovía más cercano
    bikePaths.forEach((bikePath) => {
      bikePath.forEach((bikePoint) => {
        const distance = haversine(point, bikePoint, { unit: 'meter' });
        if (distance < minDistance) {
          minDistance = distance;
          closestBikePathPoint = bikePoint;
          closestBikePath = bikePath;
        }
      });
    });

    if (minDistance < proximityRadius && closestBikePathPoint) {
      adjustedRoute.push(closestBikePathPoint);
      followingBikePath = true;
      currentBikePath = closestBikePath;
    } else {
      adjustedRoute.push(point);
      followingBikePath = false;
      currentBikePath = null;
    }
  });

  return adjustedRoute;
};

export function findSegmentIntersection(aStart, aEnd, bStart, bEnd) {
  const det = (aEnd.longitude - aStart.longitude) * (bEnd.latitude - bStart.latitude) - 
              (aEnd.latitude - aStart.latitude) * (bEnd.longitude - bStart.longitude);

  if (det === 0) return null; // Segmentos paralelos

  const t = ((bStart.longitude - aStart.longitude) * (bEnd.latitude - bStart.latitude) - 
             (bStart.latitude - aStart.latitude) * (bEnd.longitude - bStart.longitude)) / det;
  const u = ((bStart.longitude - aStart.longitude) * (aEnd.latitude - aStart.latitude) - 
             (bStart.latitude - aStart.latitude) * (aEnd.longitude - aStart.longitude)) / det;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      latitude: aStart.latitude + t * (aEnd.latitude - aStart.latitude),
      longitude: aStart.longitude + t * (aEnd.longitude - aStart.longitude),
    };
  }

  return null; // No hay intersección dentro de los segmentos
}