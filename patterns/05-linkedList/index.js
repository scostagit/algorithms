class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList{
    constructor(value){
        this.head = new Node(value);
        this.tail = this.head;
        this.length = 1;
        this.print();
    }

    prepend(value){

        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
        this.print();
        return this;
    }

    append(value){
        const newNode = new Node(value);     
        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;
        this.print();
    }

    insert(index, value){
        if(index >= this.length){
            return this.append(value);
        }

        const newNode = new Node(value);

        const leader = this.traverseToIndex(index -1);

        const temp = leader.next;

        leader.next = newNode;

        newNode.next = temp;

        this.length++;

        this.print();

        return this;

    }

    traverseToIndex(index){

        let count = 0;
        let currentNode = this.head;

        while(count !== index){
            
            currentNode = currentNode.next;
            count++;
        }

        return currentNode;
    }

    remove(index){

        let leader = this.traverseToIndex(index-1);

        let temp = leader.next;

        leader.next = temp.next;

        console.log('removed: ', temp.value);

        this.length--;

        this.print();
        
    }

    print(){
        
        let currentNode = this.head;
        let arr = [];
        
        while(currentNode){
            arr.push(currentNode.value);
            currentNode = currentNode.next;
        }

        return console.log(arr.join(' -> '));
    }

    print2(){
        
        let currentNode = this.head;
        let indent  = 0;
     
        while(currentNode){
            arr.push(currentNode.value);
            currentNode = currentNode.next;
            let indentation = ' '.repeat((indent++) * 2); // 2 spaces per level
             console.log(`${indentation} --> ${currentNode.next}`);
        }

       
    }
}

const myList = new LinkedList(10);
myList.prepend(1);
myList.append(99);
myList.insert(1, 2);
myList.insert(55, 100);
myList.prepend(0);
myList.remove(3);   