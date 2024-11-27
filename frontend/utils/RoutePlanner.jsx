// src/utils/RoutePlanner.jsx
import React, { useEffect } from 'react';
import { buildGraphFromNearbyBikePaths, addRouteToGraph } from './graphUtils';
import { aStarSearch } from './aStar';

const RoutePlanner = ({ route, bikePaths, onRouteCalculated }) => {
  useEffect(() => {
    const calculateOptimalRoute = async () => {
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

      // Construir el grafo a partir de las ciclovías cercanas y la ruta original
      let graph = buildGraphFromNearbyBikePaths(route, bikePaths, 500);
      if (!graph) {
        console.error('Graph is undefined after buildGraphFromNearbyBikePaths');
        onRouteCalculated([]);
        return;
      }

      // Agregar la ruta original al grafo
      graph = addRouteToGraph(graph, route);
      if (!graph) {
        console.error('Graph is undefined after addRouteToGraph');
        onRouteCalculated([]);
        return;
      }

      // Exportar el grafo para visualización (opcional)
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
      const startNodeId = `route_0`; // Primer nodo de la ruta.
      const endNodeId = `route_${route.length - 1}`; // Último nodo de la ruta.
      
      if (!startNodeId || !endNodeId) {
        console.error('No se encontraron nodos de inicio o fin válidos.');
        onRouteCalculated([]);
        return;
      }

      const pathNodeIds = aStarSearch(graph, startNodeId, endNodeId);

      if (pathNodeIds && pathNodeIds.length > 0) {
        const optimalRoute = pathNodeIds.map((nodeId) => graph.node(nodeId));
        onRouteCalculated(optimalRoute);
      } else {
        console.warn('No se encontró una ruta óptima. Usando la ruta original.');
        onRouteCalculated(route);
      }
    };

    calculateOptimalRoute();
  }, [route, bikePaths, onRouteCalculated]);

  return null;
};

export default RoutePlanner;
