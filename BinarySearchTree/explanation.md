Sure! Let's break it down simply:

---

### 🌳 What is a Binary Search Tree (BST)?

A **Binary Search Tree** is a special type of tree where:

1. Each **node** has:

   * A **value**
   * A **left child** (smaller value)
   * A **right child** (larger value)

2. It keeps the **values in order**, which makes it fast to:

   * Search for a value
   * Add (insert) a new value
   * Remove a value

> Think of it like a sorted family tree — smaller numbers go to the left, bigger numbers to the right.

---

### ✅ Example in JavaScript

Here’s a **simple example** that creates a Binary Search Tree and lets you insert and search values:

```javascript
// Node for the tree
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Binary Search Tree
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Insert a value
  insert(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        // Go left
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        // Go right
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search for a value
  contains(value) {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      value < current.value ? (current = current.left) : (current = current.right);
    }
    return false;
  }
}

// Example usage:
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);

console.log(bst.contains(15)); // true
console.log(bst.contains(7));  // false
```

---

### 📌 Summary

* **BST** stores values in a smart way (small on the left, big on the right).
* It helps you quickly **find**, **insert**, or **delete** numbers.
* The example shows how to build one and search in it.

Let me know if you'd like a visual version or how deletion works too!
