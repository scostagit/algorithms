/*
    A
   / \
  B   C
 / \
D   E


Check this: Dijkstra's algorithm or the specifics of how AVL trees works. debug-create-and-rotate-itar-write-sas-token-workflow
*/

// Graph represented as an adjacency list
const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'E'],
    C: ['A'],
    D: ['B'],
    E: ['B']
  };
  
  // BFS (Breadth-First Search)
  function bfs(graph, start) {
    let visited = new Set();  // To keep track of visited nodes
    let queue = [start];      // Queue for BFS
  
    while (queue.length > 0) {
      let node = queue.shift();  // Remove the first element (FIFO)
      
      if (!visited.has(node)) {
        console.log(node);       // Visit the node
        visited.add(node);       // Mark it as visited
        
        // Add all neighbors of the node to the queue
        for (let neighbor of graph[node]) {
          if (!visited.has(neighbor)) {
            queue.push(neighbor);
          }
        }
      }
    }
  }
  
  // DFS (Depth-First Search)
  function dfs(graph, start, visited = new Set()) {
    if (visited.has(start)) return;  // Avoid revisiting nodes
    
    console.log(start);  // Visit the node
    visited.add(start);  // Mark the node as visited
    
    // Visit each neighbor of the current node
    for (let neighbor of graph[start]) {
      dfs(graph, neighbor, visited);  // Recursively visit neighbors
    }
  }
  
  // Running BFS starting from node 'A'
  console.log("BFS Traversal:");
  bfs(graph, 'A');  // Output: A B C D E
  
  // Running DFS starting from node 'A'
  console.log("\nDFS Traversal:");
  dfs(graph, 'A');  // Output: A B D E C
  