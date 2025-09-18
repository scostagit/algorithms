
  // Dijkstra's Algorithm without using Set
  function dijkstra(graph, start, end) {
    const distances = {};
    const visited = {}; // using plain object instead of Set
    const previous = {};
    const nodes = [];
  
    // Initialize distances
    for (let node in graph) {
      distances[node] = Infinity;
      nodes.push(node);
    }
    distances[start] = 0;
  
    while (nodes.length > 0) {
      // Find the node with the smallest distance
      let minDistance = Infinity;
      let currentNode = null;
  
      for (let node of nodes) {
        if (!visited[node] && distances[node] < minDistance) {
          minDistance = distances[node];
          currentNode = node;
        }
      }
  
      if (currentNode === null) break;
  
      // Mark current node as visited
      visited[currentNode] = true;
  
      // Stop if we reached the end
      if (currentNode === end) break;
  
      // Update distances for neighbors
      for (let neighbor in graph[currentNode]) {
        if (!visited[neighbor]) {
          let newDistance = distances[currentNode] + graph[currentNode][neighbor];
          if (newDistance < distances[neighbor]) {
            distances[neighbor] = newDistance;
            previous[neighbor] = currentNode;
          }
        }
      }
  
      // Remove the current node from nodes list
      nodes.splice(nodes.indexOf(currentNode), 1);
    }
  
    // Build the shortest path
    const path = [];
    let current = end;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }
  
    return {
      distance: distances[end],
      path: path
    };
  }



  // Simple graph as an object (adjacency list)
const graph = {
    A: { B: 1, C: 4 },
    B: { D: 2 },
    C: { D: 3 },
    D: {}
  };



  
  // Run the function
  const result = dijkstra(graph, 'A', 'D');
  console.log("Shortest distance:", result.distance);
  console.log("Path:", result.path.join(" → "));
  