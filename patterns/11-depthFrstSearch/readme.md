Sure! Here's a simple example in **JavaScript** to demonstrate **BFS** and **DFS** on a graph. We'll use a basic graph represented as an **adjacency list** and show how both search methods work.

### Graph Example:
```
    A
   / \
  B   C
 / \
D   E
```

### **JavaScript Code Example**:

```javascript
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
```

### **Explanation:**

#### **BFS (Breadth-First Search)**:
- BFS starts at the root (node 'A') and explores each level of the graph before moving deeper.
- It uses a **queue** to keep track of the nodes at each level.
- The output of BFS for the given graph is:  
  **A → B → C → D → E** (Level by level)

#### **DFS (Depth-First Search)**:
- DFS starts at the root and explores as deep as possible along each branch before backtracking.
- It uses **recursion** (or a stack) to go deep into each node’s neighbors.
- The output of DFS for the given graph is:  
  **A → B → D → E → C** (Going deep, then backtracking)

### **Key Differences in Code**:
- BFS uses a **queue** (`shift` to dequeue, `push` to enqueue).
- DFS uses **recursion** (or a stack if manually implemented).

---

Try running this code in your browser's developer console or any JavaScript environment. You’ll see how BFS and DFS explore the graph in different ways!