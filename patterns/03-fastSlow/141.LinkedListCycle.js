class Node {
  constructor(data) {
    this._id = Math.random().toString(36).substring(2, 12); 
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(data) {
    let newNode = new Node(data);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let currentNode = this.tail;
      currentNode.next = newNode;
      newNode.prev = currentNode;
      this.tail = newNode;
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


/*141. Linked List Cycle
Easy
Topics
premium lock icon
Companies
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.
 
Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
 
Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
 
Follow up: Can you solve it using O(1) (i.e. constant) memory?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

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




//===============================================================================================
//Runing
//===============================================================================================
// Create list
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


/*


const createLinkedList = (arr) =>{
    var list = new LinkedList();

    for(let i = 0; i < arr.length; i ++){

        list.appened(arr[i]);  
    }

   // head.print();
    return list.head;
}


console.log("==================\nTest Case\n==================");
console.log("Case1\nInput:", [3,2,0,-4], "\nOutput: ", hasCycle(createLinkedList([3,2,0,-4])), "\nExpect: 1\n==================");
console.log("Case2\nInput:", [1,2], "\nOutput: ", hasCycle([1,2]), "\nExpect: 0\n==================");
console.log("Case3\nInput:", [1], "\nOutput: ", hasCycle([1]), "\nExpect: -1\n==================");

*/