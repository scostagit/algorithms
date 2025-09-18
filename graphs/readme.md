go to the page 72, there is a list of algorithm that you should know
before to the Uber interview.

Sure! Let's break it down in **easy English**.

---

### 💡 What is a Graph Algorithm?

A **graph** is like a map. It has **points (called nodes or vertices)** and **lines (called edges)** that connect those points.

A **graph algorithm** is just a **set of steps** used to solve problems using graphs — for example:

* Finding the shortest path from one point to another
* Finding if two points are connected
* Going through all the points

---

### 🔍 Simple Example: Breadth-First Search (BFS)

**Breadth-First Search (BFS)** is a way to visit all the nodes in a graph **starting from one point**, going level by level.

---

### 📦 Example in Simple JavaScript

Imagine a graph like this:

```
A -- B
|
C
```

We’ll use **an object** to represent the graph:

```javascript
const graph = {
  A: ['B', 'C'],
  B: ['A'],
  C: ['A']
};

function bfs(start) {
  const visited = new Set();
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift(); // get the first node

    if (!visited.has(node)) {
      console.log(node); // "visit" the node
      visited.add(node);
      // add neighbors to the queue
      for (const neighbor of graph[node]) {
        queue.push(neighbor);
      }
    }
  }
}

bfs('A');
```

**What happens when we run `bfs('A')`?**

Output:

```
A
B
C
```

We start at A, then go to B and C.

---

### ⏱️ Big O Notation (Time Complexity)

**BFS Time Complexity: `O(V + E)`**

* `V` = number of vertices (points)
* `E` = number of edges (connections)

Why?

* We check every node once → O(V)
* We look at each edge once → O(E)

So total = **O(V + E)**

---

### ✅ Summary

* A **graph algorithm** is a way to solve problems on a network of points and lines.
* **BFS** visits all points, starting from one.
* It’s useful for finding the shortest path or exploring all connections.
* Its time complexity is **O(V + E)**.

Want another example like DFS or shortest path (Dijkstra)?
