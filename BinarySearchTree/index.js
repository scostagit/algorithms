class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null
    }
}

class BinarySearchTree{
    constructor(){
        this.root = null;
    }

    insert(value){

        let newNode = new Node(value);

        if(this.root == null){
            this.root = newNode;
            return;
        }

        let currentNode = this.root;
        while(true){
            if(value < currentNode.value){ //go left
              if(!currentNode.left){
                currentNode.left = newNode;
                return
              }
              currentNode = currentNode.left;
            }else{
                if(!currentNode.right){ //go right
                   currentNode.right = newNode;
                   return;
                }
                currentNode = currentNode.right;
            }
        }
    }
    
    contains(value){
        let currentNode = this.root;

        while(currentNode){
            if(currentNode.value === value) return true;

            value < currentNode.value? 
                    (currentNode = currentNode.left):
                    (currentNode = currentNode.right);
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

console.log(bst)