In the **worst-case scenario**, searching for an element in a **binary search tree (BST)** that is **not balanced** can take **O(n)** time, where **n** is the number of nodes in the tree.

### Why?
A balanced BST has a height of approximately **log₂(n)**, which allows for efficient searching in **O(log n)** time. However, if the tree becomes **unbalanced**—for example, if elements are inserted in sorted order—the tree can degenerate into a **linked list**, with each node having only one child. In that case, searching becomes a linear operation, just like in a list.


A **balanced binary tree** is a special kind of binary tree where the left and right sides (or "branches") of every node are **about the same length**.

Let me explain it in simple terms:

### Imagine a family tree:
- Each person can have up to two children (just like a binary tree).
- A **balanced** family tree means that no side of the tree is much taller than the other.

### Why does balance matter?
If one side of the tree is much longer than the other, it takes **longer to search** for something—like looking for a name at the bottom of a very long list. But if the tree is balanced, it’s more like searching in a well-organized book, where you can quickly jump to the right section.

### In short:
A **balanced binary tree** keeps things **even and efficient**, so you can find what you’re looking for **faster**.

