  class Node{
     constructor(data){
         this.data = data;
         this.next = null;
     }
  }

class LinkedList{

    constructor(data){
        this.head = new Node(data);
        this.tail = this.head;
        this.length = 1;
    }

    prepend(data){
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        return this;
    }

    append(data){
         const newNode = new Node(data);
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
        const temp = leader.next;
        leader.next = newNode;
        newNode.next = temp;
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
        const leader = this.getNode(index -1);
        let temp = leader.next;
        leader.next = temp.next;
        this.length--;

    }
    
    print(){
        console.log("Total Nodes: ", this.length);
        let indent  = 1
        let currentNode = this.head;
        while(currentNode){
            let indentation = ' '.repeat((indent++) * 2); // 2 spaces per level
            console.log(`${indentation} --> ${currentNode.data.description}`);
            //console.log(indentation, currentNode.data);
            currentNode = currentNode.next;
        }
    }
}


const linkedList = new LinkedList({id:1, description:'Root level'});
linkedList.prepend({id:22, description:'first prepend item'});
linkedList.prepend({id:13, description:'second prepend item'});
linkedList.append({id:40, description:'append item'});
linkedList.insert(2, {id:44, description:'inserted item'});
linkedList.remove(3);
//linkedList.add({id:55, description:'Last one'});
//console.log(linkedList);

linkedList.print();