Sure! Let me explain each of these algorithms in **easy English**, along with a **simple JavaScript example** and their **Big O notation**.

---

## 1. **Breadth-First Search (BFS)**

### 🧠 What is it?

Breadth-First Search explores **level by level**. Imagine you're looking for your friend in a building. You check everyone on the **first floor**, then the **second**, and so on.

It's mostly used in **graphs or trees**.

### ✅ Example: Find a value in a tree

```javascript
function bfs(root, target) {
  let queue = [root];

  while (queue.length > 0) {
    let node = queue.shift(); // take the first in line

    if (node.value === target) return true;

    // add children to the queue
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return false;
}
```

### 🌳 Tree node format

```javascript
let tree = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null }
};
```

### ⏱ Big O:

* **Time**: `O(n)` — visits every node once
* **Space**: `O(n)` — uses a queue to store nodes

---

## 2. **Depth-First Search (DFS)**

### 🧠 What is it?

DFS goes **deep** before going **wide**. Imagine walking through a maze — you keep going forward until you hit a wall, then backtrack.

### ✅ Example: Find a value in a tree

```javascript
function dfs(root, target) {
  if (!root) return false;
  if (root.value === target) return true;

  return dfs(root.left, target) || dfs(root.right, target);
}
```

### 🌳 Tree node is same as above.

### ⏱ Big O:

* **Time**: `O(n)` — visits every node
* **Space**: `O(n)` — because of recursive call stack (in worst case)

---

## 3. **Binary Search**

### 🧠 What is it?

Binary Search only works on **sorted arrays**. It keeps cutting the array in **half** until it finds the target.

Imagine a dictionary — you don’t check every word; you open the middle, then decide whether to go left or right.

### ✅ Example: Find a number in a sorted array

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return true;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}
```

### 🧮 Input:

```javascript
let nums = [1, 3, 5, 7, 9];
binarySearch(nums, 5); // true
```

### ⏱ Big O:

* **Time**: `O(log n)` — halves the array every step
* **Space**: `O(1)` — no extra space used

---

## 📌 Summary Table

| Algorithm     | Use Case           | Time Complexity | Space Complexity | Structure Used        |
| ------------- | ------------------ | --------------- | ---------------- | --------------------- |
| BFS           | Tree/Graph (level) | O(n)            | O(n)             | Queue                 |
| DFS           | Tree/Graph (deep)  | O(n)            | O(n)             | Stack (Recursion)     |
| Binary Search | Sorted Arrays      | O(log n)        | O(1)             | None (just variables) |

Would you like me to add visual examples or animation ideas to help understand better?
