const arr = [1,17,1,10,20,5,8,7,2];

const findTheKNumber = (arr, k) =>{

    //arr.sort((a,b)=> b-a);

    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            let current = arr[j];
            let next = arr[j+1];
            if(current < next){
                arr[j] = next;
                arr[j+1] = current;
            }
        }
    }

    console.log(arr);

    return arr[k-1];
  
}

console.log("input: ", arr, " output: ", findTheKNumber(arr, 3));