To **add the previous reference** to your linked list node implementation — so each node knows not only about the `next` node but also about the `previous` one — you need to turn your singly linked list into a **doubly linked list**.

This means modifying both the `Node` and `LinkedList` classes to include and manage a `prev` pointer.

Here’s the updated version of your script with the **previous reference added**:

```javascript
class Node {
  constructor(data) {
    this.data = {
      _id: Math.random().toString(36).substring(2, 12),
      ...data
    };
    this.next = null;
    this.prev = null; // Add previous reference
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null; // Optional, for faster tail access
  }

  append(data) {
    let newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode; // Set tail as well
      return;
    } else {
      let currentNode = this.tail; // Faster using tail
      currentNode.next = newNode;
      newNode.prev = currentNode; // Set previous reference
      this.tail = newNode; // Update tail
    }
  }

  print() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.data.name);
      currentNode = currentNode.next;
    }
  }

  printReverse() {
    let currentNode = this.tail;
    while (currentNode) {
      console.log(currentNode.data.name);
      currentNode = currentNode.prev;
    }
  }
}


/**
 * @param {ListNode} head
 * @return {boolean}
 */
const hasCycle = (head) => {
  if (!head) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true; //  comparison
  }

  return false;
};

// Example usage:
const list = new LinkedList();
list.append({ name: 'joe', email: 'test@yahoo.com' });
list.append({ name: 'Billit', email: 'bi@yahoo.com' });
list.append({ name: 'Abel', email: 'abel@yahoo.com' });

console.log("Forward:");
list.print();

console.log("Reverse:");
list.printReverse();

list.tail.next = list.head; // 👈 This creates the cycle!


// Check for cycles (should return false)
console.log("Has cycle?", hasCycle(list.head));
```

### Key Changes:

* `Node` now has a `prev` property.
* `LinkedList` manages both `head` and `tail` for efficient appending.
* When appending, it connects both `next` and `prev` pointers.
* Added a `printReverse()` method to demonstrate traversal via the `prev` reference.


