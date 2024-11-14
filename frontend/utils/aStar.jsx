// src/utils/aStar.js

import PriorityQueue from 'js-priority-queue';
import haversine from 'haversine';

export function aStarSearch(graph, startNodeId, goalNodeId) {
  const frontier = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority });
  frontier.queue({ nodeId: startNodeId, priority: 0 });

  const cameFrom = {};
  const costSoFar = {};
  cameFrom[startNodeId] = null;
  costSoFar[startNodeId] = 0;

  while (frontier.length > 0) {
    const current = frontier.dequeue().nodeId;

    if (current === goalNodeId) {
      break;
    }

    const neighbors = graph.neighbors(current);
    if (!neighbors) continue;

    neighbors.forEach((next) => {
      const edge = graph.edge(current, next);
      if (!edge) return;

      const edgeWeight = edge.weight;
      const newCost = costSoFar[current] + edgeWeight;

      if (!(next in costSoFar) || newCost < costSoFar[next]) {
        costSoFar[next] = newCost;
        const priority = newCost + heuristicCostEstimate(graph.node(next), graph.node(goalNodeId));
        frontier.queue({ nodeId: next, priority });
        cameFrom[next] = current;
      }
    });
  }

  const path = [];
  let currentNode = goalNodeId;
  while (currentNode !== null && currentNode in cameFrom) {
    path.push(currentNode);
    currentNode = cameFrom[currentNode];
  }

  if (path.length === 0 || path[path.length - 1] !== startNodeId) {
    return null;
  }

  return path.reverse();
}

function heuristicCostEstimate(nodeA, nodeB) {
  return haversine(nodeA, nodeB, { unit: 'meter' });
}