var arr = [22,33,44,77,9,4,3,1];

console.log("Input:");
console.log(arr);

const bubbleSort = (arr) =>{

    let n = arr.length;

    for(let i =0; i < n -1; i++){
        for(let j=0; j  < n -1; j++){
            var current = arr[j];
            var next = arr[j+1];

            if(current > next){
                arr[j] = next;
                arr[j+1] = current ;
            }
        }
    }

   return arr;
}


console.log("Output:");

console.log(bubbleSort(arr));