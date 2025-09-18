
class PriorityQueue{

    constructor(){
        this.items = [];
    }

    enqueue(data, priority){

        const newItem = {data, priority};
        let added = false;

        // added the first place
        for(let i = 0; i < this.items.length; i ++) {
            if(newItem.priority < this.items[i].priority){
                //splice mutate the original array                                                                
                //splice is push and range of index.
                this.items.splice(i, 0, newItem);
                added = true;
                break;
            }
        }
        
        //if is not added, we adde at the end.
        if(!added){
            this.items.push(newItem);
        }
    }

    print() {
        console.log("Dashboard Patients");
        for(let item of this.items){     
            console.log("=======================================================================================");
            console.log("Patient:", item.data.name, ", Priority:", item.priority, "\nsintomy:", item.data.sintomy);       
            console.log("=======================================================================================");
        }
    }

    dequeue(){
       //remove the item with a high priority
       return this.items.shift();
    }

    isEmpty(){
        return this.items.length === 0;
    }

    //get the first item of the queue
    peek(){
       return this.items[0];
    }
}


const pq = new PriorityQueue();
pq.enqueue({patientId:1, name:"John", sintomy:"Headache"}, 5);
pq.enqueue({patientId:44, name:"Anne", sintomy:"Heart attack"}, 1);
pq.enqueue({patientId:38, name:"Stive", sintomy:"Left leg broke"}, 3);
pq.enqueue({patientId:44, name:"Bozo", sintomy:"Heart attack"}, 1);
pq.enqueue({patientId:44, name:"Bozo 2", sintomy:"Heart attack"}, 1);
pq.enqueue({patientId:44, name:"Miguel", sintomy:"Ferver"}, 7);

pq.print(); // Tarefa urgente (priority: 1) | Tarefa média (priority: 3) | Tarefa normal (priority: 5)

const currentPatient = pq.dequeue();
console.log("Attending:", currentPatient.data); // Executando: Tarefa urgente
pq.print(); 