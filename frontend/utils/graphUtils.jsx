// src/utils/graphUtils.js

import { Graph } from 'graphlib';
import haversine from 'haversine';

export function buildGraphFromNearbyBikePaths(route, bikePaths, proximityRadius = 500) {
  console.log('Iniciando construcción del grafo en buildGraphFromNearbyBikePaths');
  const graph = new Graph({ directed: false });
  const nearbyBikePaths = [];

  // Identificar ciclovías cercanas
  bikePaths.forEach((path, pathIndex) => {
    let isNearby = false;

    for (const routePoint of route) {
      for (const bikePoint of path) {
        const distance = haversine(routePoint, bikePoint, { unit: 'meter' });
        if (distance <= proximityRadius) {
          isNearby = true;
          break;
        }
      }
      if (isNearby) break;
    }

    if (isNearby) {
      nearbyBikePaths.push({ path, pathIndex });
    }
  });

  // Agregar nodos y aristas de las ciclovías al grafo
  nearbyBikePaths.forEach(({ path, pathIndex }, idx) => {
    for (let i = 0; i < path.length; i++) {
      const currentPoint = path[i];
      const currentNodeId = `bike_${pathIndex}_${i}`;

      if (!graph.hasNode(currentNodeId)) {
        graph.setNode(currentNodeId, currentPoint);
      }

      if (i < path.length - 1) {
        const nextPoint = path[i + 1];
        const nextNodeId = `bike_${pathIndex}_${i + 1}`;

        if (!graph.hasNode(nextNodeId)) {
          graph.setNode(nextNodeId, nextPoint);
        }

        const distance = haversine(currentPoint, nextPoint, { unit: 'meter' });
        graph.setEdge(currentNodeId, nextNodeId, { weight: distance * 0.005 });
      }
    }
  });

  // **Nuevo código para conectar nodos cercanos de diferentes ciclovías**
  const bikeNodeIds = graph.nodes().filter(nodeId => nodeId.startsWith('bike_'));
  for (let i = 0; i < bikeNodeIds.length; i++) {
    const nodeIdA = bikeNodeIds[i];
    const nodeA = graph.node(nodeIdA);

    for (let j = i + 1; j < bikeNodeIds.length; j++) {
      const nodeIdB = bikeNodeIds[j];
      const nodeB = graph.node(nodeIdB);

      const distance = haversine(nodeA, nodeB, { unit: 'meter' });
      if (distance <= 40) { // Ajustado a 40 metros para conectar ciclovías cercanas
        graph.setEdge(nodeIdA, nodeIdB, { weight: distance * 0.005 });
      }
    }
  }

  console.log('Finalizada la construcción del grafo en buildGraphFromNearbyBikePaths');
  return graph;
}


// src/utils/graphUtils.js

// src/utils/graphUtils.js

export function addRouteToGraph(graph, routeCoords) {
    console.log('Iniciando construcción de la ruta en addRouteToGraph');
  
    for (let i = 0; i < routeCoords.length - 1; i++) {
      const currentPoint = routeCoords[i];
      const nextPoint = routeCoords[i + 1];
  
      const currentNodeId = `route_${i}`;
      const nextNodeId = `route_${i + 1}`;
  
      if (!graph.hasNode(currentNodeId)) {
        graph.setNode(currentNodeId, currentPoint);
      }
      if (!graph.hasNode(nextNodeId)) {
        graph.setNode(nextNodeId, nextPoint);
      }
  
      const distance = haversine(currentPoint, nextPoint, { unit: 'meter' });
      graph.setEdge(currentNodeId, nextNodeId, { weight: distance * 3 });
      graph.setEdge(nextNodeId, currentNodeId, { weight: distance * 3 });
  
      // Conectar con nodos de ciclovías cercanos
      const nearestBikeNodeId = findNearestBikeNodeId(graph, currentPoint);
      if (nearestBikeNodeId && graph.hasNode(nearestBikeNodeId)) {
        const connectionDistance = haversine(currentPoint, graph.node(nearestBikeNodeId), { unit: 'meter' });
        graph.setEdge(currentNodeId, nearestBikeNodeId, { weight: connectionDistance * 0.3 });
        graph.setEdge(nearestBikeNodeId, currentNodeId, { weight: connectionDistance * 0.3 });
      }
    }
  
    // Conectar el último punto de la ruta con nodos de ciclovías cercanos
    const lastIndex = routeCoords.length - 1;
    const lastNodeId = `route_${lastIndex}`;
    const lastPoint = routeCoords[lastIndex];
  
    if (!graph.hasNode(lastNodeId)) {
      graph.setNode(lastNodeId, lastPoint);
    }
  
    const nearestBikeNodeId = findNearestBikeNodeId(graph, lastPoint);
    if (nearestBikeNodeId && graph.hasNode(nearestBikeNodeId)) {
      const connectionDistance = haversine(lastPoint, graph.node(nearestBikeNodeId), { unit: 'meter' });
      graph.setEdge(lastNodeId, nearestBikeNodeId, { weight: connectionDistance * 0.3 });
      graph.setEdge(nearestBikeNodeId, lastNodeId, { weight: connectionDistance * 0.3 });
    }
  
    console.log('Finalizada la construcción de la ruta en addRouteToGraph');
    return graph;
  }
  
  

function findNearestBikeNodeId(graph, point) {
  let nearestNodeId = null;
  let minDistance = Infinity;

  graph.nodes().forEach((nodeId) => {
    if (nodeId.startsWith('bike_')) {
      const node = graph.node(nodeId);
      if (!node) return;
      const distance = haversine(point, node, { unit: 'meter' });
      if (distance < minDistance && distance < 400) {
        minDistance = distance;
        nearestNodeId = nodeId;
      }
    }
  });

  return nearestNodeId;
}