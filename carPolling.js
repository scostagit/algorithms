
const carPooling = function(trips, capacity) {

    let road = new Array(10).fill(0);

    for([passagers, from, to] of trips){
        road[from]+=passagers;
        road[to]-=passagers;        
    }

    let totalPassagers = 0;
  
    for(let km =0; km < road.length-1; km++){
        totalPassagers+=road[km];

        if(totalPassagers > capacity){
            return false;
        }
    }

    return true;
};


console.log(carPooling([[2,3,6],[1,2,3]],4)); //true
console.log(carPooling([[2,3,6],[1,2,4]],2)); //false
console.log(carPooling([[2,3,6]],2)); //true
console.log(carPooling([[2,3,6]],0)); //fale
console.log(carPooling([[2,3,6],[1,3,5], [5,6,7]],3)); //false