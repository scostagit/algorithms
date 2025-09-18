class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}


class LinkedList {

    constructor(){
        this.head = null;        
    }

    add(data){
        let newNode = new Node(data);
        if(this.head===null){
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
        
        //two pointer tecnique
        let slow = this.head;
        let fast = this.head;

        while(fast!==null && fast.next!==null){
            console.log("slow: ", slow.data, "---> Fast: ", fast.data);
            slow = slow.next;
            fast = fast.next.next;  
        }

        return slow; //middle of the list

    }

}


let linkedlist = new LinkedList();
linkedlist.add(4);
linkedlist.add(2);
linkedlist.add(8);
linkedlist.add(3);
linkedlist.add(6);

console.log(linkedlist.print());
