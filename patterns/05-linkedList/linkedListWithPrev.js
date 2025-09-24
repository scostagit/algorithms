class Node {
  constructor(value){
     this.value = value;
     this.next = null;
     this.prev = null;
  }
}


class LinkedList {
  constructor(value) {
    this.head = new Node(value);
    this.tail =  this.head;
    this.length = 1;
  }

  prepend(value){
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
    this.length++;
    this.print();
  }

  append(value){
    let newNode = new Node(value);
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
    this.length++;
    this.print();
  }

  insert(index, value){
    if(index > this.length){
      throw new Error("Index out of range")
    }

    let newNode = new Node(value);
    let leader = this.getItem(index -1);

    let tmp = leader.next;
    
    leader.next = newNode;

    newNode.prev = leader;
    tmp.prev = newNode;
    newNode.next = tmp;

    this.length++;

    this.print();
  }

  getItem(index){

    let count = 0;

    let currentNode = this.head;
    
    while(count!=index){
      currentNode = currentNode.next;
      count++;
    } 
    
    return currentNode;
  }

    remove(index){
    if(index > this.length){
      throw new Error("Index out of range")
    }
   
    let leader = this.getItem(index -1);
    let tmp = leader.next;
    
    leader.next = tmp.next;

    newNode.prev = leader;
    tmp.prev = newNode;
    newNode.next = tmp;

    this.length++;

    this.print();
  }

  print(){

    console.log('Total Items:', this.length);

    let currentNode = this.head;

    while(currentNode){
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  printReverse(){  
    console.log('Total Items:', this.length);
    let currentNode = this.tail;
    while(currentNode){
      console.log(currentNode.value);
      currentNode = currentNode.prev;
    }
  }
}


let list = new LinkedList('A');



list.append('B');
list.append('C');
list.append('D');


list.prepend('-A');


console.log(list.getItem(2));

list.insert(2,'-B');



console.log("reversingggg");
list.printReverse();