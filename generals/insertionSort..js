var arr = [64, 25, 12, 22, 11];

//in the selection Sort, you have to find the smallest number

console.log("Input:");
console.log(arr);

let insertionSort = (arr) =>{    
 debugger;
   let n = arr.length;

   for(let i = 0; i <= n; i++){

    let j = i -1;

      while(j > 0 && arr[j-1] > arr[j]){
        let current = arr[j];
        let previous = arr[j-1];
        arr[j-1] = current;
        arr[j] = previous;
        j = j -1;
      }
   }
 /*   for(var j = i -1; j > 0; j--){
        var previous = arr[j-1];
        var current = arr[j];
        if(previous > current){
            arr[j-1] = current;
            arr[j]= previous;            
        }
        operations++;
      }*/
   return arr;
}





console.log("Output:");

console.log(insertionSort(arr));

//Selection Sort O(n^2)