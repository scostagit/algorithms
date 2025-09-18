class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
    }

    appened(value){
        if(value=== null) return;

        let newNode = new Node(value);

        if(this.head === null){
            this.head = newNode;
            return;
        }

        let currentNode = this.head;

        while(currentNode.next){
            currentNode = currentNode.next;
        }

        currentNode.next = newNode;
    }

    print(){
        let currentNode = this.head;
        while(currentNode){
            console.log(currentNode.value);
            currentNode = currentNode.next;
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
var hasCycle = function(head) {
    // empty list
    if(!head) return false;

     let slow = head;
     let fast = head;
    
     while(fast && fast.next){

        slow = slow.next;   // move 1 step
        fast = fast.next.next; // move 2 steps
        
        //cycle detected
        if(slow  === fast) return true;
        
     }
   
    return false;   
};



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
