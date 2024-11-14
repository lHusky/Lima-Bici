// src/utils/RoutePlanner.jsx

import React, { useEffect } from 'react';
import { buildGraphFromNearbyBikePaths, addRouteToGraph } from './graphUtils';
import { aStarSearch } from './aStar';
import { adjustRouteToBikePaths } from './intersections';
import haversine from 'haversine';

const RoutePlanner = ({ route, bikePaths, onRouteCalculated }) => {
  useEffect(() => {
    const adjustRoute = async () => {
      if (!route || route.length === 0) {
        console.warn('No hay coordenadas para la ruta.');
        onRouteCalculated([]);
        return;
      }

      if (!bikePaths || bikePaths.length === 0) {
        console.warn('No hay ciclovías disponibles.');
        onRouteCalculated(route);
        return;
      }

      // Ajustar la ruta a las ciclovías cercanas
      const adjustedRoute = adjustRouteToBikePaths(route, bikePaths, 50); // Ajuste de proximidad

      // Construir el grafo a partir de las ciclovías cercanas a la ruta
      let graph = buildGraphFromNearbyBikePaths(route, bikePaths, 500);
      if (!graph) {
        console.error('Graph is undefined after buildGraphFromNearbyBikePaths');
        onRouteCalculated([]);
        return;
      }

      graph = addRouteToGraph(graph, adjustedRoute);
      if (!graph) {
        console.error('Graph is undefined after addRouteToGraph');
        onRouteCalculated([]);
        return;
      }

      // Exportar el grafo para visualización
      const graphData = {
        nodes: graph.nodes().map((nodeId) => ({
          id: nodeId,
          ...graph.node(nodeId),
        })),
        edges: graph.edges().map((edge) => ({
          source: edge.v,
          target: edge.w,
          ...graph.edge(edge),
        })),
      };

      console.log('Graph Data:', JSON.stringify(graphData));

      // Ejecutar A* para encontrar la ruta óptima
      const startNodeId = findNearestNodeId(graph, adjustedRoute[0]);
      const endNodeId = findNearestNodeId(graph, adjustedRoute[adjustedRoute.length - 1]);

      if (!startNodeId || !endNodeId) {
        console.error('No se encontraron nodos de inicio o fin válidos.');
        onRouteCalculated([]);
        return;
      }

      const pathNodeIds = aStarSearch(graph, startNodeId, endNodeId);

      if (pathNodeIds && pathNodeIds.length > 0) {
        const adjustedRouteCoords = pathNodeIds.map((nodeId) => graph.node(nodeId));
        onRouteCalculated(adjustedRouteCoords);
      } else {
        console.warn('No se encontró una ruta óptima.');
        onRouteCalculated(adjustedRoute);
      }
    };

    adjustRoute();
  }, [route, bikePaths, onRouteCalculated]);

  return null;
};

export default RoutePlanner;

function findNearestNodeId(graph, point) {
  let nearestNodeId = null;
  let minDistance = Infinity;

  graph.nodes().forEach((nodeId) => {
    const node = graph.node(nodeId);
    const distance = haversine(point, node, { unit: 'meter' });
    if (distance < minDistance) {
      minDistance = distance;
      nearestNodeId = nodeId;
    }
  });

  return nearestNodeId;
}