/*

const bubbleSort = (arr) =>{

     for(let i = 0; i < arr.length; i++){
        for(let j = i +1; j < arr.length; j++){
            
            let current = arr[i];
            let next = arr[j];

            if(current > next){
                arr[i] = next;
                arr[j] = current
            }
        }
     }

     return arr;

}



console.log(bubbleSort([77,43,55,23,19,17,12,1]));



const selectSort = (arr) =>{

    for(let i = 0; i < arr.length; i ++){

        let idx_smallest = i;

        for(let j = i +1; j < arr.length; j ++){
            if(arr[idx_smallest] > arr[j]){
                idx_smallest = j;
            }
        }

        let smallestNumber = arr[idx_smallest];
        let current = arr[i];

        arr[i] = smallestNumber;
        arr[idx_smallest] = current;
    }

    return arr;

}


console.log(selectSort([77,43,55,23,19,17,12,1]));

const insertionSort = (arr)=>{

    for(let i = 0; i <= arr.length; i ++){

        let j = i -1;

        while(j > 0 && arr[j-1] > arr[j]){

            let previous = arr[j -1];
            let current = arr[j];

            arr[j -1] = current;
            arr[j] = previous;
            
            j --;
        }

    }

    return arr;

}


console.log(insertionSort([77,43,55,23,19,17,12,1]));




const mergeSort = (arr) =>{

    //Base Case
    if(arr.length === 1) return arr;

    let middle = Math.floor(arr.length/2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));    
}

const merge = (left, right) =>{
  
  let leftIndex = 0;
  let rightIndex = 0;
  let result = [];

  while(leftIndex < left.length  && rightIndex < right.length){

      if(left[leftIndex] < right[rightIndex]){
          result.push(left[leftIndex]);
          leftIndex++;
      }else{
        result.push(right[rightIndex]);
        rightIndex++;
      }
  }


  
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

console.log(mergeSort([77,43,55,23,19,17,12,1]));




const quickSort = (arr) => {

    //base case
    if(arr.length <= 1) return arr;

    let pivot = arr[arr.length -1];
    let left = [];
    let right = []; 

    for(let i = 0; i < arr.length -1; i++){

        if(arr[i] < pivot){
            left.push(arr[i]);
        }else{
            right.push(arr[i]);
        }
    }


    return [...quickSort(left), pivot, ...quickSort(right)];

}


console.log(quickSort([77,43,55,23,19,17,12,1]));

*/


 const heapSort = (arr)=>{

    //heapier
    let size = arr.length - 1;


    function heapier(size, index, arr){

        let heap = arr[index];
        let left = (index * 2) +1;
        let right = (index * 2) + 2;

        

    }

 }


 console.log(heapSort([77,43,55,23,19,17,12,1]));