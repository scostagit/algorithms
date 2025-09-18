class Stack {
    constructor() {
        this.items = [];
    }
  
    //add a new valuw
    push(value){
        this.items.push(value)
    }

    // remove a new value
    pop(){
      return this.items.pop(); //LIFO 
    }

    // get the top item in the list
    peek(){
        return this.items[this.items.length -1];
    }

    // checks if the list is empty
    isEmpty(){
        return this.items.length === 0;
    }
}

const stack = new Stack();

console.log("is empty?", stack.isEmpty());

stack.push(10);
stack.push(20);
stack.push(30);

console.log("is empty?", stack.isEmpty());

console.log(stack);

console.log("pop:", stack.pop());

console.log(stack);


console.log("peek [the last item in the stack]:", stack.peek());

