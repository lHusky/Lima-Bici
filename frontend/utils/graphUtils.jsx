// src/utils/graphUtils.js

import { Graph } from 'graphlib';
import haversine from 'haversine';

export function buildGraphFromNearbyBikePaths(route, bikePaths, proximityRadius = 300) {
  console.log('Iniciando construcción del grafo de ciclovias');
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

  // conectar nodos cercanos de diferentes ciclovías
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

  console.log('Finalizada la construcción del grafo de ciclovias');
  return graph;
}

export function addRouteToGraph(graph, routeCoords) {
    console.log('Iniciando construcción de la ruta en el grafo');
  
    for (let i = 0; i < routeCoords.length; i++) {
      const currentPoint = routeCoords[i];
      const currentNodeId = `route_${i}`;
    
      if (!graph.hasNode(currentNodeId)) {
        graph.setNode(currentNodeId, currentPoint);
      }
    
      // Conectar al siguiente punto solo si no es el último
      if (i < routeCoords.length - 1) {
        const nextPoint = routeCoords[i + 1];
        const nextNodeId = `route_${i + 1}`;
    
        if (!graph.hasNode(nextNodeId)) {
          graph.setNode(nextNodeId, nextPoint);
        }
    
        const distance = haversine(currentPoint, nextPoint, { unit: 'meter' });
        graph.setEdge(currentNodeId, nextNodeId, { weight: distance * 3 });
        graph.setEdge(nextNodeId, currentNodeId, { weight: distance * 3 });
      }
    
      // Conectar con nodos de ciclovías cercanos
      const nearestBikeNodeId = findNearestBikeNodeId(graph, currentPoint);
      if (nearestBikeNodeId && graph.hasNode(nearestBikeNodeId)) {
        const connectionDistance = haversine(currentPoint, graph.node(nearestBikeNodeId), { unit: 'meter' });
        graph.setEdge(currentNodeId, nearestBikeNodeId, { weight: connectionDistance * 0.3 });
        graph.setEdge(nearestBikeNodeId, currentNodeId, { weight: connectionDistance * 0.3 });
      }
    }

    console.log('Finalizada la construcción de la ruta en el grafo');
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
      if (distance < minDistance && distance < 60) {
        minDistance = distance;
        nearestNodeId = nodeId;
      }
    }
  });
  return nearestNodeId;
}
