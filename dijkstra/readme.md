**Dijkstra's Algorithm** is a famous algorithm used to find the **shortest path** between nodes in a **graph**. It is particularly useful when you have a graph with **non-negative weights** on the edges (the distance or cost to travel between nodes). The algorithm is often used in **network routing**, **GPS navigation**, and **flight scheduling**.

### How Does Dijkstra's Algorithm Work?

Here’s a simple explanation:

1. **Start at the source node**: The algorithm begins with the node you want to start from. Initially, the distance to the source node is 0, and all other nodes have an infinite distance.
  
2. **Set up a priority queue**: The nodes are processed based on their current shortest known distance, so you use a priority queue (or a min-heap) to store and access the nodes with the smallest distance.

3. **Visit neighbors**: From the current node, check all of its neighbors (the nodes directly connected). Calculate the distance to each neighboring node by adding the current node’s distance and the edge weight. If this new calculated distance is smaller than the previously known distance for that neighbor, update the shortest distance.

4. **Mark the node as "visited"**: Once a node’s shortest distance is finalized, mark it as visited so that it won’t be processed again.

5. **Repeat**: Continue this process until all nodes have been visited and the shortest distances to each node have been found.

### Example:

Imagine you have a graph with these nodes and weighted edges:

```
       A
     /   \
    1     4
   /       \
  B -- 2 -- C
   \       /
    3     5
     \   /
      D
```

- We want to find the shortest path from **A** to all other nodes.

### Dijkstra's Steps:
1. **Initialize distances**:  
   - Distance to **A** = 0 (start point)  
   - Distance to **B**, **C**, **D** = ∞ (unknown)

2. **Start at A**:
   - Distance to **B** = 1 (edge A → B)
   - Distance to **C** = 4 (edge A → C)
   - Mark **A** as visited and move to the next node with the smallest tentative distance.

3. **Move to B** (since B has the smallest distance of 1):
   - New distance to **C** = 1 + 2 = 3 (which is smaller than 4, so update it)
   - New distance to **D** = 1 + 3 = 4
   - Mark **B** as visited.

4. **Move to C** (next smallest distance of 3):
   - New distance to **D** = 3 + 5 = 8 (no update needed, since we already have a smaller value for **D**)
   - Mark **C** as visited.

5. **Move to D** (final node with the smallest distance of 4):
   - All nodes are now visited.

### Final shortest distances from **A**:
- Distance to **A** = 0
- Distance to **B** = 1
- Distance to **C** = 3
- Distance to **D** = 4

---

### Key Features of Dijkstra's Algorithm:
- **Greedy algorithm**: It always selects the node with the smallest tentative distance.
- **Works only with non-negative weights**: The algorithm assumes that once a node’s shortest distance is found, it cannot be improved (which is true when all edge weights are non-negative).
- **Time complexity**: The time complexity of Dijkstra’s algorithm depends on the data structure used. With a simple array, it’s O(V²), but with a priority queue (or min-heap), it can be reduced to O((V + E) log V), where **V** is the number of vertices and **E** is the number of edges.

---

### JavaScript Example (Basic Concept of Dijkstra’s Algorithm)

```javascript
function dijkstra(graph, start) {
    let distances = {};
    let visited = new Set();
    let pq = new PriorityQueue();

    // Initialize distances to infinity for all nodes except the start node
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[start] = 0;

    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        let currentNode = pq.dequeue().element;

        // Skip visited nodes
        if (visited.has(currentNode)) continue;

        visited.add(currentNode);

        // Check neighbors
        for (let neighbor in graph[currentNode]) {
            if (visited.has(neighbor)) continue;

            let newDist = distances[currentNode] + graph[currentNode][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                pq.enqueue(neighbor, newDist);
            }
        }
    }

    return distances;
}

// Priority Queue for Dijkstra's algorithm (simplified)
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Example graph with weights
const graph = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 3 },
    C: { A: 4, B: 2, D: 5 },
    D: { B: 3, C: 5 }
};

console.log(dijkstra(graph, 'A'));  // { A: 0, B: 1, C: 3, D: 4 }
```

---

### Summary:
- **Dijkstra’s algorithm** finds the shortest path from a source node to all other nodes in a graph with non-negative edge weights.
- It uses a **greedy** approach, visiting nodes in increasing order of their shortest known distance.
- It’s widely used in fields like **network routing** and **GPS navigation**.