class Queue{
    constructor(){
        this.items = [];
    }

    enqueue(value){
        this.items.push(value)
    }

    dequeue(){ //FIFO
        if(this.isEmpty()){
            console.log("The queue is empty!");
            return;
        }

        return this.items.shift();        
    }

    isEmpty(){
        return this.items.length === 0;
    }

    print(){
        console.log(this.items);
    }
}


const queue = new Queue();

console.log("is it empty?", queue.isEmpty());

queue.enqueue("Apple");
queue.enqueue("Banana");
queue.enqueue("Strawbetter");
queue.print();

console.log("is it empty?", queue.isEmpty());
queue.dequeue();
queue.print();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.print();