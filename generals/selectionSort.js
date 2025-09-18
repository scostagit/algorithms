var arr = [64, 25, 12, 22, 11];

//in the selection Sort, you have to find the smallest number

console.log("Input:");
console.log(arr);

let selectionSort = (arr) =>{    

    let n = arr.length;
    for(let i = 0; i < n -1; i++){ //On
        //assum i=0 is the smallest
        let min_idx = i;   
         
        for(let j= i +1; j <=n; j++){ //On
            if(arr[j] < arr[min_idx]){
                min_idx = j; //main point: Find the smallest number.
            }
        }

        //swap
        let temp = arr[i]; //space complexity
        let smallest = arr[min_idx]; //space complexity

        arr[i] = smallest;
        arr[min_idx] = temp;
    }     

  
   return arr;
}


console.log("Output:");

console.log(selectionSort(arr));

//Selection Sort O(n^2)