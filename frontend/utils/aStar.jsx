// src/utils/aStar.js

import PriorityQueue from 'js-priority-queue'; // Nodo 1
import haversine from 'haversine'; // Nodo 1

export function aStarSearch(graph, startNodeId, goalNodeId) {// Nodo 1
  const frontier = new PriorityQueue({ comparator: (a, b) => a.priority - b.priority }); // Nodo 2
  frontier.queue({ nodeId: startNodeId, priority: 0 }); // Nodo 3

  const cameFrom = {}; // Nodo 4
  const costSoFar = {}; // Nodo 5
  cameFrom[startNodeId] = null; // Nodo 6
  costSoFar[startNodeId] = 0; // Nodo 7

  while (frontier.length > 0) { // Nodo 8
    const current = frontier.dequeue().nodeId; // Nodo 9

    if (current === goalNodeId) { // Nodo 10
      break; // Nodo 11
    }

    const neighbors = graph.neighbors(current); // Nodo 12
    if (!neighbors) continue; // Nodo 13

    neighbors.forEach((next) => { // Nodo 14
      const edge = graph.edge(current, next); // Nodo 15
      if (!edge) return; // Nodo 16

      const edgeWeight = edge.weight; // Nodo 17
      const newCost = costSoFar[current] + edgeWeight; // Nodo 18

      if (!(next in costSoFar) || newCost < costSoFar[next]) { // Nodo 19
        costSoFar[next] = newCost; // Nodo 20
        const priority = newCost + heuristicCostEstimate(graph.node(next), graph.node(goalNodeId)); // Nodo 21
        frontier.queue({ nodeId: next, priority }); // Nodo 22
        cameFrom[next] = current; // Nodo 23
      }
    });
  } // Nodo 24

  const path = []; // Nodo 25
  let currentNode = goalNodeId; // Nodo 26
  while (currentNode !== null && currentNode in cameFrom) { // Nodo 27
    path.push(currentNode); // Nodo 28
    currentNode = cameFrom[currentNode]; // Nodo 29
  }  // Nodo 30

  if (path.length === 0 || path[path.length - 1] !== startNodeId) { // Nodo 31
    return null; // Nodo 32    null
  }

  return path.reverse(); // Nodo 33
} // Nodo 34

function heuristicCostEstimate(nodeA, nodeB) {
  return haversine(nodeA, nodeB, { unit: 'meter' });
}
