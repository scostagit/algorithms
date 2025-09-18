  class Node{
     constructor(data){
         this.data = data;
         this.next = null;
         this.previous = null;
     }
  }

class DoublyLinkedList{

    constructor(data){
        this.head = new Node(data);
        this.tail = this.head;
        this.length = 1;
    }

    prepend(data){
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head.previous = newNode;
        this.head = newNode;
        this.length++;
        return this;
    }

    append(data){
         const newNode = new Node(data);
         newNode.previous = this.tail;
         this.tail.next = newNode;
         this.tail = newNode;
         this.length++;
    }
  
    insert(index, data){
        if(index >= this.length){
            return this.append(data);
        }

        const newNode = new Node(data);
        const leader = this.getNode(index -1);
        const follower = leader.next;
        leader.next = newNode;
        newNode.previous = leader;
        newNode.next = follower;
        follower.previous = newNode;
        this.length++;

        return this;
    }

    getNode(index){
        let count = 0;
        let currentNode = this.head;

        while(count!== index){
            currentNode = currentNode.next;
            count++;
        }
        return currentNode;
    }

    remove(index){
        //remove 3
        //lead 2
        const leader = this.getNode(index -1);
             //3
        let itemToRemove = leader.next;
        //2 - 4
        leader.next = itemToRemove.next;
        leader.next.previous = itemToRemove.previous;
        

        this.length--;

    }
    
    print(){
        console.log("Total Nodes: ", this.length);
        let indent  = 1
        let currentNode = this.head;
        while(currentNode){
            let indentation = ' '.repeat((indent++) * 2); // 2 spaces per level
            console.log(`${indentation} --> previous: ${(currentNode.previous!==null?currentNode.previous.data.id:'')} - Current:(${currentNode.data.id}) ${currentNode.data.description}`);
            //console.log(indentation, currentNode.data);
            currentNode = currentNode.next;
        }
    }



     print2(){
         console.log("Total Nodes: ", this.length);
       let currentNode = this.head;
       while(currentNode){
          console.log("previous: ", (currentNode.previous!==null? currentNode.previous.data:''), " current: ", currentNode.data);
          currentNode = currentNode.next;
       }
    
    }
}

/*
const linkedList = new DoublyLinkedList({id:1, description:'Root level'});

linkedList.append({id:40, description:'append item'});
linkedList.append({id:98, description:'append item 2'});
linkedList.prepend({id:22, description:'first prepend item'});
linkedList.prepend({id:13, description:'second prepend item'});


linkedList.insert(2, {id:44, description:'inserted item'});
////linkedList.add({id:55, description:'Last one'});

//console.log(linkedList);
//linkedList.print();
*/

const linkedList = new DoublyLinkedList(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.print2();
linkedList.remove(2)

linkedList.print2();
linkedList.append(5);
linkedList.print2();